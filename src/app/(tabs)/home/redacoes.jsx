import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useRouter } from "expo-router"

export default function Home() {
  const [redacoes, setRedacoes] = useState([])
  const router = useRouter()

  useEffect(() => {
    carregarRedacoes()
  }, [])

  useEffect(() => {
    console.log("Redações carregadas:", redacoes) // Agora será chamado após a atualização do estado
  }, [redacoes]) // Executa quando o estado `redacoes` for atualizado

  const carregarRedacoes = async () => {
    try {
      const listaSalva = await AsyncStorage.getItem("redacoes")
      if (listaSalva) {
        const redacoesArray = JSON.parse(listaSalva).reverse()
        setRedacoes(redacoesArray)
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as redações.")
    }
  }

  const abrirRedacao = (id) => {
    router.push({ pathname: "/statistics-writing", params: { id } })
  }

  return (
    <View style={styles.container}>
      {redacoes.length === 0 ? (
        <Text style={styles.emptyText}>Nenhuma redação salva</Text>
      ) : (
        <FlatList
          data={redacoes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => abrirRedacao(index)}
            >
              <Text style={styles.itemText}>
                Redação:{" "}
                {item.texto.length > 50
                  ? item.texto.slice(0, 100) + "..."
                  : item.texto}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ececec",
  },
  item: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: "#a46caccf",
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "#888",
  },
})
