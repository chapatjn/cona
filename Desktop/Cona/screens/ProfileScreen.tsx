// screens/ProfileScreen.tsx
import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const navigation = useNavigation<any>(); // ok for now
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      {/* ===== TOP BAR (dark) ===== */}
      <View style={[styles.topBar, { paddingTop: Math.max(18, insets.top + 6) }]}>
        <View style={styles.topBarRow}>
          <Text style={styles.topBarTitle}>Perfil</Text>
          {/* swap icon if you prefer another (see filenames below) */}
          <Image
            source={require('../assets/settings-icon.png')}
            style={styles.topBarIcon}
            resizeMode="contain"
          />
        </View>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 120 }} // space for floating tab bar
      >
        {/* ===== New Header (Logged-in) ===== */}
        <View style={styles.headerTop}>
          {/* Avatar */}
          <View style={styles.avatarLg} />

          {/* Name + stats */}
          <View style={styles.nameBlock}>
            <Text style={styles.displayName}>Alberto Odio</Text>
            <View style={styles.inlineStats}>
              <Text style={styles.inlineStatText}>54 partidos</Text>
              <View style={styles.ratingWrap}>
                <Text style={styles.inlineStatText}>3.5</Text>
                <Text style={styles.star}>★</Text>
              </View>
            </View>
          </View>

          {/* Editar Perfil */}
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => navigation.navigate('EditProfile' as never)} // wire later
            activeOpacity={0.85}
          >
            <View style={styles.editInner}>
              <Text style={styles.editText}>Editar Perfil</Text>
              <Image
                source={require('../assets/icon-edit.png')}
                style={styles.editIcon}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>

          {/* KPIs pill */}
          <View style={styles.kpiPillOuter}>
            <View style={styles.kpiPill}>
              <View style={styles.kpiCol}>
                <Text style={styles.kpiNumber}>23</Text>
                <Text style={styles.kpiLabel}>Goles</Text>
              </View>
              <View style={styles.kpiCol}>
                <Text style={styles.kpiNumber}>14</Text>
                <Text style={styles.kpiLabel}>Asistencias</Text>
              </View>
              <View style={styles.kpiCol}>
                <Text style={styles.kpiNumber}>69%</Text>
                <Text style={styles.kpiLabel}>Victorias</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ===== Premios ===== */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Premios</Text>
          {[
            { title: 'Jugador del Partido', date: '26/08/2025' },
            { title: 'Jugador del Partido', date: '11/08/2025' },
          ].map((p, i) => (
            <View key={i} style={styles.awardRow}>
              <Image
                source={require('../assets/prize-icon.png')}
                style={{ width: 32, height: 32 }}
                resizeMode="contain"
              />
              <View style={styles.awardText}>
                <Text style={styles.awardTitle}>{p.title}</Text>
                <Text style={styles.awardDate}>Furati {p.date}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* ===== Partidos Anteriores ===== */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Partidos Anteriores</Text>
          {[
            { title: 'Furati (Fut 5)', time: '7:00 - 9:00 pm', date: '26/08/2025' },
            { title: 'Complejo Sport (Fut 8)', time: '5:00 - 7:00 pm', date: '27/08/2025' },
            { title: 'Four (Fut 7)', time: '9:00 - 11:00 pm', date: '28/08/2025' },
          ].map((match, i) => (
            <View
              key={i}
              style={[styles.previousCard, i % 2 === 1 && styles.matchRowLight]}
            >
              <Text
                style={[styles.previousTitle, i % 2 === 1 && styles.matchNameDark]}
              >
                {match.title}
              </Text>
              <View style={styles.previousInfoRow}>
                <Image
                  source={require('../assets/clock-icon.png')}
                  style={styles.infoIcon}
                />
                <Text
                  style={[styles.infoText, i % 2 === 1 && styles.matchInfoDark]}
                >
                  {match.time}
                </Text>
                <Text style={styles.dot}>•</Text>
                <Text
                  style={[styles.dateText, i % 2 === 1 && styles.matchInfoDark]}
                >
                  {match.date}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const BRAND = '#A7EE43';
const BG_DARK = '#142029';

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F4F5F6' },
  container: { flex: 1, backgroundColor: '#F4F5F6' },

  // ===== TOP BAR =====
  topBar: {
    backgroundColor: BG_DARK,
    paddingHorizontal: 14,
    paddingBottom: 12,
  },
  topBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // title left, icon right
  },
  topBarTitle: {
    color: BRAND,
    fontSize: 20,
    lineHeight: 23,
    fontFamily: 'PlusJakarta-Bold',
    textAlign: 'center',
  },
  topBarIcon: {
    position: 'absolute',
    right: 0,
    top: '50%',
    marginTop: -12,  // half of icon height (24/2) to center vertically
    width: 24,
    height: 24,
    tintColor: BRAND,
  },

  // ===== New header =====
  headerTop: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
    gap: 20,
  },
  avatarLg: {
    width: 100,
    height: 100,
    borderRadius: 9999,
    backgroundColor: BG_DARK,
  },
  smallIcon: { width: 50, height: 50 },
  nameBlock: { alignSelf: 'stretch', alignItems: 'center', gap: 16 },
  displayName: {
    textAlign: 'center',
    color: '#142029',
    fontSize: 24,
    lineHeight: 23,
    fontFamily: 'PlusJakarta-Bold',
  },
  inlineStats: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  inlineStatText: { color: '#000A14', fontSize: 16, fontFamily: 'PlusJakarta-Regular' },
  ratingWrap: { width: 55, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  star: { color: '#EEC326', fontSize: 16 },

  editBtn: {
    width: 181,
    backgroundColor: BRAND,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  editInner: { paddingHorizontal: 18, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 35 },
  editText: { color: '#000', fontSize: 16, fontFamily: 'PlusJakarta-Regular' },
  editIcon: { width: 24, height: 24, tintColor: '#292D32' },

  kpiPillOuter: { width: '100%', paddingHorizontal: 16, paddingVertical: 8 },
  kpiPill: {
    backgroundColor: BG_DARK,
    borderRadius: 32,
    paddingHorizontal: 16,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  kpiCol: { width: 84, alignItems: 'center' },
  kpiNumber: { color: BRAND, fontSize: 18, fontFamily: 'PlusJakarta-Bold' },
  kpiLabel: { color: '#FFFFFF', fontSize: 12, fontFamily: 'PlusJakarta-Regular' },

  // ===== Cards =====
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardTitle: { fontSize: 20, fontFamily: 'PlusJakarta-Bold', color: '#142029', marginBottom: 12 },

  // Awards
  awardRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  awardText: { flex: 1, marginLeft: 12 },
  awardTitle: { fontSize: 16, fontFamily: 'PlusJakarta-Bold', color: '#142029' },
  awardDate: { fontSize: 14, fontFamily: 'PlusJakarta-Regular', color: '#4B5563', marginTop: 4 },

  // Previous matches
  previousCard: {
    backgroundColor: BG_DARK,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  matchRowLight: { backgroundColor: '#FFF' },
  previousTitle: { color: BRAND, fontSize: 18, fontFamily: 'PlusJakarta-Bold', marginBottom: 8 },
  matchNameDark: { color: '#142029' },
  previousInfoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  infoIcon: { width: 16, height: 16, marginRight: 6 },
  infoText: { color: BRAND, fontSize: 14, fontFamily: 'PlusJakarta-Regular' },
  matchInfoDark: { color: '#142029' },
  dot: { color: BRAND, fontSize: 14, marginHorizontal: 4 },
  dateText: { color: BRAND, fontSize: 14, fontFamily: 'PlusJakarta-Regular' },
});
