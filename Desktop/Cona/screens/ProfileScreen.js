// screens/ProfileScreen.js
import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FOOTER_HEIGHT = 91;

export default function ProfileScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.screen}>
      {/* Scrollable content */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: FOOTER_HEIGHT }}
      >
        {/* HEADER */}
        <View style={styles.headerContainer}>
          <View style={styles.infoColumn}>
            <Text style={styles.name}>Sebastián Segares</Text>
            <Text style={styles.handle}>@sebastian_segares</Text>
            <View style={styles.statsRow}>
              <Text style={styles.statText}>35 partidos</Text>
              <View style={styles.rating}>
                <Text style={styles.statText}>4.2</Text>
                <Text style={styles.star}>★</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.avatarWrapper}
            onPress={() => navigation.navigate('Profile')}
          >
            <Image
              source={require('../assets/noimageprofile.png')}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>

        {/* INFORMACIÓN DEL JUGADOR */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Información del Jugador</Text>
          <View style={styles.row}>
            <View style={styles.infoBlock}>
              <Text style={styles.infoLabel}>Posición preferida</Text>
              <Text style={styles.infoValue}>Delantero</Text>
            </View>
            <View style={styles.infoBlock}>
              <Text style={styles.infoLabel}>Pie preferido</Text>
              <Text style={styles.infoValue}>Derecho</Text>
            </View>
          </View>
          <View style={styles.locationContainer}>
            <Text style={styles.infoLabel}>Ubicación</Text>
            <View style={styles.locationRow}>
              <Image
                source={require('../assets/location.png')}
                style={styles.locationIconSmall}
              />
              <Text style={styles.infoValue}>Escazú</Text>
            </View>
          </View>
        </View>

        {/* PREMIOS */}
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

        {/* PARTIDOS ANTERIORES */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Partidos Anteriores</Text>
          {[
            { title: 'Furati (Fut 5)', time: '7:00 - 9:00 pm', date: '26/08/2025' },
            { title: 'Complejo Sport (Fut 8)', time: '5:00 - 7:00 pm', date: '27/08/2025' },
            { title: 'Four (Fut 7)', time: '9:00 - 11:00 pm', date: '28/08/2025' },
          ].map((match, i) => (
            <View
              key={i}
              style={[
                styles.previousCard,
                i % 2 === 1 && styles.matchRowDark
              ]}
            >
              <Text
                style={[
                  styles.previousTitle,
                  i % 2 === 1 && styles.matchNameDark
                ]}
              >
                {match.title}
              </Text>
              <View style={styles.previousInfoRow}>
                <Image
                  source={require('../assets/clock-icon.png')}
                  style={styles.infoIcon}
                />
                <Text
                  style={[
                    styles.infoText,
                    i % 2 === 1 && styles.matchInfoDark
                  ]}
                >
                  {match.time}
                </Text>
                <Text style={styles.dot}>•</Text>
                <Text
                  style={[
                    styles.dateText,
                    i % 2 === 1 && styles.matchInfoDark
                  ]}
                >
                  {match.date}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* STICKY FOOTER */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate('AllMatches')}
        >
          <Image
            source={require('../assets/search-icon.png')}
            style={styles.footerIcon}
          />
          <Text style={styles.footerText}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate('Create')}
        >
          <Image
            source={require('../assets/create-icon.png')}
            style={styles.footerIcon}
          />
          <Text style={styles.footerText}>Crear</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Image
            source={require('../assets/settings-icon.png')}
            style={styles.footerIcon}
          />
          <Text style={styles.footerText}>Ajustes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#F4F5F6'
  },

  // ----- Header -----
  headerContainer: {
    width: '100%',
    backgroundColor: '#142029',
    paddingHorizontal: 16,
    paddingTop: 80,   
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoColumn: {
    flex: 1,
  },
  name: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'PlusJakarta-Bold',
  },
  handle: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'PlusJakarta-Regular',
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  statText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'PlusJakarta-Regular',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 11,
  },
  star: {
    color: '#EEC326',
    fontSize: 16,
    marginLeft: 6,
  },
  avatarWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#A7EE43',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },

  // ----- Cards & Content -----
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
  cardTitle: {
    fontSize: 20,
    fontFamily: 'PlusJakarta-Bold',
    color: '#142029',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoBlock: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 16,
    fontFamily: 'PlusJakarta-Regular',
    color: '#4B5563',
  },
  infoValue: {
    fontSize: 16,
    fontFamily: 'PlusJakarta-Bold',
    color: '#142029',
    marginTop: 4,
  },
  locationContainer: {
    marginTop: 16,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIconSmall: {
    width: 14,
    height: 14,
    marginRight: 8,
  },

  // Awards
  awardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  awardText: {
    flex: 1,
    marginLeft: 12,
  },
  awardTitle: {
    fontSize: 16,
    fontFamily: 'PlusJakarta-Bold',
    color: '#142029',
  },
  awardDate: {
    fontSize: 14,
    fontFamily: 'PlusJakarta-Regular',
    color: '#4B5563',
    marginTop: 4,
  },

  // Previous matches
  previousCard: {
    backgroundColor: '#142029',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  matchRowDark: {
    backgroundColor: '#FFF',
  },
  previousTitle: {
    color: '#A7EE43',
    fontSize: 18,
    fontFamily: 'PlusJakarta-SemiBold',
    marginBottom: 8,
  },
  matchNameDark: {
    color: '#142029',
  },
  previousInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
  },
  infoText: {
    color: '#A7EE43',
    fontSize: 14,
    fontFamily: 'PlusJakarta-Regular',
  },
  matchInfoDark: {
    color: '#142029',
  },
  dot: {
    color: '#A7EE43',
    fontSize: 14,
    marginHorizontal: 4,
  },
  dateText: {
    color: '#A7EE43',
    fontSize: 14,
    fontFamily: 'PlusJakarta-Regular',
  },

  // ----- Sticky Footer -----
  footer: {
    height: FOOTER_HEIGHT,
    width: '100%',
    backgroundColor: '#142029',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
  footerButton: {
    width: 82,
    alignItems: 'center',
  },
  footerIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
    tintColor: '#A7EE43',
  },
  footerText: {
    color: '#A7EE43',
    fontSize: 16,
    fontFamily: 'PlusJakarta-SemiBold',
  },
});
