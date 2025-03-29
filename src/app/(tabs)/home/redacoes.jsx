import React, { useState, useEffect, useCallback } from "react"
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native"
import { Feather } from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useRouter } from "expo-router"
import { useFocusEffect } from "@react-navigation/native" // Importa o hook
import { generateEvaluation } from "../../../services/OpenAIService"
import CorrectionLoading from "components/CorrectionLoading"

export default function Home() {
  const [redacoes, setRedacoes] = useState([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Função que carrega as redações do AsyncStorage
  const carregarRedacoes = async () => {
    try {
      const listaSalva = await AsyncStorage.getItem("redacoes")
      // console.log("Redações salvas:", listaSalva)
      if (listaSalva) {
        // Se necessário, inverta a ordem ou adapte conforme seu fluxo
        const redacoesArray = JSON.parse(listaSalva).reverse()
        setRedacoes(redacoesArray)
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as redações.")
    }
  }

  // Executa carregarRedacoes toda vez que a tela for focada
  useFocusEffect(
    useCallback(() => {
      carregarRedacoes()
    }, [])
  )

  const salvarRedacoes = async (novaLista) => {
    try {
      // Salva a lista atualizada no AsyncStorage
      await AsyncStorage.setItem("redacoes", JSON.stringify(novaLista))
      carregarRedacoes()
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar as redações.")
    }
  }

  const excluirRedacao = async (id) => {
    Alert.alert(
      "Confirmação",
      "Deseja realmente excluir essa redação?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          onPress: async () => {
            try {
              const listaSalva = await AsyncStorage.getItem("redacoes")
              if (listaSalva) {
                let redacoesArray = JSON.parse(listaSalva)
                // Remove o item com o id correspondente
                redacoesArray = redacoesArray.filter(
                  (item) => item.id.toString() !== id.toString()
                )
                await AsyncStorage.setItem(
                  "redacoes",
                  JSON.stringify(redacoesArray)
                )
                Alert.alert("Sucesso", "Redação excluída com sucesso!")
                carregarRedacoes()
              }
            } catch (error) {
              Alert.alert("Erro", "Não foi possível excluir a redação.")
            }
          },
        },
      ],
      { cancelable: true }
    )
  }

  const editarRedacao = (id) => {
    // Navega para a tela de edição passando o id da redação
    router.push({ pathname: "/edit-writing", params: { id } })
  }

  const verCorrecao = (id) => {
    // Navega para a tela de visualização da correção
    router.push({ pathname: "/statistics-writing", params: { id } })
  }

  // Função atualizada para enviar a redação para correção
  const handleCorreccao = async (index) => {
    const redacoesCorrigidas = redacoes.filter((r) => r.correction)
    if (redacoesCorrigidas.length >= 5) {
      Alert.alert(
        "Limite atingido",
        "Você só pode enviar até 5 redações para correção."
      )
      return
    }

    setLoading(true)
    try {
      const redacaoDoAluno = redacoes[index].texto
      // Chama o serviço que gera a avaliação
      const competencias = await generateEvaluation(redacaoDoAluno)
      console.log("Avaliação:", competencias)
      // Atualiza o objeto da redação com a correção
      const novaLista = [...redacoes]
      novaLista[index] = { ...novaLista[index], correction: competencias }
      await salvarRedacoes(novaLista)
      Alert.alert("Sucesso", "Redação corrigida e atualizada!")
    } catch (error) {
      console.error("Erro ao gerar avaliação:", error)
      Alert.alert("Erro", "Não foi possível gerar a avaliação.")
    } finally {
      setLoading(false)
    }
  }

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>
        Redação:{" "}
        {item.texto.length > 100
          ? item.texto.slice(0, 100) + "..."
          : item.texto}
      </Text>
      {item.correction ? (
        // Se já existe correção, mostra o botão para visualizar
        <TouchableOpacity
          style={styles.button}
          onPress={() => verCorrecao(item.id)}
        >
          <Feather name="check-circle" size={16} color="#fff" />
          <Text style={styles.buttonText}>Acessar Correção</Text>
        </TouchableOpacity>
      ) : (
        // Se não, mostra os botões para editar e enviar para correção
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => editarRedacao(item.id)}
          >
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => excluirRedacao(item.id)}
          >
            <Text style={styles.buttonText}>Excluir</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleCorreccao(index)}
          >
            <Text style={styles.buttonText}>Enviar para correção</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )

  return (
    <View style={styles.container}>
      {loading ? (
        <CorrectionLoading />
      ) : (
        <View style={styles.listContainer}>
          {redacoes.length === 0 ? (
            <Text style={styles.emptyText}>Nenhuma redação salva</Text>
          ) : (
            <FlatList
              data={redacoes}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
            />
          )}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#e4e4e4",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  listContainer: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    backgroundColor: "#fff8ec",
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderColor: "#f0e1d2",
    borderWidth: 5,
  },
  itemText: {
    fontSize: 18,
    fontFamily: "Caveat_400Regular", // estilo manuscrito
    color: "#333",
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "#888",
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
    gap: 8,
  },
  button: {
    backgroundColor: "#6a4c93", // roxo moderno
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginTop: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
})
