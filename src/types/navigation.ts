import { LocalizacaoData } from "../screens/LocalizacaoAtingidaScreen";
import { TempoData } from "../screens/TempoInterrupcaoScreen";

export type RootStackParamList = {
  PanoramaGeral: undefined;
  LocalizacaoAtingida: undefined;
  TempoInterrupcao: { localizacao: LocalizacaoData };
  PrejuizosCausados: { localizacao: LocalizacaoData; tempo: TempoData };
  Recomendacoes: undefined;
};

