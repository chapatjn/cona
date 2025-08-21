// screens/PayScreen.tsx
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Alert,
  Share,
  Modal,
  TextInput,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const FOOTER_HEIGHT = 80;
const MAX_PER_RESERVA = 4;

const formatCRC = (val: number) => {
  try {
    return new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC',
      maximumFractionDigits: 0,
    }).format(val);
  } catch {
    return `₡ ${Math.round(val).toLocaleString('es-CR')}`;
  }
};

export default function PayScreen() {
  const navigation = useNavigation<any>(); // TS-safe for now
  const route = useRoute<any>();           // TS-safe for now

  // Expected params from MatchInfoScreen (all optional with sensible fallbacks)
  const {
    venueName = 'Furati',
    fieldNumber = '4',
    dateLabel = 'domingo 24 de agosto, 2025',
    timeLabel = '19:00-20:00',
    pricePerPlayerCRC = 3000,
    defaultPlayers = 1,
  } = (route?.params as any) || {};

  const [qty, setQty] = useState<number>(
    Math.max(1, Math.min(Number(defaultPlayers) || 1, MAX_PER_RESERVA))
  );
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const total = useMemo<number>(() => pricePerPlayerCRC * qty, [pricePerPlayerCRC, qty]);

  const onPay = () => {
    Alert.alert('Pago', 'Procesando pago (demo).');
  };

  const onShare = async () => {
    try {
      await Share.share({
        message: `Reserva en ${venueName}, cancha ${fieldNumber} — ${dateLabel} ${timeLabel}. ¡Nos vemos en la cancha!`,
      });
    } catch (e) {
      // no-op
    }
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: FOOTER_HEIGHT + 16 }}
      >
        {/* Top: Back + Share + Title */}
        <View style={styles.topBlock}>
          <View style={styles.titleRow}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconHitbox}>
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>

            <View style={{ flex: 1 }}>
              <Text style={styles.pageTitle}>Confirmación de reserva</Text>
              <Text style={styles.pageSubtitle}>Revisá los detalles antes de confirmar</Text>
            </View>

            <TouchableOpacity onPress={onShare} style={styles.iconHitbox}>
              <Image
                source={require('../assets/share-icon.png')}
                style={styles.shareIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Detalles del partido */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Detalles del partido</Text>
          <View style={styles.rowBetween}>
            <Text style={styles.muted}>Lugar</Text>
            <Text style={styles.boldDark}>{venueName}</Text>
          </View>
          <View style={styles.rowBetween}>
            <Text style={styles.muted}>Cancha</Text>
            <Text style={styles.boldDark}>{fieldNumber}</Text>
          </View>
          <View style={styles.rowBetween}>
            <Text style={styles.muted}>Fecha</Text>
            <Text style={styles.boldDark}>{dateLabel}</Text>
          </View>
          <View style={styles.rowBetween}>
            <Text style={styles.muted}>Horario</Text>
            <Text style={styles.boldDark}>{timeLabel}</Text>
          </View>
        </View>

        {/* Información del usuario */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Información del usuario</Text>
          <View style={styles.rowBetween}>
            <Text style={styles.muted}>Nombre</Text>
            <Text style={styles.boldDark}>Sebastián Segares</Text>
          </View>
          <View style={styles.rowBetween}>
            <Text style={styles.muted}>Correo</Text>
            <Text style={styles.boldDark}>segaressebastian@gmail.com</Text>
          </View>
          <View style={styles.rowBetween}>
            <Text style={styles.muted}>Teléfono</Text>
            <Text style={styles.boldDark}>+506 677 2390</Text>
          </View>
        </View>

        {/* Jugadores (primary only + outlined button) */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.cardTitle}>Jugadores ({qty}) </Text>
            <Text style={styles.smallMuted}>Máx. {MAX_PER_RESERVA} por reserva</Text>
          </View>

          <View style={styles.highlightBox}>
            <View style={styles.playerRow}>
              <View style={styles.avatar}>
                <Image
                  source={require('../assets/noimageprofile.png')}
                  style={{ width: 32, height: 32, borderRadius: 16 }}
                />
              </View>
              <View style={styles.playerNameBlock}>
                <Text style={styles.playerName}>Sebastian{'\n'}Segares</Text>
                <Text style={styles.playerRole}>Titular de la Reserva</Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Principal</Text>
              </View>
            </View>
          </View>

          {/* Outlined "Agregar Jugador" button -> opens modal */}
          <Pressable
            style={styles.addPlayerOutline}
            onPress={() => setAddModalVisible(true)}
          >
            <Text style={styles.addPlayerText}>Agregar Jugador</Text>
          </Pressable>
        </View>

        {/* Resumen de pago */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Resumen de pago</Text>

          <View style={styles.rowBetween}>
            <Text style={styles.muted}>Precio por jugador</Text>
            <Text style={styles.boldDark}>{formatCRC(pricePerPlayerCRC)}</Text>
          </View>
          <View style={styles.rowBetween}>
            <Text style={styles.muted}>Cantidad de jugadores</Text>
            <Text style={styles.boldDark}>{qty}</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatCRC(total)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Pagar */}
      <View style={styles.payBar}>
        <Pressable
          onPress={onPay}
          style={({ pressed }) => [styles.payBtn, pressed && { opacity: 0.95 }]}
          android_ripple={{ color: '#2f3b44' }}
        >
          <Text style={styles.payText}>Pagar</Text>
        </Pressable>
      </View>

      {/* ------------ Add Players Modal (bottom sheet) ------------ */}
      <Modal
        visible={addModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setAddModalVisible(false)}
      >
        {/* Dim background */}
        <Pressable style={styles.dim} onPress={() => setAddModalVisible(false)} />

        {/* Bottom sheet content */}
        <View style={styles.sheet}>
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>Agregar Jugadores</Text>
            <TouchableOpacity onPress={() => setAddModalVisible(false)} style={styles.closeSquare}>
              <Text style={styles.closeX}>×</Text>
            </TouchableOpacity>
          </View>

          {/* Search input */}
          <View style={styles.searchRow}>
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Buscar Jugadores"
              placeholderTextColor="#A7EE43"
              style={styles.searchInput}
            />
            <View style={styles.searchIconBox}>
              <View style={styles.searchCircle} />
              <View style={styles.searchHandle} />
            </View>
          </View>

          {/* Agregar manualmente link */}
          <View style={{ alignItems: 'center', marginTop: 44, marginBottom: 44 }}>
            <TouchableOpacity onPress={() => Alert.alert('Agregar', 'Agregar manualmente (demo)')}>
              <Text style={styles.manualLink}>Agregar Manualmente</Text>
            </TouchableOpacity>
          </View>

          {/* Add button (inactive style for now) */}
          <Pressable
            style={styles.sheetAddBtnDisabled}
            onPress={() => Alert.alert('Agregar', 'Seleccioná un jugador (demo)')}
          >
            <Text style={styles.sheetAddTextDisabled}>Agregar</Text>
          </Pressable>
        </View>
      </Modal>
      {/* ------------ End Modal ------------ */}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { flex: 1, backgroundColor: '#FFFFFF' },

  // Top block with back + share
  topBlock: { paddingHorizontal: 16, paddingTop: 70, paddingBottom: 8, backgroundColor: '#fff' },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  iconHitbox: { padding: 6 },
  backArrow: { fontSize: 20, color: '#292D32' },
  shareIcon: { width: 24, height: 24, tintColor: '#292D32' },
  pageTitle: { fontSize: 20, fontFamily: 'PlusJakarta-Bold', color: '#142029' },
  pageSubtitle: { fontSize: 16, color: '#4B5563', fontFamily: 'PlusJakarta-Regular' },

  // Cards
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  cardTitle: { fontSize: 20, fontFamily: 'PlusJakarta-Bold', color: '#142029', marginBottom: 12 },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  muted: { color: '#4B5563', fontSize: 16, fontFamily: 'PlusJakarta-Regular' },
  smallMuted: { color: '#4B5563', fontSize: 14, fontFamily: 'PlusJakarta-Regular' },
  boldDark: { color: '#142029', fontSize: 16, fontFamily: 'PlusJakarta-Bold' },

  // Highlight player box
  highlightBox: {
    backgroundColor: 'rgba(166, 238, 67, 0.29)',
    paddingHorizontal: 12,
    paddingVertical: 20,
    borderRadius: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  playerRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#142029',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    marginRight: 12,
  },
  playerNameBlock: { flex: 1 },
  playerName: { color: '#000', fontSize: 16, fontFamily: 'PlusJakarta-SemiBold' },
  playerRole: { color: '#4B5563', fontSize: 14, fontFamily: 'PlusJakarta-SemiBold' },
  badge: { backgroundColor: '#A7EE43', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 16 },
  badgeText: { color: '#000', fontSize: 14, fontFamily: 'PlusJakarta-Regular' },

  // Agregar jugador (outlined)
  addPlayerOutline: {
    alignSelf: 'center',
    width: 303,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#4B5563',
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPlayerText: {
    color: '#4B5563',
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Inter',
    fontWeight: '500',
  },

  // Totals
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#4B5563',
    paddingTop: 12,
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: { color: '#142029', fontSize: 20, fontFamily: 'PlusJakarta-Medium' },
  totalValue: { color: '#1463FD', fontSize: 24, fontFamily: 'PlusJakarta-Bold' },

  // Pay bar
  payBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#142029',
    padding: 16,
  },
  payBtn: {
    height: 48,
    borderRadius: 16,
    backgroundColor: '#A7EE43',
    alignItems: 'center',
    justifyContent: 'center',
  },
  payText: {
    color: '#142029',
    fontSize: 20,
    fontFamily: 'Inter',
    fontWeight: '700',
    lineHeight: 20,
  },

  // ---------- Modal styles ----------
  dim: {
    flex: 1,
    backgroundColor: '#00000080',
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#142029',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 24,
    gap: 10,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 8,
  },
  sheetTitle: {
    color: '#A7EE43',
    fontSize: 24,
    lineHeight: 16,
    paddingTop: 10,
    fontFamily: 'PlusJakarta-Bold',
  },
  closeSquare: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#A7EE43',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeX: {
    color: '#142029',
    fontSize: 20,
    lineHeight: 20,
    marginTop: -2,
  },

  searchRow: {
    height: 44,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#A7EE43',
    backgroundColor: '#4B5563',
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  searchInput: {
    flex: 1,
    color: '#A7EE43',
    fontSize: 14,
    fontFamily: 'PlusJakarta-Regular',
  },
  // Simple magnifying glass to mimic your mock
  searchIconBox: { width: 16, height: 16, position: 'relative' },
  searchCircle: {
    position: 'absolute',
    left: 2,
    top: 2,
    width: 12,
    height: 12,
    borderWidth: 2,
    borderColor: '#A7EE43',
    borderRadius: 6,
  },
  searchHandle: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 2,
    height: 2,
    borderWidth: 2,
    borderColor: '#A7EE43',
    borderRadius: 1,
  },

  manualLink: {
    color: '#A7EE43',
    fontSize: 14,
    fontFamily: 'PlusJakarta-Regular',
    textDecorationLine: 'underline',
  },

  sheetAddBtnDisabled: {
    height: 44,
    backgroundColor: '#8A8D91',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetAddTextDisabled: {
    color: '#292D32',
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: '500',
    lineHeight: 16,
  },
});
