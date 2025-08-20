// screens/AllMatchesScreen.js
import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FOOTER_HEIGHT = 91;

export default function AllMatchesScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: FOOTER_HEIGHT }}
      >
        {/* Back + Count Row */}
        <View style={styles.topRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <Text style={styles.backArrow}>←</Text>
            <Text style={styles.backText}>Volver</Text>
          </TouchableOpacity>
          <Text style={styles.countText}>4 partidos encontrados</Text>
        </View>

        {/* Section title */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Partidos disponibles</Text>
          <Text style={styles.subtitle}>Buscá la mejenga perfecta</Text>
        </View>

        {/* Filter row */}
        <ScrollView
          horizontal
          style={styles.filters}
          showsHorizontalScrollIndicator={false}
        >
          {['Fecha', 'Tipo', 'Zona', 'Horario', 'Ordenar'].map((filter, i) => (
            <View key={i} style={styles.filterItem}>
              <Text style={styles.filterText}>{filter}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Matches */}
        <View style={styles.matchList}>
          {[1, 2, 3].map((_, i) => (
            <View key={i} style={styles.matchCard}>
              <Image
                source={require('../assets/furati.png')}
                style={styles.matchImage}
              />
              <Text style={styles.matchTitle}>Furati (Fut 5)</Text>
              <Text style={styles.matchTime}>🕒 7:00 - 9:00 pm</Text>
              <Text style={styles.matchSubtext}>Campos Disponibles</Text>
              <View style={styles.matchProgress}>
                <View style={styles.progressBackground}>
                  <View style={styles.progressBar} />
                </View>
                <Text style={styles.matchAvailability}>3/10</Text>
              </View>
              <View style={styles.matchBottomRow}>
                <Text style={styles.price}>₡ 3,000</Text>
                <TouchableOpacity
                  style={styles.playButton}
                  onPress={() => navigation.navigate('MatchInfo')}
                >
                  <Text style={styles.playText}>Jugar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  container: { flex: 1, backgroundColor: '#FFF' },

  // Top Row
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  backArrow: { fontSize: 18, color: '#142029' },
  backText: { fontSize: 16, color: '#142029', fontFamily: 'PlusJakarta-Regular' },
  countText: { fontSize: 14, color: '#4B5563', fontFamily: 'PlusJakarta-Regular' },

  // Section title
  titleSection: {
    padding: 16,
    borderBottomColor: '#4B5563',
    borderBottomWidth: 1,
  },
  title: { fontSize: 20, color: '#142029', fontFamily: 'PlusJakarta-Bold' },
  subtitle: {
    marginTop: 4,
    fontSize: 16,
    color: '#4B5563',
    fontFamily: 'PlusJakarta-Regular',
  },

  // Filters
  filters: { paddingHorizontal: 16, paddingVertical: 10, backgroundColor: '#F4F5F6' },
  filterItem: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderColor: '#142029',
    borderWidth: 1,
    marginRight: 10,
  },
  filterText: { fontSize: 12, color: '#142029', fontFamily: 'Inter' },

  // Matches (copied style from HomeScreen)
  matchList: { paddingHorizontal: 16, paddingTop: 10 },
  matchCard: {
    backgroundColor: '#142029',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  matchImage: { height: 160, borderRadius: 8, marginBottom: 12, width: '100%', resizeMode: 'cover' },
  matchTitle: { color: '#A7EE43', fontFamily: 'PlusJakarta-Bold', fontSize: 18, marginBottom: 4 },
  matchTime: { color: '#A7EE43', fontSize: 14, fontFamily: 'PlusJakarta-Regular', marginBottom: 4 },
  matchSubtext: { color: '#A7EE43', fontSize: 12, fontFamily: 'PlusJakarta-Regular', marginBottom: 4 },
  matchProgress: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  progressBackground: { backgroundColor: '#D4D6DA', width: 120, height: 10, borderRadius: 16 },
  progressBar: { width: 36, height: 10, backgroundColor: '#A7EE43', borderRadius: 16 },
  matchAvailability: { color: '#A7EE43', fontSize: 12 },
  matchBottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  price: { color: '#A7EE43', fontSize: 16, fontFamily: 'PlusJakarta-Bold' },
  playButton: { backgroundColor: '#A7EE43', paddingVertical: 6, paddingHorizontal: 16, borderRadius: 16 },
  playText: { fontSize: 12, fontFamily: 'PlusJakarta-Bold', color: '#142029' },
});
