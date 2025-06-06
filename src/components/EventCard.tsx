import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../utils/theme';

interface EventCardProps {
  id: string;
  localizacao: {
    bairro?: string;
    cidade: string;
    cep?: string;
  };
  tempo: {
    inicio: string;
    fim?: string;
    duracaoEstimada?: string;
    interrupcaoAtual: boolean;
  };
  prejuizos: {
    descricao: string;
  };
  dataRegistro: string;
  onPress?: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ 
  localizacao, 
  tempo, 
  prejuizos, 
  dataRegistro, 
  onPress 
}) => {
  return (
    <TouchableOpacity style={styles.eventItem} onPress={onPress}>
      <Text style={styles.eventText}>
        <Text style={styles.bold}>Local:</Text> {localizacao.cidade}
        {localizacao.bairro ? `, ${localizacao.bairro}` : ''}
        {localizacao.cep ? ` (${localizacao.cep})` : ''}
      </Text>
      
      <Text style={styles.eventText}>
        <Text style={styles.bold}>Início:</Text> {tempo.inicio}
      </Text>
      
      {tempo.interrupcaoAtual ? (
        <Text style={[styles.eventText, styles.ongoing]}>
          <Text style={styles.bold}>Status:</Text> Ainda sem energia
        </Text>
      ) : (
        <Text style={styles.eventText}>
          <Text style={styles.bold}>Fim:</Text> {tempo.fim}
        </Text>
      )}
      
      {tempo.duracaoEstimada && (
        <Text style={styles.eventText}>
          <Text style={styles.bold}>Duração Estimada:</Text> {tempo.duracaoEstimada}
        </Text>
      )}
      
      <Text style={styles.eventText}>
        <Text style={styles.bold}>Prejuízos:</Text> {prejuizos.descricao}
      </Text>
      
      <Text style={styles.eventDate}>
        Registrado em: {new Date(dataRegistro).toLocaleDateString()} {new Date(dataRegistro).toLocaleTimeString()}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  eventItem: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.secondary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  eventText: {
    fontSize: 15,
    color: COLORS.text,
    marginBottom: 5,
    lineHeight: 20,
  },
  bold: {
    fontWeight: 'bold',
    color: COLORS.primaryDark,
  },
  ongoing: {
    color: COLORS.warning,
    fontWeight: 'bold',
  },
  eventDate: {
    fontSize: 12,
    color: COLORS.textLight,
    textAlign: 'right',
    marginTop: 5,
  },
});

export default EventCard;

