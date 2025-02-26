import React, { useState, useEffect } from "react"
import { View, TextInput, Button, Alert, StyleSheet, Text } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useLocalSearchParams, useRouter } from "expo-router"

export default function EditRedacaoScreen() {
  const [redacao, setRedacao] = useState("")
  const [redacoesArray, setRedacoesArray] = useState([])
  const { id } = useLocalSearchParams() // id recebido como parâmetro
  const router = useRouter()

  useEffect(() => {
    carregarRedacao()
  }, [id])

  const carregarRedacao = async () => {
    try {
      const listaSalva = await AsyncStorage.getItem("redacoes")
      if (listaSalva) {
        const redacoes = JSON.parse(listaSalva)
        setRedacoesArray(redacoes)
        // Busca a redação cujo id corresponda ao parâmetro recebido
        const redacaoEncontrada = redacoes.find(
          (r) => r.id.toString() === id.toString()
        )
        if (redacaoEncontrada) {
          setRedacao(redacaoEncontrada.texto)
        } else {
          Alert.alert("Erro", "Redação não encontrada.")
        }
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar a redação.")
    }
  }

  const salvarAlteracoes = async () => {
    if (redacao.trim() === "") {
      Alert.alert("Aviso", "A redação não pode estar vazia.")
      return
    }
    try {
      // Atualiza a redação que tiver o mesmo id
      const novaRedacoes = redacoesArray.map((r) =>
        r.id.toString() === id.toString() ? { ...r, texto: redacao } : r
      )
      await AsyncStorage.setItem("redacoes", JSON.stringify(novaRedacoes))
      Alert.alert("Sucesso", "Redação atualizada com sucesso!")
      router.back()
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar as alterações.")
    }
  }

  const contarPalavras = (texto) => {
    return texto.trim().length > 0 ? texto.trim().split(/\s+/).length : 0
  }

  const contarLetras = (texto) => {
    return texto.replace(/\s+/g, "").length
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Edite sua redação aqui..."
        multiline
        value={redacao}
        onChangeText={setRedacao}
        keyboardType="default"
        autoCapitalize="none"
        textContentType="none"
        importantForAutofill="no"
      />
      <Button title="Salvar Alterações" onPress={salvarAlteracoes} />
      <Text style={styles.contador}>
        Palavras: {contarPalavras(redacao)} | Letras: {contarLetras(redacao)}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5dc",
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: "80%",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    textAlignVertical: "top",
    backgroundColor: "#fff",
    lineHeight: 24,
    fontFamily: "serif",
    borderLeftWidth: 10,
    borderLeftColor: "#a46cac",
  },
  contador: {
    marginTop: 10,
    fontSize: 16,
  },
})
