import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { COLORS, COMMON_STYLES } from '../utils/theme';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';


const RecomendacoesScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header title="Recomendações" />
        
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Recomendações e Boas Práticas</Text>
          <Text style={styles.subtitle}>Para lidar com eventos de falta de energia</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Antes do Evento (Prevenção)</Text>
            <View style={styles.divider} />
            
            <View style={styles.recommendationItem}>
              <Text style={styles.recommendationText}>
                <Text style={styles.bullet}>•</Text> Mantenha um kit de emergência: lanternas, pilhas extras, rádio a pilha, carregadores portáteis (power banks) carregados, água potável e alimentos não perecíveis.
              </Text>
            </View>
            
            <View style={styles.recommendationItem}>
              <Text style={styles.recommendationText}>
                <Text style={styles.bullet}>•</Text> Tenha um plano familiar: defina pontos de encontro e formas de comunicação caso os celulares não funcionem.
              </Text>
            </View>
            
            <View style={styles.recommendationItem}>
              <Text style={styles.recommendationText}>
                <Text style={styles.bullet}>•</Text> Proteja seus eletrônicos: use protetores contra surtos de tensão nas tomadas dos aparelhos mais sensíveis.
              </Text>
            </View>
            
            <View style={styles.recommendationItem}>
              <Text style={styles.recommendationText}>
                <Text style={styles.bullet}>•</Text> Podas preventivas: Verifique árvores próximas à rede elétrica em sua propriedade e solicite poda à prefeitura ou companhia de energia, se necessário.
              </Text>
            </View>
            
            <View style={styles.recommendationItem}>
              <Text style={styles.recommendationText}>
                <Text style={styles.bullet}>•</Text> Mantenha calhas e ralos limpos para evitar alagamentos que possam afetar instalações elétricas.
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Durante a Falta de Energia</Text>
            <View style={styles.divider} />
            
            <View style={styles.recommendationItem}>
              <Text style={styles.recommendationText}>
                <Text style={styles.bullet}>•</Text> Desligue os aparelhos da tomada: especialmente os eletrônicos sensíveis, para evitar danos quando a energia retornar (picos de tensão).
              </Text>
            </View>
            
            <View style={styles.recommendationItem}>
              <Text style={styles.recommendationText}>
                <Text style={styles.bullet}>•</Text> Use lanternas: evite velas, pelo risco de incêndio.
              </Text>
            </View>
            
            <View style={styles.recommendationItem}>
              <Text style={styles.recommendationText}>
                <Text style={styles.bullet}>•</Text> Mantenha geladeira e freezer fechados: isso ajuda a conservar a temperatura e os alimentos por mais tempo.
              </Text>
            </View>
            
            <View style={styles.recommendationItem}>
              <Text style={styles.recommendationText}>
                <Text style={styles.bullet}>•</Text> Informe a companhia de energia: reporte a falta de luz na sua área através dos canais oficiais (telefone, app, site).
              </Text>
            </View>
            
            <View style={styles.recommendationItem}>
              <Text style={styles.recommendationText}>
                <Text style={styles.bullet}>•</Text> Mantenha-se informado: use um rádio a pilha ou o celular (enquanto tiver bateria) para acompanhar notícias e comunicados da defesa civil e da companhia elétrica.
              </Text>
            </View>
            
            <View style={styles.recommendationItem}>
              <Text style={styles.recommendationText}>
                <Text style={styles.bullet}>•</Text> Cuidado com geradores: Se usar gerador, instale-o em local ventilado, longe de janelas e portas, para evitar intoxicação por monóxido de carbono.
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Após o Retorno da Energia</Text>
            <View style={styles.divider} />
            
            <View style={styles.recommendationItem}>
              <Text style={styles.recommendationText}>
                <Text style={styles.bullet}>•</Text> Religue os aparelhos gradualmente: espere alguns minutos após o retorno da energia antes de ligar tudo de uma vez, para evitar sobrecarga.
              </Text>
            </View>
            
            <View style={styles.recommendationItem}>
              <Text style={styles.recommendationText}>
                <Text style={styles.bullet}>•</Text> Verifique os alimentos: descarte qualquer alimento perecível que tenha ficado em temperatura ambiente por mais de duas horas (ou conforme recomendações sanitárias).
              </Text>
            </View>
            
            <View style={styles.recommendationItem}>
              <Text style={styles.recommendationText}>
                <Text style={styles.bullet}>•</Text> Inspecione danos: verifique se há danos em fiações ou equipamentos antes de usá-los.
              </Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('PanoramaGeral')}
          >
            <Text style={styles.buttonText}>Voltar para o Resumo</Text>
          </TouchableOpacity>
        </ScrollView>
        
        <BottomNav currentScreen="Recomendacoes" />
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
  scrollContainer: {
    padding: 20,
    paddingBottom: 30,
  },
  title: {
    ...COMMON_STYLES.title,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 25,
  },
  section: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: COLORS.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 5,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: 10,
  },
  recommendationItem: {
    marginBottom: 10,
    paddingLeft: 5,
  },
  recommendationText: {
    fontSize: 15,
    color: COLORS.text,
    lineHeight: 22,
  },
  bullet: {
    fontSize: 18,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  button: {
    ...COMMON_STYLES.button,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    ...COMMON_STYLES.buttonText,
  },
});

export default RecomendacoesScreen;

