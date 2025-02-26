import React, { useState, useEffect } from "react"
import { View, TextInput, Button, Alert, StyleSheet, Text } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function RedacaoScreen() {
  const [redacao, setRedacao] = useState("")

  const salvarRedacao = async () => {
    if (redacao.trim() === "") {
      Alert.alert("Aviso", "A redação não pode estar vazia.")
      setRedacao("") // Limpa o campo de texto após salvar
      return
    }

    try {
      const listaSalva = await AsyncStorage.getItem("redacoes")
      const redacoesArray = listaSalva ? JSON.parse(listaSalva) : []

      let generateUniqueId =
        Date.now().toString() + "-" + Math.random().toString(36).slice(2, 9)

      const novaRedacao = { id: generateUniqueId, texto: redacao }
      redacoesArray.push(novaRedacao)

      await AsyncStorage.setItem("redacoes", JSON.stringify(redacoesArray))

      Alert.alert("Sucesso", "Redação salva com sucesso!")
      setRedacao("") // Limpa o campo de texto após salvar
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar a redação.")
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
        placeholder="Digite sua redação aqui..."
        multiline
        value={redacao}
        onChangeText={setRedacao}
        keyboardType="default" // Permite caracteres especiais
        autoCapitalize="none"
        textContentType="none"
        importantForAutofill="no"
      />
      <Button title="Salvar Redação" onPress={salvarRedacao} />
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
    backgroundColor: "#f5f5dc", // Fundo estilo folha de redação
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
    fontFamily: "serif", // Fonte mais tradicional
    borderLeftWidth: 10,
    borderLeftColor: "#a46cac", // Margem estilo caderno
  },
})
