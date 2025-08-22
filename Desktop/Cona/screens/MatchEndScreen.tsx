// screens/MatchEndScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BRAND = '#A7EE43';
const BG_DARK = '#142029';
const MUTED = '#4B5563';

// Tab bar import + bridge (unchanged)
import ConaTabBar from '../components/ConaTabBar';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

function useConaTabBarBridge(navigation: any): BottomTabBarProps {
  const state: any = {
    index: 0,
    key: 'MainTabs',
    type: 'tab',
    stale: false,
    history: [],
    routeNames: ['Home', 'AllMatches', 'Create', 'Profile'],
    routes: [
      { key: 'Home', name: 'Home' },
      { key: 'AllMatches', name: 'AllMatches' },
      { key: 'Create', name: 'Create' },
      { key: 'Profile', name: 'Profile' },
    ],
  };

  // ✅ Spanish labels to match AppTabs
  const titles: Record<string, string> = {
    Home: 'Inicio',
    AllMatches: 'Buscar',
    Create: 'Crear',
    Profile: 'Perfil',
  };

  const descriptors: any = Object.fromEntries(
    state.routes.map((r: any) => [
      r.key,
      { options: { title: titles[r.name] } }, // <- use Spanish title
    ]),
  );

  const bridgeNav: any = {
    ...navigation,
    emit: () => ({ defaultPrevented: false }),
    navigate: (name: string) =>
      navigation.navigate('MainTabs', { screen: name }),
  };

  return { state, descriptors, navigation: bridgeNav } as BottomTabBarProps;
}

export default function MatchEndScreen() {
  const navigation = useNavigation<any>();
  const tabBarProps = useConaTabBarBridge(navigation);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Top bar with back + share */}
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Image
              source={require('../assets/back-icon.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Image
              source={require('../assets/share-icon.png')}
              style={styles.shareIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Title / meta */}
        <View style={styles.titleWrap}>
          <Text style={styles.title}>
            <Text style={styles.titleStrong}>Furati</Text>
            <Text> </Text>
            <Text style={styles.titleSemi}>5 v 5 </Text>
            <Text style={styles.titleFinal}>Finalizado</Text>
          </Text>
          <Text style={styles.subTitle}>
            Domingo 24 de Marzo • 19:00 - 20:00
          </Text>
        </View>

        {/* Match hero image — side-to-side and taller */}
        <Image
          source={require('../assets/furati.png')}
          style={styles.hero}
          resizeMode="cover"
        />

        {/* Duration + Level row (icons removed) */}
        <View style={styles.metaRow}>
          <View style={styles.metaItemNoIcon}>
            <View style={styles.metaTextCol}>
              <Text style={styles.metaLabel}>Duración</Text>
              <Text style={styles.metaValue}>60 minutos</Text>
            </View>
          </View>

          <View style={styles.metaItemNoIcon}>
            <View style={styles.metaTextCol}>
              <Text style={styles.metaLabel}>Nivel</Text>
              <Text style={styles.metaValue}>Amateur</Text>
            </View>
          </View>
        </View>

        {/* Resultado */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Resultado</Text>

          <View style={styles.resultBox}>
            <View style={styles.resultRow}>
              <View style={styles.teamCol}>
                <View
                  style={[styles.teamAvatar, { backgroundColor: '#FFFFFF' }]}
                />
                <Text style={styles.teamName}>Blanco</Text>
              </View>

              <Text style={styles.scoreText}>
                <Text style={styles.scoreStrong}>4</Text>
                <Text> - </Text>
                <Text style={styles.scoreStrong}>2</Text>
              </Text>

              <View style={styles.teamCol}>
                <View
                  style={[styles.teamAvatar, { backgroundColor: BG_DARK }]}
                />
                <Text style={styles.teamName}>Color</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Players */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Jugadores</Text>

          <View style={styles.playersRow}>
            <View style={styles.playersCol}>
              {['Wilmer López', 'Javier Córdova', 'Luis Fernandez', 'Santiago Torres'].map(
                (p) => (
                  <View key={p} style={styles.pill}>
                    <Text style={styles.pillText}>{p}</Text>
                  </View>
                )
              )}
            </View>

            <View style={styles.playersCol}>
              {['Carlos Martínez', 'Patrick Pemberton', 'Diego Pérez', 'Endrick García'].map(
                (p) => (
                  <View key={p} style={styles.pill}>
                    <Text style={styles.pillText}>{p}</Text>
                  </View>
                )
              )}
            </View>
          </View>
        </View>

        {/* CTA */}
        <View style={{ paddingHorizontal: 16 }}>
          <TouchableOpacity style={styles.voteBtn} activeOpacity={0.9}>
            <Text style={styles.voteText}>Votar por Mejor Jugador</Text>
          </TouchableOpacity>
        </View>

        {/* EXTRA SPACE to allow more scroll after CTA */}
        <View style={{ height: 140 }} />
      </ScrollView>

      {/* Same ConaTabBar used in tabs, rendered here too */}
      <View pointerEvents="box-none" style={styles.tabBarWrap}>
        <ConaTabBar {...tabBarProps} />
      </View>
    </SafeAreaView>
  );
}

const PILL_BORDER = '#1463FD';

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { flex: 1, backgroundColor: '#FFFFFF' },

  topBar: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backIcon: { width: 24, height: 24, tintColor: '#292D32' },
  shareIcon: { width: 24, height: 24, tintColor: '#1E1E1E' },

  titleWrap: { paddingHorizontal: 16, paddingVertical: 6 },
  title: { fontSize: 20, color: BG_DARK, lineHeight: 24 },
  titleStrong: { fontFamily: 'PlusJakarta-Bold', color: BG_DARK },
  titleSemi: { fontFamily: 'PlusJakarta-SemiBold', color: BG_DARK },
  titleFinal: { fontFamily: 'PlusJakarta-Bold', color: '#E14664' },
  subTitle: {
    color: MUTED,
    fontSize: 16,
    fontFamily: 'PlusJakarta-Regular',
    marginTop: 2,
  },

  // UPDATED: edge-to-edge and taller
  hero: {
    width: '100%',
    height: 220,
    backgroundColor: '#E5E7EB',
  },

  metaRow: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaItemNoIcon: { flexDirection: 'row', alignItems: 'center' },
  metaTextCol: { marginLeft: 0 },
  metaLabel: { color: BG_DARK, fontSize: 12, fontFamily: 'PlusJakarta-Medium' },
  metaValue: { color: BG_DARK, fontSize: 14, fontFamily: 'PlusJakarta-Bold' },

  card: {
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardTitle: {
    fontSize: 20,
    color: BG_DARK,
    fontFamily: 'PlusJakarta-Bold',
    textAlign: 'center',
  },

  resultBox: {
    marginTop: 14,
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(167, 238, 67, 0.29)',
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  teamCol: { alignItems: 'center', gap: 7 },
  teamAvatar: { width: 56, height: 56, borderRadius: 28 },
  teamName: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'PlusJakarta-Regular',
  },
  scoreText: { fontSize: 24, color: '#000' },
  scoreStrong: { fontFamily: 'PlusJakarta-Bold' },

  // Players
  playersRow: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  playersCol: {
    width: '48%',
    gap: 8,
  },
  pill: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: PILL_BORDER,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillText: {
    color: PILL_BORDER,
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'PlusJakarta-Medium',
    textAlign: 'center',
  },

  voteBtn: {
    marginTop: 14,
    height: 50,
    borderRadius: 16,
    backgroundColor: BRAND,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voteText: {
    color: BG_DARK,
    fontSize: 20,
    fontFamily: 'PlusJakarta-Bold',
  },

  tabBarWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
});
