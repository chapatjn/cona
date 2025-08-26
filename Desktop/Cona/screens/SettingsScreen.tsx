// screens/SettingsScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../lib/supabase';

const BRAND = '#A7EE43';
const BG_DARK = '#142029';
const BG_APP = '#F4F5F6';
const ROW_BG = 'rgba(167,238,67,0.29)';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const [pushEnabled, setPushEnabled] = useState(true);
  const [reminderEnabled, setReminderEnabled] = useState(true);

  const goBack = () => navigation.goBack();

  const onEditProfile = () => navigation.navigate('EditProfile');
  const onChangePassword = () =>
    Alert.alert('Cambiar contraseña', 'Pronto disponible.');

  const onHelpCenter = () => Alert.alert('Centro de Ayuda', 'Abrir FAQ…');
  const onFeedback = () => Alert.alert('Comentarios', 'Abrir formulario…');
  const onContact = () => Alert.alert('Soporte', 'Iniciar contacto…');

  const onTerms = () => Alert.alert('Términos y Condiciones', 'Abrir página…');
  const onPrivacy = () => Alert.alert('Política de privacidad', 'Abrir página…');
  const onAbout = () => Alert.alert('Acerca de Cona', 'Versión 1.2.3');

  const onSignOut = async () => {
    await supabase.auth.signOut();
    navigation.replace('SignIn');
  };

  return (
    <View style={styles.screen}>
      {/* Top bar */}
      <View style={[styles.topBar, { paddingTop: Math.max(12, insets.top + 4) }]}>
        <View style={styles.topBarRow}>
          <TouchableOpacity
            onPress={goBack}
            accessibilityRole="button"
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

          <Text style={styles.topTitle}>Configuración</Text>
          <View style={{ width: 24, height: 24 }} />
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
      >
        {/* ===== Cuenta ===== */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Cuenta</Text>
          </View>

          <TouchableOpacity style={styles.row} onPress={onEditProfile} activeOpacity={0.85}>
            <View style={styles.rowInner}>
              <View style={styles.iconCircle}>
                <Image
                  source={require('../assets/settings-icon.png')}
                  style={styles.icon}
                />
              </View>
              <View style={styles.rowTextBox}>
                <Text style={styles.rowTitle}>Editar Perfil</Text>
                <Text style={styles.rowSub}>Cambiar foto, nombre y información personal</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={onChangePassword} activeOpacity={0.85}>
            <View style={styles.rowInner}>
              <View style={styles.iconCircle}>
                <Image
                  source={require('../assets/settings-icon.png')}
                  style={styles.icon}
                />
              </View>
              <View style={styles.rowTextBox}>
                <Text style={styles.rowTitle}>Cambiar Contraseña</Text>
                <Text style={styles.rowSub}>Actualiza tu contraseña de acceso</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* ===== Notificaciones ===== */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Notificaciones</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.rowInner}>
              <View style={styles.iconCircle}>
                <View style={styles.smallRect} />
              </View>
              <View style={styles.rowTextBox}>
                <Text style={styles.rowTitle}>Notificaciones Push</Text>
                <Text style={styles.rowSub}>Recibir alertas en tu dispositivo</Text>
              </View>
              <Switch
                value={pushEnabled}
                onValueChange={setPushEnabled}
                thumbColor={BRAND}
                trackColor={{ false: BG_DARK, true: BG_DARK }}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.rowInner}>
              <View style={styles.iconCircle}>
                <View style={[styles.smallRect, { width: 20 }]} />
              </View>
              <View style={styles.rowTextBox}>
                <Text style={styles.rowTitle}>Recordatorio de partidos</Text>
                <Text style={styles.rowSub}>Avisos antes de tus partidos reservados</Text>
              </View>
              <Switch
                value={reminderEnabled}
                onValueChange={setReminderEnabled}
                thumbColor={BRAND}
                trackColor={{ false: BG_DARK, true: BG_DARK }}
              />
            </View>
          </View>
        </View>

        {/* ===== Soporte ===== */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Soporte</Text>
          </View>

          <TouchableOpacity style={styles.row} onPress={onHelpCenter} activeOpacity={0.85}>
            <View style={styles.rowInner}>
              <View style={styles.iconCircle} />
              <View style={styles.rowTextBox}>
                <Text style={styles.rowTitle}>Centro de Ayuda</Text>
                <Text style={styles.rowSub}>Preguntas frecuentes y guías</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={onFeedback} activeOpacity={0.85}>
            <View style={styles.rowInner}>
              <View style={styles.iconCircle} />
              <View style={styles.rowTextBox}>
                <Text style={styles.rowTitle}>Enviar Comentarios</Text>
                <Text style={styles.rowSub}>Ayúdanos a mejorar la app</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={onContact} activeOpacity={0.85}>
            <View style={styles.rowInner}>
              <View style={styles.iconCircle} />
              <View style={styles.rowTextBox}>
                <Text style={styles.rowTitle}>Contactar Soporte</Text>
                <Text style={styles.rowSub}>Obtén ayuda personalizada</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* ===== Legal ===== */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Legal</Text>
          </View>

          <TouchableOpacity style={styles.row} onPress={onTerms} activeOpacity={0.85}>
            <View style={styles.rowInner}>
              <View style={styles.iconCircle} />
              <View style={styles.rowTextBox}>
                <Text style={styles.rowTitle}>Términos y Condiciones</Text>
                <Text style={styles.rowSub}>Condiciones de uso de la aplicación</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={onPrivacy} activeOpacity={0.85}>
            <View style={styles.rowInner}>
              <View style={styles.iconCircle} />
              <View style={styles.rowTextBox}>
                <Text style={styles.rowTitle}>Política de privacidad</Text>
                <Text style={styles.rowSub}>Cómo protegemos tu información</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={onAbout} activeOpacity={0.85}>
            <View style={styles.rowInner}>
              <View style={styles.iconCircle} />
              <View style={styles.rowTextBox}>
                <Text style={styles.rowTitle}>Acerca de Cona</Text>
                <Text style={styles.rowSub}>Versión 1.2.3</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* ===== Cerrar sesión ===== */}
        <View style={styles.card}>
          <TouchableOpacity style={styles.row} onPress={onSignOut} activeOpacity={0.85}>
            <View style={styles.rowInner}>
              <View style={[styles.iconCircle, { backgroundColor: BG_DARK }]}>
                <View style={[styles.smallRect, { backgroundColor: '#E14664' }]} />
              </View>
              <View style={styles.rowTextBox}>
                <Text style={[styles.rowTitle, { color: '#E14664' }]}>Cerrar Sesión</Text>
                <Text style={styles.rowSub}>Salir de tu cuenta en este dispositivo</Text>
              </View>
              <Text style={[styles.chevron, { color: '#292D32' }]}>›</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ height: Math.max(16, insets.bottom) }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG_APP },

  // Top bar
  topBar: { paddingHorizontal: 16, paddingBottom: 12, backgroundColor: BG_DARK },
  topBarRow: {
    position: 'relative',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topLeft: { position: 'absolute', left: 0, top: 0, bottom: 0, justifyContent: 'center' },
  backIcon: { width: 24, height: 24, tintColor: BRAND },
  topTitle: { color: BRAND, fontSize: 20, fontFamily: 'PlusJakarta-Bold', textAlign: 'center' },

  // Cards
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  cardHeader: {
    paddingBottom: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#4B5563',
    marginBottom: 10,
  },
  cardTitle: { color: '#142029', fontSize: 20, fontFamily: 'PlusJakarta-Bold' },

  // Rows
  row: {
    backgroundColor: ROW_BG,
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 12,
  },
  rowInner: { flexDirection: 'row', alignItems: 'center' },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 28,
    backgroundColor: BG_DARK,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: { width: 24, height: 24, tintColor: BRAND },
  smallRect: { width: 16, height: 16, backgroundColor: BRAND, borderRadius: 2 },
  rowTextBox: { flex: 1 },
  rowTitle: { color: '#000', fontSize: 16, fontFamily: 'PlusJakarta-Bold' },
  rowSub: { color: '#4B5563', fontSize: 14, marginTop: 2, fontFamily: 'PlusJakarta-Regular' },
  chevron: { color: '#292D32', fontSize: 28, lineHeight: 28, marginLeft: 8 },
});
