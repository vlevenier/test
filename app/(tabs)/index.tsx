import { Image, StyleSheet, ActivityIndicator, FlatList, Text, View, Button } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import { getFeriadosChile } from '@/functions/main';
import * as Sentry from '@sentry/react-native';
import { Picker } from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';
const showToast = (clase: string,titulo:string,msg:string)=> {
      
  Toast.show({
    type: clase,
    text1: titulo,
    text2: msg,
    
  });
}
const lanzaMsgInitialValues = [
  {
    nombre:"Hola, Esta es mi app desarrollada segun Solicitado",
    mostro:false
  },
  {
    nombre:"En un Template por defecto de expo...",
    mostro:false
  },
  {
    nombre:"Estoy consumiendo una api de feriados de chile.",
    mostro:false
  },
  {
    nombre:"Basicamente hay un select de año y un button... ",
    mostro:false
  },
  {
    nombre:" que genera  un throw Error. ",
    mostro:false
  },

  {
    nombre:" En el select seleccionas el año...  ",
    mostro:false
  },
  {
    nombre:"y se llena el listado con todos los feriados",
    mostro:false
  },
 
]
export default function HomeScreen() {
  const [feriados, setFeriados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [years, setYears] = useState<number[]>([]);
  const [lanzaMsg,setLanzaMsg] = useState(lanzaMsgInitialValues);
  
  const mostrarMensajes = (index: number) => {
    if (index >= lanzaMsg.length) return; 
    const item = lanzaMsg[index];
    if (!item.mostro) {
      showToast('success', item.nombre, '');
      item.mostro = true;
      setLanzaMsg([...lanzaMsg]); 

     
      setTimeout(() => mostrarMensajes(index + 1), 3000); 
    }
  };
  useEffect(() => {
    mostrarMensajes(0);
    YearSelector();
    getFeriados();
    Sentry.init({
      dsn: 'https://d495ae0aab1dc58c018bddb2ff716e83@o4508183934926848.ingest.us.sentry.io/4508183937286144',

      tracesSampleRate: 1.0,
      profilesSampleRate: 1.0,
    });
  }, [selectedYear]);

  const triggerError = () => {
    throw new Error("Este es un error simulado.");
  };

  const getFeriados = async () => {
    setLoading(true);
    getFeriadosChile(selectedYear)
      .then((data) => {
        setFeriados(data);
        setLoading(false);
        
      })
      .catch((error) => {
        setLoading(false);
        throw new Error("Error al consultar la API");
      });
  };

  const YearSelector = () => {
    const currentYear = new Date().getFullYear();
    const years_ = [];
    for (let i = currentYear - 3; i <= currentYear + 3; i++) {
      years_.push(i);
    }
    setYears(years_);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  



    
 
  return (
    
    <Sentry.ErrorBoundary>
      
      <FlatList
        data={feriados}
        renderItem={({ item }) => (
          <>
            <ThemedText type="subtitle">{item["nombre"]}</ThemedText>
            <ThemedText type="link">{item["fecha"]}</ThemedText>
          </>
        )}
        
        ListHeaderComponent={() => (
          <ThemedView>
            <Text style={styles.label}>Selecciona un año:</Text>
            <View style={styles.yearSelectorContainer}>
              <Picker
                selectedValue={selectedYear}
                onValueChange={(itemValue: number) => setSelectedYear(itemValue)}
                style={styles.picker}
              >
                {years.map((year) => (
                  <Picker.Item key={year} label={year.toString()} value={year} />
                ))}
              </Picker>
              <Button title="Generar Error" onPress={triggerError} />
            </View>
            
          </ThemedView>
        )}
      />
      
    </Sentry.ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  label: {
    color: "white",
    fontSize: 18,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: 150,
    backgroundColor: "white"
  },
  yearSelectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
