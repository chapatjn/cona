import React from 'react';
import { useNavigation } from '@react-navigation/native';

import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      {/* DATE SELECTOR */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fecha</Text>
        <View style={styles.dateRow}>
          {['Dom', 'Lun', 'Mar', 'Mie', 'Jue'].map((day, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.dateItem,
                i === 0 ? styles.activeDate : styles.inactiveDate,
              ]}
            >
              <Text style={styles.dateDay}>{day}</Text>
              <Text style={styles.dateNum}>{24 + i}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* MATCHES */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Partidos disponibles</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[1, 2].map((_, i) => (
            <View key={i} style={styles.matchCard}>
              <Image
                source={require('../assets/furati.png')}
                style={styles.matchImage}
                 resizeMode="cover"
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
        </ScrollView>

        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={() => navigation.navigate('AllMatches')}
        >
          <Text style={styles.viewAllText}>Ver todas</Text>
        </TouchableOpacity>
      </View>

      {/* GOLEADORES */}
      <View style={styles.scorersSection}>
        <Text style={styles.sectionTitle}>Goleadores</Text>
        <Text style={styles.subtext}>Top 5 goleadores del mes</Text>
        {[1, 2, 3, 4, 5].map((rank, i) => (
          <View key={i} style={styles.playerCard}>
            <View style={styles.playerLeft}>
              <View style={styles.rankCircle}>
                <Text style={styles.rankText}>{rank}</Text>
              </View>
              <View style={styles.avatar} />
              <Text style={styles.emoji}>
                {rank === 1
                  ? '🥇'
                  : rank === 2
                  ? '🥈'
                  : rank === 3
                  ? '🥉'
                  : '⚽'}
              </Text>
            </View>
            <View style={styles.playerCenter}>
              <Text style={styles.playerName}>
                {
                  [
                    'Manfred Ugalde',
                    'Bukayo Saka',
                    'Ansu Fati',
                    'Santiago Van der Putten',
                    'Victor Gyokares',
                  ][i]
                }
              </Text>
              <Text style={styles.level}>Nivel Alto</Text>
            </View>
            <View style={styles.goals}>
              <Text style={styles.goalNumber}>
                {[18, 14, 11, 7, 6][i]}
              </Text>
              <Text style={styles.goalLabel}>Goles</Text>
            </View>
          </View>
        ))}

        <Text style={styles.link}>Ver ranking completo</Text>
      </View>

      {/* TOURNAMENTS */}
      <View style={styles.tournaments}>
        <Text style={styles.sectionTitle}>Torneos</Text>
        <Text style={styles.subtext}>
          Próximos torneos y competiciones
        </Text>
        <View style={styles.tournamentBox}>
          <View style={styles.tournamentIcon} />
          <Text style={styles.tournamentText}>
            Actualmente no hay torneos programados. ¡Mantente atento para
            futuras competiciones!
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 70,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'PlusJakarta-Bold',
    color: '#142029',
    marginBottom: 1,
  },
  dateRow: {
    flexDirection: 'row',
    gap: 8,
  },
  dateItem: {
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeDate: {
    backgroundColor: '#A7EE43',
  },
  inactiveDate: {
    backgroundColor: '#F4F5F6',
  },
  dateDay: {
    fontSize: 12,
    color: '#142029',
    fontFamily: 'PlusJakarta-Regular',
  },
  dateNum: {
    fontSize: 18,
    color: '#142029',
    fontFamily: 'PlusJakarta-Bold',
  },
  matchCard: {
    backgroundColor: '#142029',
    width: 280,
    borderRadius: 12,
    padding: 16,
    marginRight: 16,
  },
  matchImage: {
    height: 160,
    borderRadius: 8,
    marginBottom: 12,
  },
  matchTitle: {
    color: '#A7EE43',
    fontFamily: 'PlusJakarta-Bold',
    fontSize: 18,
    marginBottom: 4,
  },
  matchTime: {
    color: '#A7EE43',
    fontSize: 14,
    fontFamily: 'PlusJakarta-Regular',
    marginBottom: 4,
  },
  matchSubtext: {
    color: '#A7EE43',
    fontSize: 12,
    fontFamily: 'PlusJakarta-Regular',
    marginBottom: 4,
  },
  matchProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  progressBackground: {
    backgroundColor: '#D4D6DA',
    width: 120,
    height: 10,
    borderRadius: 16,
  },
  progressBar: {
    width: 36,
    height: 10,
    backgroundColor: '#A7EE43',
    borderRadius: 16,
  },
  matchAvailability: {
    color: '#A7EE43',
    fontSize: 12,
  },
  matchBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    color: '#A7EE43',
    fontSize: 16,
    fontFamily: 'PlusJakarta-Bold',
  },
  playButton: {
    backgroundColor: '#A7EE43',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  playText: {
    fontSize: 12,
    fontFamily: 'PlusJakarta-Bold',
    color: '#142029',
  },
  viewAllButton: {
    marginTop: 12,
    backgroundColor: '#142029',
    borderRadius: 8,
    alignItems: 'center',
    padding: 10,
  },
  viewAllText: {
    color: '#FFF',
    fontFamily: 'PlusJakarta-Bold',
  },
  scorersSection: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  subtext: {
    fontSize: 14,
    fontFamily: 'PlusJakarta-Regular',
    color: '#4B5563',
    marginBottom: 12,
  },
  playerCard: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  playerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rankCircle: {
    width: 24,
    height: 24,
    backgroundColor: '#A7EE43',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankText: {
    color: '#142029',
    fontFamily: 'PlusJakarta-Bold',
    fontSize: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
  },
  emoji: {
    fontSize: 20,
    marginLeft: 4,
  },
  playerCenter: {
    flex: 1,
  },
  playerName: {
    fontSize: 16,
    fontFamily: 'PlusJakarta-Bold',
    color: '#000',
  },
  level: {
    fontSize: 14,
    fontFamily: 'PlusJakarta-Regular',
    color: '#4B5563',
  },
  goals: {
    alignItems: 'flex-end',
  },
  goalNumber: {
    fontSize: 18,
    fontFamily: 'PlusJakarta-Bold',
    color: '#142029',
  },
  goalLabel: {
    fontSize: 14,
    fontFamily: 'PlusJakarta-Regular',
    color: '#4B5563',
  },
  link: {
    color: '#A7EE43',
    fontFamily: 'PlusJakarta-Bold',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 16,
  },
  tournaments: {
    padding: 16,
    backgroundColor: '#F4F5F6',
    marginTop: 24,
  },
  tournamentBox: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  tournamentIcon: {
    width: 50,
    height: 50,
    backgroundColor: '#4B5563',
    borderRadius: 25,
    marginBottom: 16,
  },
  tournamentText: {
    color: '#4B5563',
    fontFamily: 'PlusJakarta-Bold',
    fontSize: 14,
    textAlign: 'center',
  },
  matchImage: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginBottom: 12,
  }
  
  
});
