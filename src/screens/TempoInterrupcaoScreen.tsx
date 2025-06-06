import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform, 
  Switch, 
  Alert,
  SafeAreaView
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { LocalizacaoData } from './LocalizacaoAtingidaScreen';
import { COLORS, COMMON_STYLES } from '../utils/theme';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';


export interface TempoData {
  inicio: string; 
  fim?: string;
  duracaoEstimada?: string;
  interrupcaoAtual: boolean;
}


type TempoInterrupcaoRouteProp = RouteProp<RootStackParamList, 'TempoInterrupcao'>;


const TempoInterrupcaoScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<TempoInterrupcaoRouteProp>();
  const { localizacao } = route.params; 

  const [inicio, setInicio] = useState('');
  const [fim, setFim] = useState('');
  const [duracaoEstimada, setDuracaoEstimada] = useState('');
  const [interrupcaoAtual, setInterrupcaoAtual] = useState(false);

  
  const handleProceed = () => {
    if (!inicio.trim() && !interrupcaoAtual) {
      Alert.alert('Campo Obrigatório', 'Por favor, informe a Data/Hora de Início ou marque como "Ainda sem energia".');
      return;
    }
    if (!interrupcaoAtual && !fim.trim()) {
      Alert.alert('Campo Obrigatório', 'Por favor, informe a Data/Hora de Fim se a energia já retornou.');
      return;
    }

    const tempoData: TempoData = {
      inicio: inicio.trim(),
      fim: interrupcaoAtual ? undefined : fim.trim(),
      duracaoEstimada: duracaoEstimada.trim() || undefined,
      interrupcaoAtual,
    };

    navigation.navigate('PrejuizosCausados', { localizacao, tempo: tempoData });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingContainer}
      >
        <Header 
          title="Tempo de Interrupção" 
          showBackButton 
          onBackPress={() => navigation.goBack()} 
        />
        
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <Text style={styles.subtitle}>Registre o período sem energia</Text>
            
            <View style={styles.formContainer}>
              <Text style={styles.label}>Data/Hora de Início <Text style={styles.required}>*</Text></Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 01/06/2025 14:30"
                value={inicio}
                onChangeText={setInicio}
                placeholderTextColor={COLORS.textLight}
              />

              <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Ainda sem energia?</Text>
                <Switch
                  trackColor={{ false: COLORS.border, true: COLORS.primaryLight }}
                  thumbColor={interrupcaoAtual ? COLORS.primary : COLORS.white}
                  ios_backgroundColor={COLORS.border}
                  onValueChange={setInterrupcaoAtual}
                  value={interrupcaoAtual}
                />
              </View>

              {!interrupcaoAtual && (
                <>
                  <Text style={styles.label}>Data/Hora de Fim <Text style={styles.required}>*</Text></Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ex: 01/06/2025 16:45"
                    value={fim}
                    onChangeText={setFim}
                    placeholderTextColor={COLORS.textLight}
                    editable={!interrupcaoAtual}
                  />
                </>
              )}

              <Text style={styles.label}>Duração Estimada (Opcional)</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 2 horas e 15 minutos"
                value={duracaoEstimada}
                onChangeText={setDuracaoEstimada}
                placeholderTextColor={COLORS.textLight}
              />

              <TouchableOpacity style={styles.button} onPress={handleProceed}>
                <Text style={styles.buttonText}>Próximo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        
        <BottomNav currentScreen="TempoInterrupcao" />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  keyboardAvoidingContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 80, 
  },
  subtitle: {
    ...COMMON_STYLES.subtitle,
    textAlign: 'center',
    marginVertical: 20,
  },
  formContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 20,
    shadowColor: COLORS.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 8,
    fontWeight: '500',
  },
  required: {
    color: COLORS.error,
  },
  input: {
    ...COMMON_STYLES.input,
    width: '100%',
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  switchLabel: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '500',
  },
  button: {
    ...COMMON_STYLES.button,
    width: '100%',
  },
  buttonText: {
    ...COMMON_STYLES.buttonText,
  },
});

export default TempoInterrupcaoScreen;

