import React, { useRef, useState } from 'react';
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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { supabase } from '../lib/supabase'; // ← ADDED

const BRAND = '#A7EE43';
const BG_DARK = '#142029';
const INPUT_BG = '#4B5563';

export default function SignInScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passRef = useRef<TextInput>(null);

  const isEmailValid = (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const onSubmit = async () => { // ← CHANGED: async
    if (!isEmailValid(email)) {
      Alert.alert('Correo inválido', 'Ingresá un correo válido.');
      return;
    }
    if (password.trim().length < 6) {
      Alert.alert('Contraseña muy corta', 'Mínimo 6 caracteres.');
      return;
    }

    // ← ADDED: real auth with Supabase
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        return Alert.alert('No se pudo iniciar sesión', error.message);
      }

      navigation.replace('MainTabs'); // abre las tabs
    } catch (e: any) {
      Alert.alert('Error', e?.message ?? 'Ocurrió un error inesperado.');
    }
  };

  return (
    <View style={styles.wrap}>
      {/* Top bar */}
      <View style={[styles.topBar, { paddingTop: Math.max(12, insets.top + 4) }]}>
        <View style={styles.topBarRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
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
          <Text style={styles.topTitle}>Ingresar</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.select({ ios: 'padding', android: undefined })}
        keyboardVerticalOffset={Platform.select({ ios: 24, android: 0 })}
      >
        <View style={styles.form}>
          {/* Email */}
          <View style={styles.inputWrap}>
            <TextInput
              placeholder="Correo"
              placeholderTextColor={BRAND}
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              onSubmitEditing={() => passRef.current?.focus()}
            />
          </View>

          {/* Password */}
          <View style={{ gap: 8, width: '100%' }}>
            <View style={styles.inputWrap}>
              <TextInput
                ref={passRef}
                placeholder="Contraseña"
                placeholderTextColor={BRAND}
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
                onSubmitEditing={onSubmit}
              />
            </View>
            <TouchableOpacity
              onPress={() => Alert.alert('Recuperar contraseña', 'Pronto disponible.')}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
          </View>

          {/* Primary CTA */}
          <TouchableOpacity style={styles.primaryBtn} onPress={onSubmit} activeOpacity={0.9}>
            <Text style={styles.primaryBtnText}>Ingresar</Text>
          </TouchableOpacity>

          {/* Link to SignUp */}
          <TouchableOpacity
            onPress={() => navigation.replace('SignUp')}
            style={{ marginTop: 12 }}
            activeOpacity={0.8}
          >
            <Text style={styles.altLink}>
              ¿No tenés cuenta? <Text style={styles.altLinkEmph}>Crear cuenta</Text>
            </Text>
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
  backIcon: {
    width: 24,
    height: 24,
    tintColor: BRAND, // remove if your PNG is already green
  },
  topTitle: { color: BRAND, fontSize: 20, fontFamily: 'PlusJakarta-Bold', textAlign: 'center' },

  form: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 28,
    gap: 22,
    alignItems: 'center',
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
  forgotText: {
    color: BRAND,
    fontSize: 12,
    lineHeight: 12,
    fontFamily: 'PlusJakarta-Regular',
    textAlign: 'center',
  },
  primaryBtn: {
    alignSelf: 'stretch',
    height: 50,
    borderRadius: 16,
    backgroundColor: BRAND,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  primaryBtnText: {
    color: BG_DARK,
    fontSize: 20,
    fontFamily: 'Inter',
    fontWeight: '600',
    lineHeight: 20,
  },
  altLink: {
    color: '#D6E9A3',
    fontSize: 14,
    fontFamily: 'PlusJakarta-Regular',
  },
  altLinkEmph: {
    color: BRAND,
    fontFamily: 'PlusJakarta-Bold',
  },
});
