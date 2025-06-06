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
  Alert,
  SafeAreaView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { COLORS, COMMON_STYLES } from '../utils/theme';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';


export interface LocalizacaoData {
  bairro?: string;
  cidade: string;
  cep?: string;
}


const LocalizacaoAtingidaScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [cep, setCep] = useState('');

 
  const handleProceed = () => {
    if (!cidade.trim()) {
      Alert.alert('Campo Obrigatório', 'Por favor, informe a cidade atingida.');
      return;
    }

    const localizacaoData: LocalizacaoData = {
      bairro: bairro.trim() || undefined,
      cidade: cidade.trim(),
      cep: cep.trim() || undefined,
    };

    
    navigation.navigate('TempoInterrupcao', { localizacao: localizacaoData });
  };

  
  const formatCep = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    if (cleaned.length <= 5) {
      return cleaned;
    } else if (cleaned.length <= 8) {
      return `${cleaned.slice(0, 5)}-${cleaned.slice(5)}`;
    }
    return text;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingContainer}
      >
        <Header title="Localização Atingida" />
        
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <Text style={styles.subtitle}>Informe os detalhes da localização afetada</Text>
            
            <View style={styles.formContainer}>
              <Text style={styles.label}>Bairro (Opcional)</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Centro"
                value={bairro}
                onChangeText={setBairro}
                placeholderTextColor={COLORS.textLight}
              />

              <Text style={styles.label}>Cidade <Text style={styles.required}>*</Text></Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: São Paulo"
                value={cidade}
                onChangeText={setCidade}
                placeholderTextColor={COLORS.textLight}
              />

              <Text style={styles.label}>CEP (Opcional)</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 12345-678"
                value={cep}
                onChangeText={(text) => setCep(formatCep(text))}
                keyboardType="numeric"
                maxLength={9}
                placeholderTextColor={COLORS.textLight}
              />

              <TouchableOpacity style={styles.button} onPress={handleProceed}>
                <Text style={styles.buttonText}>Próximo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        
        <BottomNav currentScreen="LocalizacaoAtingida" />
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
  button: {
    ...COMMON_STYLES.button,
    width: '100%',
  },
  buttonText: {
    ...COMMON_STYLES.buttonText,
  },
});

export default LocalizacaoAtingidaScreen;

