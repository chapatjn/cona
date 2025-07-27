import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AllMatchesScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {/* Header with back and logo */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backRow} onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
          <Text style={styles.backText}>Volver</Text>
        </TouchableOpacity>
        <Text style={styles.found}>4 partidos encontrados</Text>
      </View>

      {/* Section title */}
      <View style={styles.titleSection}>
        <Text style={styles.title}>Partidos disponibles</Text>
        <Text style={styles.subtitle}>Buscá la mejenga perfecta</Text>
      </View>

      {/* Filter row (no logic yet) */}
      <ScrollView horizontal style={styles.filters} showsHorizontalScrollIndicator={false}>
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
            <Image source={require('../assets/canchaCerroAlto.png')} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.fieldTitle}>Furati (Fut 5)</Text>z
              <Text style={styles.time}>🕒 7:00 - 9:00 pm</Text>
              <Text style={styles.availText}>Campos Disponibles</Text>
              <View style={styles.progressRow}>
                <View style={styles.progressBarBg}>
                  <View style={styles.progressBarFill} />
                </View>
                <Text style={styles.availText}>3/10</Text>
              </View>
              <View style={styles.bottomRow}>
                <Text style={styles.price}>₡ 3,000</Text>
                <TouchableOpacity
  style={styles.playButton}
  onPress={() => navigation.navigate('MatchInfo')}>
  <Text style={styles.playText}>Jugar</Text>
</TouchableOpacity>

              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  header: {
    backgroundColor: '#142029',
    padding: 16,
    paddingTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 20,
    color: '#fff',
    marginRight: 6,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'PlusJakarta-Regular',
  },
  found: {
    color: '#4B5563',
    fontSize: 14,
    fontFamily: 'PlusJakarta-Regular',
  },
  titleSection: {
    padding: 16,
    borderBottomColor: '#4B5563',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    color: '#142029',
    fontWeight: '700',
    fontFamily: 'PlusJakarta-Bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#4B5563',
    marginTop: 4,
    fontFamily: 'PlusJakarta-Regular',
  },
  filters: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#F4F5F6',
  },
  filterItem: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderColor: '#142029',
    borderWidth: 1,
    marginRight: 10,
  },
  filterText: {
    fontSize: 12,
    color: '#142029',
    fontFamily: 'Inter',
  },
  matchList: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 40,
  },
  matchCard: {
    backgroundColor: '#142029',
    borderRadius: 8,
    marginBottom: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardContent: {
    padding: 20,
  },
  fieldTitle: {
    fontSize: 20,
    color: '#A7EE43',
    fontFamily: 'PlusJakarta-Bold',
    marginBottom: 6,
  },
  time: {
    color: '#A7EE43',
    fontSize: 14,
    fontFamily: 'PlusJakarta-Regular',
    marginBottom: 10,
  },
  availText: {
    color: '#A7EE43',
    fontSize: 12,
    marginBottom: 4,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  progressBarBg: {
    height: 10,
    width: 200,
    backgroundColor: 'rgba(214, 221, 230, 0.20)',
    borderRadius: 16,
  },
  progressBarFill: {
    height: 10,
    width: 55,
    backgroundColor: '#A7EE43',
    borderRadius: 16,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    color: '#A7EE43',
    fontSize: 16,
    fontFamily: 'Inter',
  },
  playBtn: {
    backgroundColor: '#A7EE43',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  playText: {
    color: '#142029',
    fontSize: 12,
    fontFamily: 'Inter',
  },
});
