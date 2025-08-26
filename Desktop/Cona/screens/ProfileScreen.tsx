
// screens/ProfileScreen.tsx
import { supabase } from '../lib/supabase';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
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
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  // profile basics
  const [fullName, setFullName]     = useState('');
  const [firstName, setFirstName]   = useState('');
  const [lastName, setLastName]     = useState('');
  const [username, setUsername]     = useState('');
  const [phone, setPhone]           = useState('');
  const [avatarUrl, setAvatarUrl]   = useState<string | null>(null);
  const [email, setEmail]           = useState('');

  // KPIs (admin-managed)
  const [goals, setGoals]               = useState<number>(0);
  const [matchesPlayed, setMatches]     = useState<number>(0);
  const [winPct, setWinPct]             = useState<number>(0); // can be 0–100 or 0–1

  const loadProfile = useCallback(async () => {
    const { data: { user }, error: userErr } = await supabase.auth.getUser();
    if (userErr) {
      console.warn('[Profile] getUser error:', userErr.message);
      return;
    }
    if (user?.email) setEmail(user.email);

    // Grab everything we need from profiles by id
    const { data, error } = await supabase
      .from('profiles')
      .select(
        'full_name, first_name, last_name, username, phone, avatar_url, goals, matches_played, win_pct'
      )
      .eq('id', user?.id ?? '')
      .single();

    if (error && error.code !== 'PGRST116') { // 116 = No rows
      console.warn('[Profile] select error:', error.message);
      return;
    }

    if (data) {
      setFullName(data.full_name ?? '');
      setFirstName(data.first_name ?? '');
      setLastName(data.last_name ?? '');
      setUsername(data.username ?? '');
      setPhone(data.phone ?? '');
      setAvatarUrl(data.avatar_url ?? null);
      setGoals(Number(data.goals ?? 0));
      setMatches(Number(data.matches_played ?? 0));
      setWinPct(Number(data.win_pct ?? 0));
      return;
    }

    // No row? Create one (minimal) then reload
    if (user?.id) {
      const fallbackName =
        (user.user_metadata?.full_name as string | undefined)?.trim() ||
        (user.email ? user.email.split('@')[0] : '') ||
        '';
      const { error: insertErr } = await supabase
        .from('profiles')
        .insert({ id: user.id, full_name: fallbackName })
        .single();
      if (insertErr) {
        console.warn('[Profile] insert error:', insertErr.message);
        return;
      }
      // re-fetch
      const { data: data2 } = await supabase
        .from('profiles')
        .select(
          'full_name, first_name, last_name, username, phone, avatar_url, goals, matches_played, win_pct'
        )
        .eq('id', user.id)
        .single();
      if (data2) {
        setFullName(data2.full_name ?? '');
        setFirstName(data2.first_name ?? '');
        setLastName(data2.last_name ?? '');
        setUsername(data2.username ?? '');
        setPhone(data2.phone ?? '');
        setAvatarUrl(data2.avatar_url ?? null);
        setGoals(Number(data2.goals ?? 0));
        setMatches(Number(data2.matches_played ?? 0));
        setWinPct(Number(data2.win_pct ?? 0));
      }
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [loadProfile])
  );

  // full_name → first+last → username → email
  const displayName =
    (fullName?.trim()) ||
    [firstName, lastName].filter(Boolean).join(' ').trim() ||
    (username?.trim()) ||
    email ||
    'Tu perfil';

  // Show % nicely whether stored as 0–1 or 0–100
  const winPctDisplay = Number.isFinite(winPct)
    ? (winPct <= 1 ? Math.round(winPct * 100) : Math.round(winPct))
    : 0;

  return (
    <View style={styles.screen}>
      {/* ===== TOP BAR (dark) ===== */}
      <View style={[styles.topBar, { paddingTop: Math.max(18, insets.top + 6) }]}>
        <View style={styles.topBarRow}>
          <Text style={styles.topBarTitle}>Perfil</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            activeOpacity={0.8}
            style={styles.settingsBtn}
          >
            <Image
              source={require('../assets/settings-icon.png')}
              style={styles.settingsIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* ===== Header ===== */}
        <View style={styles.headerTop}>
          {/* Avatar */}
          {avatarUrl ? (
            <Image source={{ uri: avatarUrl }} style={styles.avatarLg} resizeMode="cover" />
          ) : (
            <View style={styles.avatarLg} />
          )}

          {/* Name + username (keeps typography) */}
          <View style={styles.nameBlock}>
            <Text style={styles.displayName}>{displayName}</Text>
            <View style={styles.inlineStats}>
              <Text style={styles.inlineStatText}>
                {username ? `${username}` : '@usuario'}
              </Text>
            </View>
          </View>

          {/* KPIs pill (reactive) */}
          <View style={styles.kpiPillOuter}>
            <View style={styles.kpiPill}>
              <View style={styles.kpiCol}>
                <Text style={styles.kpiNumber}>{goals}</Text>
                <Text style={styles.kpiLabel}>Goles</Text>
              </View>
              <View style={styles.kpiCol}>
                <Text style={styles.kpiNumber}>{matchesPlayed}</Text>
                <Text style={styles.kpiLabel}>Partidos</Text>
              </View>
              <View style={styles.kpiCol}>
                <Text style={styles.kpiNumber}>{winPctDisplay}%</Text>
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
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
    minHeight: 44,
  },
  topBarTitle: {
    color: BRAND,
    fontSize: 20,
    lineHeight: 23,
    fontFamily: 'PlusJakarta-Bold',
    textAlign: 'center',
  },

  // settings button (top-right)
  settingsBtn: {
    position: 'absolute',
    right: 14,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsIcon: { width: 24, height: 24, tintColor: BRAND },

  // ===== Header =====
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

  // cards
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

  awardRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  awardText: { flex: 1, marginLeft: 12 },
  awardTitle: { fontSize: 16, fontFamily: 'PlusJakarta-Bold', color: '#142029' },
  awardDate: { fontSize: 14, fontFamily: 'PlusJakarta-Regular', color: '#4B5563', marginTop: 4 },

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
