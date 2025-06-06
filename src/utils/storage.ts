import AsyncStorage from '@react-native-async-storage/async-storage';
// Verificação de disponibilidade do AsyncStorage
const isAsyncStorageAvailable = () => {
  return AsyncStorage !== null && AsyncStorage !== undefined;
};


export interface PowerOutageEvent {
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
}

const STORAGE_KEY = 'powerOutageEvents';


export const getEvents = async (): Promise<PowerOutageEvent[]> => {
  try {
    if (!isAsyncStorageAvailable()) {
      console.error('AsyncStorage não está disponível');
      return [];
    }
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Failed to fetch events from storage', e);
    return [];
  }
};


export const saveEvent = async (newEvent: PowerOutageEvent): Promise<boolean> => {
  try {
    if (!isAsyncStorageAvailable()) {
      console.error('AsyncStorage não está disponível');
      return false;
    }
    const existingEvents = await getEvents();
    const updatedEvents = [...existingEvents, newEvent];
    const jsonValue = JSON.stringify(updatedEvents);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    return true;
  } catch (e) {
    console.error('Failed to save event to storage', e);
    return false;
  }
};


export const updateEvent = async (updatedEvent: PowerOutageEvent): Promise<boolean> => {
  try {
    if (!isAsyncStorageAvailable()) {
      console.error('AsyncStorage não está disponível');
      return false;
    }
    const existingEvents = await getEvents();
    const eventIndex = existingEvents.findIndex(event => event.id === updatedEvent.id);
    if (eventIndex > -1) {
      existingEvents[eventIndex] = updatedEvent;
      const jsonValue = JSON.stringify(existingEvents);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
      return true;
    }
    return false; 
  } catch (e) {
    console.error('Failed to update event in storage', e);
    return false;
  }
};


export const deleteEvent = async (eventId: string): Promise<boolean> => {
  try {
    if (!isAsyncStorageAvailable()) {
      console.error('AsyncStorage não está disponível');
      return false;
    }
    const existingEvents = await getEvents();
    const updatedEvents = existingEvents.filter(event => event.id !== eventId);
    const jsonValue = JSON.stringify(updatedEvents);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    return true;
  } catch (e) {
    console.error('Failed to delete event from storage', e);
    return false;
  }
};

export const clearAllEvents = async (): Promise<boolean> => {
  try {
    if (!isAsyncStorageAvailable()) {
      console.error('AsyncStorage não está disponível');
      return false;
    }
    await AsyncStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (e) {
    console.error('Failed to clear events from storage', e);
    return false;
  }
};

