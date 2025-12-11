import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';
import { useState, useEffect } from 'react';
import getApi from './services/api.js';

export default function App() {
  const [dados, setDados] = useState([])
  const [busca, setBusca] = useState(true)
  const [error, setError] = useState("Erro ao buscar")

  useEffect(() => {
    async function fachApi() {
      try {
        let res = await getApi()
        setDados(res)
      } catch (error) {
        setError(error)
      }
    }
    fachApi()

    setBusca(false)
  }, [])

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text>New api</Text>
        {busca ? (<ActivityIndicator size={"large"} />) :
          (<TouchableOpacity onPress={async () => { setBusca(true); let res = await getApi(); setDados(res); setBusca(false); }}>
            <Text>Buscar dados</Text>
          </TouchableOpacity>)}
      </View>

      <ScrollView style={styles.card}>

        <View style={styles.cardContent}>
          {dados.map((dado) => {
            return (
              <View style={styles.card}>
                <Text>{dado.title}</Text>
                <Image style={styles.img} source={{ uri: dado.url }} />
                <Text style={styles.title}>{dado.title}</Text>
              </View>
            )
          })}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#414141ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    justifyContent: "center",
    alignItens: "center",
    paddingHorizontal: 20,
    gap: 5
  },
  cardContent: {
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
    flex: 1,
    padding: 10,
    gap: 6,
    width: "100%"
  },
  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 15,
    padding: 16,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: "#000",
    shadowOpacity: 15,
    shadowRadius: 6
  },
  img: {
    width: "100%",
    height: 150
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#222"
  }
});
