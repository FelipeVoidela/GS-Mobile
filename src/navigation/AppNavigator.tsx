import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { COLORS } from '../utils/theme';


import PanoramaGeralScreen from '../screens/PanoramaGeralScreen';
import LocalizacaoAtingidaScreen from '../screens/LocalizacaoAtingidaScreen';
import TempoInterrupcaoScreen from '../screens/TempoInterrupcaoScreen';
import PrejuizosCausadosScreen from '../screens/PrejuizosCausadosScreen';
import RecomendacoesScreen from '../screens/RecomendacoesScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="PanoramaGeral"
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: COLORS.white,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          contentStyle: {
            backgroundColor: COLORS.background,
          }
        }}
      >
        <Stack.Screen 
          name="PanoramaGeral" 
          component={PanoramaGeralScreen} 
          options={{ title: 'Panorama Geral' }} 
        />
        <Stack.Screen 
          name="LocalizacaoAtingida" 
          component={LocalizacaoAtingidaScreen} 
          options={{ title: 'Localização Atingida' }} 
        />
        <Stack.Screen 
          name="TempoInterrupcao" 
          component={TempoInterrupcaoScreen} 
          options={{ title: 'Tempo de Interrupção' }} 
        />
        <Stack.Screen 
          name="PrejuizosCausados" 
          component={PrejuizosCausadosScreen} 
          options={{ title: 'Prejuízos Causados' }} 
        />
        <Stack.Screen 
          name="Recomendacoes" 
          component={RecomendacoesScreen} 
          options={{ title: 'Recomendações' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

