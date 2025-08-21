// screens/DevMenu.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BRAND = '#A7EE43';
const BG = '#142029';

export default function DevMenu() {
  const nav = useNavigation<any>();

  const mockParams = {
    matchId: 'mock-123',
    venue: 'Furati',
    field: '4',
    dateLabel: 'Domingo 24 de Agosto, 2025',
    timeLabel: '19:00-20:00',
    scoreHome: 5,
    scoreAway: 3,
    mvpCandidates: [
      { id: 'u1', name: 'Sebastián Segares' },
      { id: 'u2', name: 'Bukayo Saka' },
      { id: 'u3', name: 'Manfred Ugalde' },
    ],
  };

  const Item = ({ title, route, params }: { title: string; route: string; params?: any }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => nav.navigate(route, params)}
      activeOpacity={0.85}
    >
      <Text style={styles.itemText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={{ backgroundColor: BG }} contentContainerStyle={styles.wrap}>
      <Text style={styles.title}>DEV MENU</Text>
      <Text style={styles.note}>Navegá a pantallas con datos mock.</Text>

      <Item title="Resumen Final (mock)" route="MatchFinalSummary" params={mockParams} />
      <Item title="Calificar Jugadores (mock)" route="MatchRatePlayers" params={mockParams} />
      <Item title="Votar MVP (mock)" route="MatchMvpVote" params={mockParams} />
      <Item title="Recibo / Pago (mock)" route="MatchReceipt" params={{ ...mockParams, totalCRC: 3000 }} />

      <View style={{ height: 12 }} />
      <Item title="Sign In" route="SignIn" />
      <Item title="Sign Up" route="SignUp" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 16, gap: 10 },
  title: { color: BRAND, fontSize: 22, fontFamily: 'PlusJakarta-Bold' },
  note: { color: '#D6E9A3', fontSize: 14, fontFamily: 'PlusJakarta-Regular', marginBottom: 8 },

  item: {
    height: 46,
    borderRadius: 10,
    backgroundColor: '#23303A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: { color: BRAND, fontSize: 14, fontFamily: 'PlusJakarta-Regular' },
});
