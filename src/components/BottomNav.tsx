import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { COLORS } from '../utils/theme';

interface BottomNavProps {
  currentScreen: keyof RootStackParamList;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentScreen }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.navButtonsContainer}>
      <TouchableOpacity 
        style={[styles.navButton, currentScreen === 'PanoramaGeral' && styles.activeNavButton]} 
        onPress={() => navigation.navigate('PanoramaGeral')}
      >
        <Text style={[styles.navButtonText, currentScreen === 'PanoramaGeral' && styles.activeNavButtonText]}>Resumo</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.navButton, currentScreen === 'LocalizacaoAtingida' && styles.activeNavButton]} 
        onPress={() => navigation.navigate('LocalizacaoAtingida')}
      >
        <Text style={[styles.navButtonText, currentScreen === 'LocalizacaoAtingida' && styles.activeNavButtonText]}>Localização</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.navButton, currentScreen === 'TempoInterrupcao' && styles.activeNavButton]} 
        onPress={() => navigation.navigate('TempoInterrupcao', { localizacao: { cidade: '' } })}
      >
        <Text style={[styles.navButtonText, currentScreen === 'TempoInterrupcao' && styles.activeNavButtonText]}>Tempo</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.navButton, currentScreen === 'PrejuizosCausados' && styles.activeNavButton]} 
        onPress={() => {
          // Navegação condicional - só deve ir para Prejuízos se tiver dados anteriores
          // Na prática, o usuário deve seguir o fluxo normal
          navigation.navigate('PanoramaGeral');
        }}
      >
        <Text style={[styles.navButtonText, currentScreen === 'PrejuizosCausados' && styles.activeNavButtonText]}>Prejuízos</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.navButton, currentScreen === 'Recomendacoes' && styles.activeNavButton]} 
        onPress={() => navigation.navigate('Recomendacoes')}
      >
        <Text style={[styles.navButtonText, currentScreen === 'Recomendacoes' && styles.activeNavButtonText]}>Dicas</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    alignItems: 'center',
  },
  navButton: {
    padding: 10,
  },
  activeNavButton: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  navButtonText: {
    color: COLORS.textLight,
    fontSize: 14,
  },
  activeNavButtonText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});

export default BottomNav;

