// screens/EditProfileScreen.tsx
import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../lib/supabase';

const BRAND = '#A7EE43';
const BG_DARK = '#142029';
const INPUT_BG = '#4B5563';

export default function EditProfileScreen() {
  const nav = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const [firstName, setFirstName] = useState('');
  const [lastName,  setLastName]  = useState('');
  const [username,  setUsername]  = useState('');
  const [phone,     setPhone]     = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const [picking, setPicking]     = useState(false);
  const [saving,  setSaving]      = useState(false);

  // Load current values
  const load = useCallback(async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return;

    const { data, error: rpcErr } = await supabase.rpc('get_my_profile');
    if (rpcErr) {
      console.warn('[EditProfile] get_my_profile error:', rpcErr.message);
      return;
    }
    const row = Array.isArray(data) ? data[0] : undefined;
    if (row) {
      setFirstName(row.first_name ?? '');
      setLastName(row.last_name ?? '');
      setUsername(row.username ?? '');
      setPhone(row.phone ?? '');
      setAvatarUrl(row.avatar_url ?? null);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  // Pick image from library
  const onPickImage = async () => {
    try {
      setPicking(true);
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!perm.granted) {
        Alert.alert('Permiso requerido', 'Necesitamos acceso a tus fotos.');
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
      if (!asset?.uri) return;

      // Upload to Supabase Storage
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const uri = asset.uri;
      const fileExt = (asset.fileName?.split('.').pop() || 'jpg').toLowerCase();
      const path = `${user.id}/avatar-${Date.now()}.${fileExt}`;

      // fetch -> arrayBuffer for RN
      const fileResp = await fetch(uri);
      const arrayBuffer = await fileResp.arrayBuffer();

      const { error: upErr } = await supabase
        .storage
        .from('profile-images')
        .upload(path, arrayBuffer, {
          contentType: asset.mimeType || `image/${fileExt}`,
          upsert: false,
        });

      if (upErr) {
        console.warn('[EditProfile] upload error:', upErr.message);
        Alert.alert('Error', 'No se pudo subir la imagen.');
        return;
      }

      // get public URL
      const { data: pub } = supabase.storage
        .from('profile-images')
        .getPublicUrl(path);

      if (pub?.publicUrl) {
        setAvatarUrl(pub.publicUrl);
      }
    } finally {
      setPicking(false);
    }
  };

  const onSave = async () => {
    try {
      setSaving(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const updates = {
        first_name: firstName.trim(),
        last_name:  lastName.trim(),
        username:   username.trim().toLowerCase(),
        phone:      phone.trim(),
        avatar_url: avatarUrl ?? null,
      };

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) {
        console.warn('[EditProfile] save error:', error.message);
        Alert.alert('Error', 'No se pudo guardar el perfil.');
        return;
      }

      Alert.alert('Listo', 'Perfil actualizado.', [
        { text: 'OK', onPress: () => nav.goBack() },
      ]);
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.wrap}>
      {/* Top bar */}
      <View style={[styles.topBar, { paddingTop: Math.max(12, insets.top + 4) }]}>
        <View style={styles.topBarRow}>
          <TouchableOpacity
            onPress={() => nav.goBack()}
            accessibilityRole="button"
            accessibilityLabel="Volver"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={styles.topLeft}
            activeOpacity={0.8}
          >
            <Image
              source={require('../assets/back-icon.png')}
              style={styles.backIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.topTitle}>Editar perfil</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.select({ ios: 'padding', android: undefined })}
        keyboardVerticalOffset={Platform.select({ ios: 24, android: 0 })}
      >
        <View style={styles.form}>
          {/* Avatar */}
          <TouchableOpacity
            onPress={onPickImage}
            activeOpacity={0.8}
            style={styles.avatarTap}
          >
            {avatarUrl ? (
              <Image source={{ uri: avatarUrl }} style={styles.avatarLg} />
            ) : (
              <View style={styles.avatarLg} />
            )}
            <Text style={styles.changePhotoText}>
              {picking ? 'Subiendo…' : 'Cambiar foto'}
            </Text>
          </TouchableOpacity>

          {/* First name */}
          <View style={styles.inputWrap}>
            <TextInput
              placeholder="Nombre"
              placeholderTextColor={BRAND}
              value={firstName}
              onChangeText={setFirstName}
              style={styles.input}
              autoCapitalize="words"
              returnKeyType="next"
            />
          </View>

          {/* Last name */}
          <View style={styles.inputWrap}>
            <TextInput
              placeholder="Apellido"
              placeholderTextColor={BRAND}
              value={lastName}
              onChangeText={setLastName}
              style={styles.input}
              autoCapitalize="words"
              returnKeyType="next"
            />
          </View>

          {/* Username */}
          <View style={styles.inputWrap}>
            <TextInput
              placeholder="Usuario"
              placeholderTextColor={BRAND}
              value={username}
              onChangeText={setUsername}
              style={styles.input}
              autoCapitalize="none"
              returnKeyType="next"
            />
          </View>

          {/* Phone */}
          <View style={styles.inputWrap}>
            <TextInput
              placeholder="Teléfono"
              placeholderTextColor={BRAND}
              value={phone}
              onChangeText={setPhone}
              style={styles.input}
              keyboardType="phone-pad"
              autoCapitalize="none"
              returnKeyType="done"
            />
          </View>

          {/* Save */}
          <TouchableOpacity
            style={[styles.primaryBtn, saving && { opacity: 0.7 }]}
            onPress={onSave}
            activeOpacity={0.9}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color={BG_DARK} />
            ) : (
              <Text style={styles.primaryBtnText}>Guardar</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: BG_DARK },
  topBar: { paddingHorizontal: 16, paddingBottom: 12, backgroundColor: BG_DARK },
  topBarRow: {
    position: 'relative',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topLeft: { position: 'absolute', left: 0 },
  backIcon: { width: 24, height: 24, tintColor: BRAND },
  topTitle: { color: BRAND, fontSize: 20, fontFamily: 'PlusJakarta-Bold', textAlign: 'center' },

  form: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    gap: 16,
    alignItems: 'center',
  },

  avatarTap: { alignItems: 'center', gap: 8, marginBottom: 4 },
  avatarLg: {
    width: 100,
    height: 100,
    borderRadius: 9999,
    backgroundColor: BG_DARK,
    borderWidth: 1.5,
    borderColor: BRAND,
  },
  changePhotoText: {
    color: BRAND,
    fontSize: 12,
    fontFamily: 'PlusJakarta-Regular',
  },

  inputWrap: {
    alignSelf: 'stretch',
    height: 44,
    paddingHorizontal: 12,
    backgroundColor: INPUT_BG,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: BRAND,
    justifyContent: 'center',
  },
  input: {
    color: BRAND,
    fontSize: 14,
    fontFamily: 'PlusJakarta-Regular',
  },

  primaryBtn: {
    alignSelf: 'stretch',
    height: 50,
    borderRadius: 16,
    backgroundColor: BRAND,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  primaryBtnText: {
    color: BG_DARK,
    fontSize: 20,
    fontFamily: 'Inter',
    fontWeight: '600',
    lineHeight: 20,
  },
});
