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
import { card } from './components/Card'

export default function App() {
  const [dados, setDados] = useState([])
  const [busca, setBusca] = useState(true)

  useEffect(() => {
    async function getApi() {
      const res = await fetch("https://jsonplaceholder.typicode.com/photos")
      const data = await res.json()
      setDados(data)
      setBusca(false)
    }
    getApi()
  }, [busca])

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Text>New api</Text>
        {busca ? (<ActivityIndicator size={"large"} />) :
          (<TouchableOpacity>
            <Text onPress={() => setBusca(!dados)}>Buscar dados</Text>
          </TouchableOpacity>)}
      </View>

      <ScrollView style={styles.card}>

        <View style={styles.cardContent}>
          {dados.map((dado) => {
            return (
              <View style={card}>
                <Text>{dado.title}</Text>
                <Image style={styles.img} source={{ url: dado.id }}/>
                <Text style={styles.title}>{dados.title}</Text>
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
