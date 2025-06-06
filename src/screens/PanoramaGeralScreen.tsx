import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert, SafeAreaView } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { PowerOutageEvent, getEvents } from '../utils/storage';
import { COLORS, COMMON_STYLES } from '../utils/theme';
import BottomNav from '../components/BottomNav';
import EventCard from '../components/EventCard';
import Header from '../components/Header';


const PanoramaGeralScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const isFocused = useIsFocused();
  const [eventos, setEventos] = useState<PowerOutageEvent[]>([]);
  const [loading, setLoading] = useState(true);

  
  const loadEvents = useCallback(async () => {
    setLoading(true);
    try {
      const storedEvents = await getEvents();
      
      storedEvents.sort((a, b) => new Date(b.dataRegistro).getTime() - new Date(a.dataRegistro).getTime());
      setEventos(storedEvents);
    } catch (error) {
      console.error('Falha ao carregar eventos.', error);
      Alert.alert('Erro', 'Não foi possível carregar os eventos registrados.');
      setEventos([]); 
    } finally {
      setLoading(false);
    }
  }, []);

  
  useEffect(() => {
    if (isFocused) {
      loadEvents();
    }
  }, [isFocused, loadEvents]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header title="Panorama Geral" />
        
        <Text style={styles.subtitle}>Resumo de Faltas de Energia</Text>

        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />
        ) : eventos.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.noEventsText}>
              Nenhum evento registrado ainda. Toque no botão "+" para adicionar um novo registro.
            </Text>
          </View>
        ) : (
          <FlatList
            data={eventos}
            renderItem={({ item }) => (
              <EventCard
                id={item.id}
                localizacao={item.localizacao}
                tempo={item.tempo}
                prejuizos={item.prejuizos}
                dataRegistro={item.dataRegistro}
                onPress={() => {
                  Alert.alert('Detalhes do Evento', `Evento em ${item.localizacao.cidade} registrado em ${new Date(item.dataRegistro).toLocaleDateString()}`);
                }}
              />
            )}
            keyExtractor={(item) => item.id}
            style={styles.list}
            contentContainerStyle={styles.listContent}
          />
        )}

        {/* Botão de adicionar novo evento */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('LocalizacaoAtingida')}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>

        {/* Barra de navegação inferior */}
        <BottomNav currentScreen="PanoramaGeral" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  container: {
    ...COMMON_STYLES.container,
    paddingBottom: 70, 
  },
  subtitle: {
    ...COMMON_STYLES.subtitle,
    textAlign: 'center',
    marginVertical: 15,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  noEventsText: {
    fontSize: 18,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 24,
  },
  addButton: {
    ...COMMON_STYLES.addButton,
  },
  addButtonText: {
    ...COMMON_STYLES.addButtonText,
  },
});

export default PanoramaGeralScreen;

