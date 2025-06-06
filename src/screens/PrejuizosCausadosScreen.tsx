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
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { LocalizacaoData } from './LocalizacaoAtingidaScreen';
import { TempoData } from './TempoInterrupcaoScreen';
import { PowerOutageEvent, saveEvent } from '../utils/storage';
import { COLORS, COMMON_STYLES } from '../utils/theme';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import 'react-native-get-random-values'; 
import { v4 as uuidv4 } from 'uuid'; 


type PrejuizosCausadosRouteProp = RouteProp<RootStackParamList, 'PrejuizosCausados'>;


const PrejuizosCausadosScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<PrejuizosCausadosRouteProp>();
  
  // Verificação de segurança para os parâmetros
  const localizacao = route.params?.localizacao;
  const tempo = route.params?.tempo;
  
  // Verificar se os parâmetros necessários estão presentes
  React.useEffect(() => {
    if (!localizacao || !tempo) {
      console.error('Parâmetros de navegação ausentes:', { localizacao, tempo });
      Alert.alert(
        'Erro de Navegação',
        'Informações necessárias não foram recebidas. Voltando para a tela anterior.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    }
  }, [localizacao, tempo, navigation]);

  const [descricao, setDescricao] = useState('');

  
  const handleFinish = async () => {
    try {
      if (!descricao.trim()) {
        Alert.alert('Campo Obrigatório', 'Por favor, descreva os prejuízos causados ou informe "Nenhum".');
        return;
      }

      const prejuizosData = { descricao: descricao.trim() };

      
      const newEvent: PowerOutageEvent = {
        id: uuidv4(), 
        localizacao: localizacao,
        tempo: tempo,
        prejuizos: prejuizosData,
        dataRegistro: new Date().toISOString(), 
      };

      console.log('Salvando Evento:', newEvent);

      
      const success = await saveEvent(newEvent);

      if (success) {
        Alert.alert('Sucesso', 'Evento de falta de energia registrado com sucesso!');
        navigation.navigate('PanoramaGeral');
      } else {
        Alert.alert('Erro', 'Não foi possível salvar o evento. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao finalizar registro:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingContainer}
      >
        <Header 
          title="Prejuízos Causados" 
          showBackButton 
          onBackPress={() => navigation.goBack()} 
        />
        
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <Text style={styles.subtitle}>Descreva os prejuízos observados</Text>
            
            <View style={styles.formContainer}>
              <Text style={styles.label}>
                Prejuízos Causados: Campo para descrição dos prejuízos observados <Text style={styles.required}>*</Text>
              </Text>
              
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Descreva os prejuízos observados: residências impactadas, estabelecimentos afetados, entre outros."
                value={descricao}
                onChangeText={setDescricao}
                placeholderTextColor={COLORS.textLight}
                multiline={true}
                numberOfLines={6}
                textAlignVertical="top"
              />

              <TouchableOpacity style={styles.buttonSuccess} onPress={handleFinish}>
                <Text style={styles.buttonText}>Finalizar Registro</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        
        <BottomNav currentScreen="PrejuizosCausados" />
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
  labelHint: {
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: 'normal',
  },
  required: {
    color: COLORS.error,
  },
  input: {
    ...COMMON_STYLES.input,
    width: '100%',
    marginBottom: 20,
  },
  textArea: {
    ...COMMON_STYLES.textArea,
  },
  buttonSuccess: {
    ...COMMON_STYLES.buttonSuccess,
    width: '100%',
  },
  buttonText: {
    ...COMMON_STYLES.buttonText,
  },
});

export default PrejuizosCausadosScreen;

