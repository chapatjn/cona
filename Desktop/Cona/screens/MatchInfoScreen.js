import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

export default function MatchInfoScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <Image source={require('../assets/cona-logo.png')} style={styles.logo} resizeMode="contain" />
          <Text style={styles.logoText}>Cona</Text>
        </View>
        <View style={styles.profileCircle} />
      </View>

      {/* MATCH INFO */}
      <View style={styles.section}>
        <Text style={styles.title}>Furati 5 v 5</Text>
        <Text style={styles.subtext}>Domingo 24 de Marzo • 19:00 - 20:00</Text>

        <Image source={{ uri: 'https://placehold.co/402x179' }} style={styles.image} />
        <View style={styles.availabilityTag}><Text style={styles.availabilityText}>6 Cupos Disponibles</Text></View>

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
          <Text style={styles.bodyText}>• Máximo 12 jugadores (6 por equipo){"\n"}• Duración: 60 minutos{"\n"}• Incluye árbitro profesional{"\n"}• Balones y chalecos incluidos</Text>
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
          <Text style={styles.bodyText}>🚿 Vestuarios{"\n"}🚗 Estacionamiento{"\n"}💡 Iluminación LED{"\n"}🟢 Cancha sintética</Text>
        </View>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.footerPrice}>₡ 3,000</Text>
          <Text style={styles.footerSubtext}>por jugador</Text>
        </View>
        <View>
          <Text style={styles.footerTextBold}>Quedan 6 Cupos</Text>
          <Text style={styles.footerText}>Reserva Ahora</Text>
        </View>
      </View>

      <View style={styles.joinSection}>
  <TouchableOpacity style={styles.joinButton}>
    <Text style={styles.joinButtonText}>Unirme</Text>
  </TouchableOpacity>
</View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  header: {
    backgroundColor: '#142029',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logo: {
    height: 40,
    width: 40,
  },
  logoText: {
    fontSize: 24,
    color: '#A7EE43',
    fontFamily: 'PlusJakarta-Bold',
  },
  profileCircle: {
    backgroundColor: '#A7EE43',
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  section: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#142029',
    marginBottom: 4,
  },
  subtext: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 179,
    borderRadius: 8,
    marginBottom: 8,
  },
  availabilityTag: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#8A8D91',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  availabilityText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  detailLabel: {
    fontSize: 12,
    color: '#142029',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#142029',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#142029',
    marginBottom: 8,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#142029',
    marginBottom: 8,
  },
  progressBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  progressBarBG: {
    flex: 1,
    height: 10,
    backgroundColor: '#D6DDE6',
    borderRadius: 16,
    marginRight: 8,
  },
  progressBarFill: {
    width: '30%',
    height: 10,
    backgroundColor: '#A7EE43',
    borderRadius: 16,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4B5563',
  },
  playersWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  playersColumn: {
    flex: 1,
  },
  playerName: {
    fontSize: 14,
    color: '#1463FD',
    fontFamily: 'PlusJakarta-SemiBold',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#1463FD',
    borderRadius: 16,
    textAlign: 'center',
    marginBottom: 4,
  },
  bodyText: {
    fontSize: 16,
    color: '#142029',
    lineHeight: 24,
  },
  footer: {
    backgroundColor: '#142029',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: '#A7EE43',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 16,
    color: '#A7EE43',
    fontWeight: '500',
  },
  footerTextBold: {
    fontSize: 14,
    fontWeight: '700',
    color: '#A7EE43',
  },
  footerText: {
    fontSize: 12,
    color: '#A7EE43',
    fontWeight: '500',
  },
  joinButton: {
    backgroundColor: '#A7EE43',
    margin: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  joinButtonText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#142029',
    fontFamily: 'Inter',
  },
  joinSection: {
    backgroundColor: '#142029',
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  
});
