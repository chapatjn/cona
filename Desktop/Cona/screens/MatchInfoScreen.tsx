// screens/MatchInfoScreen.js
import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Share,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FOOTER_HEIGHT = 120;

export default function MatchInfoScreen() {
  const navigation = useNavigation();

  // ---- Mock match data ----
  const pricePerPlayerCRC = 3000;
  const capacity = 12;
  const players = [
    'Wilmer López',
    'Javier Córdova',
    'Luis Fernandez',
    'Santiago Torres',
    'Carlos Martínez',
    'Patrick Pemberton',
  ];
  const userHasJoined = false;

  const spotsLeft = Math.max(capacity - players.length, 0);
  const isFull = spotsLeft === 0;

  const spotsText = useMemo(() => {
    if (isFull) return 'COMPLETO';
    return `Quedan ${spotsLeft} ${spotsLeft === 1 ? 'Cupo' : 'Cupos'}`;
  }, [isFull, spotsLeft]);

  const formatCRC = (val) => {
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

  const onJoin = () => {
    if (isFull || userHasJoined) return;
    navigation.navigate('Pay', {
      venueName: 'Furati',
      fieldNumber: '4',
      dateLabel: 'domingo 24 de agosto, 2025',
      timeLabel: '19:00-20:00',
      pricePerPlayerCRC,
      defaultPlayers: 1,
    });
  };

  const onShare = async () => {
    try {
      await Share.share({
        message:
          'Únete a este partido en Cona: Furati 5v5 • domingo 24 de agosto, 2025 • 19:00-20:00. ¡Nos vemos en la cancha! ⚽',
      });
    } catch (e) {
      // no-op
    }
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: FOOTER_HEIGHT }}
      >
        <View style={styles.section}>
          {/* Top Row: Back + Share */}
          <View style={styles.topRow}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.iconButton}
            >
              <Text style={styles.backArrow}>←</Text>
              <Text style={styles.backText}>Volver</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onShare}
              style={styles.iconButtonRight}
            >
              <Image
                source={require('../assets/share-icon.png')} // 👈 your image
                style={styles.shareIcon}
            
              />
            </TouchableOpacity>
          </View>

          {/* MATCH INFO */}
          <Text style={styles.title}>Furati 5 v 5</Text>
          <Text style={styles.subtext}>Domingo 24 de Marzo • 19:00 - 20:00</Text>

          <View style={{ position: 'relative' }}>
          <Image
                source={require('../assets/furati.png')}
                style={styles.matchImage}
                 resizeMode="cover"
              />
            <View style={styles.availabilityTag}>
              <Text style={styles.availabilityText}>
                {isFull ? 'Sin cupos' : `${spotsLeft} Cupo${spotsLeft === 1 ? '' : 's'} Disponibles`}
              </Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View>
              <Text style={styles.detailLabel}>Duración</Text>
              <Text style={styles.detailValue}>60 minutos</Text>
            </View>
            <View>
              <Text style={styles.detailLabel}>Nivel</Text>
              <Text style={styles.detailValue}>Amateur</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Campos Disponibles</Text>
          <View style={styles.progressBarWrapper}>
            <View style={styles.progressBarBG}>
              <View style={styles.progressBarFill} />
            </View>
            <Text style={styles.progressText}>3/10</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Reglas del partido</Text>
            <Text style={styles.bodyText}>
              • Máximo 12 jugadores (6 por equipo){'\n'}
              • Duración: 60 minutos{'\n'}
              • Incluye árbitro profesional{'\n'}
              • Balones y chalecos incluidos
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Jugadores</Text>
            <View style={styles.playersWrapper}>
              <View style={styles.playersColumn}>
                {['Wilmer López', 'Javier Córdova', 'Luis Fernandez', 'Santiago Torres'].map((player, i) => (
                  <Text key={i} style={styles.playerName}>{player}</Text>
                ))}
              </View>
              <View style={styles.playersColumn}>
                {['Carlos Martínez', 'Patrick Pemberton', 'Diego Pérez', 'Endrick García'].map((player, i) => (
                  <Text key={i} style={styles.playerName}>{player}</Text>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Servicios incluidos</Text>
            <Text style={styles.bodyText}>
              🚿 Vestuarios{'\n'}
              🚗 Estacionamiento{'\n'}
              💡 Iluminación LED{'\n'}
              🟢 Cancha sintética
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* STICKY JOIN FOOTER */}
      <View style={styles.joinFooter}>
        <View style={styles.footerTopRow}>
          <View style={styles.priceBlock}>
            <Text style={styles.priceText}>{formatCRC(pricePerPlayerCRC)}</Text>
            <Text style={styles.priceSub}>por jugador</Text>
          </View>
          <View style={styles.statusBlock}>
            <Text style={styles.statusMain}>{spotsText}</Text>
            {!isFull && <Text style={styles.statusSub}>Reserva Ahora</Text>}
          </View>
        </View>

        <View style={styles.footerBottomRow}>
          <Pressable
            onPress={onJoin}
            disabled={isFull || userHasJoined}
            style={({ pressed }) => [
              styles.joinBtn,
              (isFull || userHasJoined) && styles.joinBtnDisabled,
              pressed && !(isFull || userHasJoined) && styles.joinBtnPressed,
            ]}
            android_ripple={{ color: '#2f3b44' }}
          >
            <Text style={styles.joinText}>
              {userHasJoined ? 'Ya estás dentro' : isFull ? 'Sin cupos' : 'Unirme'}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  section: { padding: 16 },

  // Top Row
  topRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 40, // top padding
    marginBottom: 16,
  },
  iconButton: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 4 },
  iconButtonRight: { padding: 4 },
  backArrow: { fontSize: 18, color: '#292D32' },
  backText: { fontSize: 16, color: '#142029', fontFamily: 'PlusJakarta-Regular' },
  shareIcon: { width: 24, height: 24, tintColor: '#292D32' },

  title: {
    fontSize: 22,
    fontFamily: 'PlusJakarta-Bold',
    color: '#142029',
    marginTop: 12, // spacing from top row
    marginBottom: 4,
  },
  subtext: { fontSize: 16, color: '#4B5563', marginBottom: 16, fontFamily: 'PlusJakarta-Regular' },

  image: { width: '100%', height: 179, borderRadius: 8, marginBottom: 8 },
  availabilityTag: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#8A8D91',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  availabilityText: { color: 'white', fontSize: 12, fontWeight: '500' },

  detailRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  detailLabel: { fontSize: 12, color: '#142029' },
  detailValue: { fontSize: 14, fontWeight: '700', color: '#142029' },

  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#142029', marginBottom: 8 },
  progressBarWrapper: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  progressBarBG: { flex: 1, height: 10, backgroundColor: '#D6DDE6', borderRadius: 16, marginRight: 8 },
  progressBarFill: { width: '30%', height: 10, backgroundColor: '#A7EE43', borderRadius: 16 },
  progressText: { fontSize: 12, fontWeight: '500', color: '#4B5563' },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  cardTitle: { fontSize: 20, fontFamily: 'PlusJakarta-Bold', color: '#142029', marginBottom: 8 },
  playersWrapper: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  playersColumn: { flex: 1 },
  playerName: {
    fontSize: 14,
    fontFamily: 'PlusJakarta-SemiBold',
    color: '#1463FD',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#1463FD',
    borderRadius: 16,
    textAlign: 'center',
    marginBottom: 4,
  },
  bodyText: { fontSize: 16, color: '#142029', lineHeight: 24 },

  // Footer
  joinFooter: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#142029',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 12,
  },
  footerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceBlock: { width: 140, paddingVertical: 4 },
  priceText: { color: '#A7EE43', fontSize: 24, fontFamily: 'PlusJakarta-Bold' },
  priceSub: { color: '#A7EE43', fontSize: 14, fontFamily: 'PlusJakarta-Regular' },
  statusBlock: { alignItems: 'flex-start', paddingVertical: 4 },
  statusMain: { color: '#A7EE43', fontSize: 14, fontFamily: 'PlusJakarta-Bold' },
  statusSub: { color: '#A7EE43', fontSize: 12, fontFamily: 'PlusJakarta-Regular' },
  footerBottomRow: {},
  joinBtn: {
    height: 48,
    borderRadius: 16,
    backgroundColor: '#A7EE43',
    alignItems: 'center',
    justifyContent: 'center',
  },
  joinBtnPressed: { opacity: 0.9, transform: [{ scale: 0.995 }] },
  joinBtnDisabled: { backgroundColor: '#9bbf62', opacity: 0.8 },
  joinText: { color: '#142029', fontSize: 20, fontFamily: 'PlusJakarta-Bold' },
  matchImage: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 200, // same height as HomeScreen
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    resizeMode: 'cover',
    marginBottom: 8,
  },
  
});
