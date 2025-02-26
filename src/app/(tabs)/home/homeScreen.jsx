import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useRouter } from "expo-router"

export default function HomeScreen() {
  const [redacoes, setRedacoes] = useState([])
  const router = useRouter()

  useEffect(() => {
    carregarRedacoes()
  }, [])

  const carregarRedacoes = async () => {
    try {
      const listaSalva = await AsyncStorage.getItem("redacoes")
      if (listaSalva) {
        setRedacoes(JSON.parse(listaSalva))
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as redações.")
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.ConteinerDescricao}>
        <Text style={styles.subtitle}>
          Seja bem-vindo(a) ao Letras Compartilhadas, onde juntos transformamos
          dúvidas em conhecimento e redações em conquistas!
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/write-essay")}
      >
        <Text style={styles.buttonText}>✍️ Criar Nova Redação</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/redacoes")}
      >
        <Text style={styles.buttonText}>📜 Minhas Redações</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>📌 Últimas Redações</Text>
      {redacoes.length === 0 ? (
        <Text style={styles.emptyText}>Nenhuma redação salva ainda.</Text>
      ) : (
        <FlatList
          data={redacoes.slice(-3)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.redacaoItem}
              onPress={() =>
                router.push({ pathname: "/view-essay", params: { id: index } })
              }
            >
              <Text style={styles.redacaoText}>Redação {index + 1}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <Text style={styles.footerText}>
        Total de redações salvas: {redacoes.length}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#e4e4e4",
    alignItems: "center",
  },
  ConteinerDescricao: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#c2c2c2",
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#fffff",
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#6c63ff",
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  emptyText: {
    color: "#888",
    fontSize: 14,
  },
  redacaoItem: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    marginVertical: 5,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
  redacaoText: {
    fontSize: 16,
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: "#555",
  },
})
