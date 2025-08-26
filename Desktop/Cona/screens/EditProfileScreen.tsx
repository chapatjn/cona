// screens/EditProfileScreen.tsx
import React, { useCallback, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { supabase } from '../lib/supabase';

const BRAND = '#A7EE43';
const BG_DARK = '#142029';
const BORDER = '#4B5563';

/**
 * If your DB column is named differently (e.g. 'position' or 'posicion'),
 * change this constant to match your table.
 */
const POSITION_COL = 'preferred_position';

export default function EditProfileScreen() {
  const nav = useNavigation<any>();
  const insets = useSafeAreaInsets();

  // form state (prefilled on load)
  const [username, setUsername]   = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]   = useState('');
  const [email, setEmail]         = useState('');
  const [phone, setPhone]         = useState('');
  const [position, setPosition]   = useState<'Delantero' | 'Medio' | 'Defensa' | 'Portero'>('Delantero');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving]   = useState(false);

  // track original auth email so we know when it changes
  const [originalEmail, setOriginalEmail] = useState('');

  // ---------- helpers ----------
  const guessExt = (mime?: string, uri?: string) => {
    if (mime?.includes('png')) return 'png';
    if (mime?.includes('jpeg') || mime?.includes('jpg')) return 'jpg';
    const fromUri = uri?.split('.').pop()?.split('?')[0];
    if (fromUri && fromUri.length <= 4) return fromUri;
    return 'jpg';
  };

  const loadProfile = useCallback(async () => {
    setLoading(true);
    try {
      // A) Check session/user
      const { data: authData, error: authErr } = await supabase.auth.getUser();
      if (authErr) {
        console.warn('[EditProfile] auth.getUser error:', authErr);
        Alert.alert('Sesión', authErr.message || 'No se pudo obtener tu sesión.');
        return;
      }
      const user = authData?.user;
      if (!user) {
        console.warn('[EditProfile] No active user/session');
        Alert.alert('Sesión', 'No hay sesión activa. Inicia sesión de nuevo.');
        return;
      }

      // Prefill email + remember original
      setEmail(user.email ?? '');
      setOriginalEmail(user.email ?? '');

      // B) Fetch profile
      const selectCols = `first_name,last_name,username,phone,avatar_url,${POSITION_COL},full_name,email`;
      const { data, error } = await supabase
        .from('profiles')
        .select(selectCols)
        .eq('id', user.id)
        .maybeSingle();

      if (error) {
        console.warn('[EditProfile] profiles SELECT error:', error);
        Alert.alert('Error', `No pudimos cargar tu perfil.\n${error.message || ''}`);
        return;
      }

      // C) Create minimal row if missing
      if (!data) {
        const fallbackName =
          (user.user_metadata?.full_name as string | undefined)?.trim() ||
          (user.email ? user.email.split('@')[0] : '') || '';
        const { error: insertErr } = await supabase
          .from('profiles')
          .insert({ id: user.id, full_name: fallbackName, email: user.email ?? null });
        if (insertErr) {
          console.warn('[EditProfile] profiles INSERT error:', insertErr);
          Alert.alert('Error', `No pudimos crear tu perfil.\n${insertErr.message || ''}`);
          return;
        }
        // keep defaults if just created the row
        setFirstName('');
        setLastName('');
        setUsername('');
        setPhone('');
        setAvatarUrl(null);
        setPosition('Delantero');
        return;
      }

      // D) Prefill UI fields
      setFirstName(data.first_name ?? '');
      setLastName(data.last_name ?? '');
      setUsername(data.username ?? '');
      setPhone(data.phone ?? '');
      setAvatarUrl(data.avatar_url ?? null);
      setPosition((data[POSITION_COL] as any) || 'Delantero');
      setEmail(data.email ?? (user.email ?? ''));
    } catch (e: any) {
      console.warn('[EditProfile] load error (catch):', e?.message || e);
      Alert.alert('Error', `No pudimos cargar tu perfil. Intenta de nuevo.\n${e?.message || ''}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handlePickAvatar = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        Alert.alert('Sesión', 'No hay sesión activa.');
        return;
      }

      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!perm.granted) {
        Alert.alert('Permisos', 'Necesitamos acceso a tus fotos para cambiar el avatar.');
        return;
      }

      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.9,
      });
      if (res.canceled) return;

      const asset = res.assets[0];
      const ext = guessExt(asset.mimeType, asset.uri);
      const path = `${user.id}/avatar-${Date.now()}.${ext}`;

      // Convert to Blob and upload
      const fileResp = await fetch(asset.uri);
      const blob = await fileResp.blob();

      const { error: upErr } = await supabase
        .storage
        .from('profile-images')
        .upload(path, blob, { upsert: true, contentType: asset.mimeType || 'image/jpeg' });

      if (upErr) throw upErr;

      // public URL (bucket should be public or use signed URL if private)
      const { data: pub } = supabase.storage.from('profile-images').getPublicUrl(path);
      const url = pub?.publicUrl ?? null;

      setAvatarUrl(url);

      // also persist immediately
      const { error: updErr } = await supabase.from('profiles').update({ avatar_url: url }).eq('id', user.id);
      if (updErr) throw updErr;
    } catch (e: any) {
      console.warn('[EditProfile] avatar upload error:', e?.message || e);
      Alert.alert('Error', 'No pudimos subir tu foto. Intenta de nuevo.');
    }
  }, []);

  const handleSave = useCallback(async () => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user');

      // basic email validation
      const nextEmail = (email || '').trim().toLowerCase();
      if (nextEmail && !/^\S+@\S+\.\S+$/.test(nextEmail)) {
        Alert.alert('Correo inválido', 'Por favor ingresa un correo válido.');
        return;
      }

      // 1) If email changed, update via Supabase Auth (triggers verification email)
      const prevEmail = (originalEmail || '').trim().toLowerCase();
      const emailChanged = nextEmail !== prevEmail;

      if (emailChanged) {
        const { error: updEmailErr } = await supabase.auth.updateUser({ email: nextEmail });
        if (updEmailErr) {
          console.warn('[EditProfile] update auth email error:', updEmailErr);
          Alert.alert('Error', updEmailErr.message || 'No pudimos actualizar tu correo de sesión.');
          return;
        }
      }

      // 2) Upsert the profile (keeps UI copy + saves names/username/phone/position/avatar)
      const full_name = `${firstName} ${lastName}`.trim();

      const payload: Record<string, any> = {
        id: user.id,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        username: username.trim().toLowerCase(),
        phone: phone.trim(),
        avatar_url: avatarUrl,
        full_name,
        email: nextEmail, // keep a copy in profiles for your UI
      };
      payload[POSITION_COL] = position; // computed column key

      const { error } = await supabase
        .from('profiles')
        .upsert(payload, { onConflict: 'id' });

      if (error?.message?.includes('duplicate key') || (error as any)?.code === '23505') {
        Alert.alert('Usuario en uso', 'Ese nombre de usuario ya existe. Elige otro.');
        return;
      }
      if (error) throw error;

      // 3) Success messages
      if (emailChanged) {
        setOriginalEmail(nextEmail);
        Alert.alert(
          'Verifica tu correo',
          'Te enviamos un enlace para confirmar el nuevo correo. Se aplicará cuando lo confirmes.'
        );
      } else {
        Alert.alert('Listo', 'Tus cambios se guardaron.');
      }

      nav.goBack();
    } catch (e: any) {
      console.warn('[EditProfile] save error:', e?.message || e);
      Alert.alert('Error', e?.message || 'No pudimos guardar los cambios.');
    } finally {
      setSaving(false);
    }
  }, [firstName, lastName, username, phone, avatarUrl, position, email, originalEmail, nav]);

  // ---------- UI (UNCHANGED) ----------
  return (
    <View style={styles.screen}>
      {/* Top bar */}
      <View style={[styles.topBar, { paddingTop: Math.max(18, insets.top + 6) }]}>
        <View style={styles.topBarRow}>
          <TouchableOpacity
            onPress={() => nav.goBack()}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={styles.backBtn}
          >
            <Text style={styles.backGlyph}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.topBarTitle}>Editar Perfil</Text>
          <View style={{ width: 24 }} />
        </View>
      </View>

      {loading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator color={BG_DARK} />
        </View>
      ) : (
        <ScrollView
          style={styles.body}
          contentContainerStyle={{ paddingBottom: 24 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Foto de Perfil */}
          <View style={styles.card}>
            <Text style={styles.cardTitleCenter}>Foto de Perfil</Text>

            <View style={styles.avatarWrap}>
              {avatarUrl ? (
                <Image source={{ uri: avatarUrl }} style={styles.avatar} resizeMode="cover" />
              ) : (
                <View style={styles.avatar} />
              )}

              <TouchableOpacity
                onPress={handlePickAvatar}
                style={styles.fab}
                activeOpacity={0.85}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <View style={styles.plusH} />
                <View style={styles.plusV} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Información Personal */}
          <View style={styles.card}>
            <View style={styles.cardHeaderRow}>
              <Text style={styles.cardHeaderTitle}>Información Personal</Text>
            </View>

            <Text style={styles.label}>Usuario</Text>
            <View style={styles.inputFrame}>
              <TextInput
                value={username}
                onChangeText={setUsername}
                placeholder="tu_usuario"
                placeholderTextColor={BORDER}
                style={styles.input}
                autoCapitalize="none"
              />
            </View>

            <Text style={styles.label}>Nombre</Text>
            <View style={styles.inputFrame}>
              <TextInput
                value={firstName}
                onChangeText={setFirstName}
                placeholder="Nombre"
                placeholderTextColor={BORDER}
                style={styles.input}
              />
            </View>

            <Text style={styles.label}>Apellido</Text>
            <View style={styles.inputFrame}>
              <TextInput
                value={lastName}
                onChangeText={setLastName}
                placeholder="Apellido"
                placeholderTextColor={BORDER}
                style={styles.input}
              />
            </View>

            <Text style={styles.label}>Correo</Text>
            <View style={styles.inputFrame}>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="correo@ejemplo.com"
                placeholderTextColor={BORDER}
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <Text style={styles.label}>Teléfono</Text>
            <View style={styles.inputFrame}>
              <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholder="+506 0000 0000"
                placeholderTextColor={BORDER}
                style={styles.input}
                keyboardType="phone-pad"
              />
            </View>

            <Text style={styles.label}>Posición Preferida</Text>
            <TouchableOpacity
              style={[styles.inputFrame, styles.selectFrame]}
              activeOpacity={0.8}
              onPress={() => {
                const order = ['Delantero', 'Medio', 'Defensa', 'Portero'] as const;
                const i = order.indexOf(position);
                setPosition(order[(i + 1) % order.length]);
              }}
            >
              <Text style={styles.input}>{position}</Text>
              <Text style={styles.chevron}>▾</Text>
            </TouchableOpacity>
          </View>

          {/* Bottom actions */}
          <View style={styles.bottomBar}>
            <TouchableOpacity
              onPress={() => nav.goBack()}
              style={[styles.btn, styles.btnGhost]}
              activeOpacity={0.85}
              disabled={saving}
            >
              <Text style={styles.btnGhostText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSave}
              style={[styles.btn, styles.btnPrimary]}
              activeOpacity={0.9}
              disabled={saving}
            >
              {saving ? (
                <ActivityIndicator color="#142029" />
              ) : (
                <Text style={styles.btnPrimaryText}>Guardar Cambios</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F4F5F6' },
  topBar: { backgroundColor: BG_DARK, paddingHorizontal: 20, paddingBottom: 18 },
  topBarRow: { minHeight: 44, width: '100%', alignItems: 'center', justifyContent: 'center' },
  backBtn: { position: 'absolute', left: 0, top: 0, bottom: 0, justifyContent: 'center' },
  backGlyph: { color: BRAND, fontSize: 24, lineHeight: 24, fontFamily: 'PlusJakarta-Bold' },
  topBarTitle: { color: BRAND, fontSize: 20, lineHeight: 23, textAlign: 'center', fontFamily: 'PlusJakarta-Bold' },
  body: { flex: 1 },

  card: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardTitleCenter: { textAlign: 'center', color: '#142029', fontSize: 24, lineHeight: 28, marginBottom: 12, fontFamily: 'PlusJakarta-Bold' },
  avatarWrap: { alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  avatar: { width: 100, height: 100, borderRadius: 9999, backgroundColor: BG_DARK },
  fab: { position: 'absolute', right: -6, bottom: -6, width: 44, height: 44, borderRadius: 12, backgroundColor: BRAND, alignItems: 'center', justifyContent: 'center' },
  plusH: { position: 'absolute', width: 26, height: 3, backgroundColor: BG_DARK, borderRadius: 2 },
  plusV: { position: 'absolute', width: 3, height: 26, backgroundColor: BG_DARK, borderRadius: 2 },

  cardHeaderRow: { paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: BORDER, marginBottom: 12 },
  cardHeaderTitle: { fontSize: 20, color: '#142029', fontFamily: 'PlusJakarta-Bold' },

  label: { marginTop: 8, marginBottom: 4, fontSize: 14, color: '#000', fontFamily: 'PlusJakarta-Regular', fontWeight: '600' },
  inputFrame: { borderWidth: 1, borderColor: BORDER, borderRadius: 16, paddingHorizontal: 12, paddingVertical: 12, marginBottom: 6 },
  selectFrame: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  input: { color: '#142029', fontSize: 16, fontFamily: 'PlusJakarta-Regular' },
  chevron: { color: '#292D32', fontSize: 16, marginLeft: 12 },

  bottomBar: { flexDirection: 'row', gap: 12, paddingHorizontal: 16, paddingVertical: 16 },
  btn: { height: 44, borderRadius: 16, paddingHorizontal: 16, alignItems: 'center', justifyContent: 'center' },
  btnGhost: { flex: 1, backgroundColor: '#D9D9D9' },
  btnGhostText: { color: BG_DARK, fontSize: 16, fontFamily: 'PlusJakarta-Regular' },
  btnPrimary: { backgroundColor: BRAND, paddingHorizontal: 20 },
  btnPrimaryText: { color: BG_DARK, fontSize: 16, fontFamily: 'PlusJakarta-Regular' },
});
