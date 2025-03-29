// statistics-writing.js
import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native"
import { useLocalSearchParams } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { MaterialIcons } from "@expo/vector-icons"
import ajustarNotaCompetencia from "services/ajustarNotaCompetencia"
import ajustarNotaGeral from "services/ajustarNotasGeral"

// Função para definir a cor e o ícone com base na nota
const getNotaInfo = (nota) => {
  if (nota < 400) return { color: "#ff4d4d", icon: "error" }
  if (nota >= 400 && nota < 700) return { color: "#ffcc00", icon: "warning" }
  if (nota >= 700 && nota < 900)
    return { color: "#66cc66", icon: "check-circle" }
  return { color: "#d4af37", icon: "emoji-events" }
}

const getNotaInfoCompetencias = (nota) => {
  if (nota < 75) return { color: "#ff4d4d", icon: "error" }
  if (nota >= 76 && nota < 150) return { color: "#ffcc00", icon: "warning" }
  if (nota >= 150 && nota < 190)
    return { color: "#66cc66", icon: "check-circle" }
  return { color: "#d4af37", icon: "emoji-events" }
}

const EstatisticasRedacao = () => {
  // Recebendo o id passado na navegação
  const { id } = useLocalSearchParams()
  const [redacao, setRedacao] = useState("")
  const [competencias, setCompetencias] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expanded, setExpanded] = useState([])

  useEffect(() => {
    const loadRedacao = async () => {
      try {
        const redacoesData = await AsyncStorage.getItem("redacoes")
        if (redacoesData) {
          const redacoes = JSON.parse(redacoesData)
          // Busca a redação cujo id corresponde ao parâmetro recebido
          const currentRedacao = redacoes.find(
            (item) => item.id.toString() === id.toString()
          )
          if (!currentRedacao) {
            setError("Redação não encontrada.")
            setLoading(false)
            return
          }
          setRedacao(currentRedacao.texto)
          setCompetencias(currentRedacao.correction)
        }
        setLoading(false)
      } catch (err) {
        setError("Erro ao carregar a redação.")
        setLoading(false)
      }
    }

    loadRedacao()
  }, [id])

  const toggleAccordion = (accordionIndex) => {
    setExpanded((prev) => {
      if (prev.includes(accordionIndex)) {
        return prev.filter((item) => item !== accordionIndex)
      } else {
        return [...prev, accordionIndex]
      }
    })
  }

  // Componente Accordion para exibição das seções
  const Accordion = ({ title, content, isOpen, onPress, bgColor, icon }) => (
    <View style={[styles.accordionContainer, { borderColor: bgColor }]}>
      <TouchableOpacity
        style={[styles.accordionHeader, { backgroundColor: bgColor }]}
        onPress={onPress}
      >
        <MaterialIcons name={icon} size={20} color="#111" style={styles.icon} />
        <Text style={styles.accordionTitle}>{title}</Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.accordionContent}>
          <Text>{content}</Text>
        </View>
      )}
    </View>
  )

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>{error}</Text>
      </View>
    )
  }

  if (!competencias) {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.noCorrectionText}>
          Nenhuma correção encontrada para essa redação.
        </Text>
      </ScrollView>
    )
  }

  return (
    <ScrollView style={styles.container}>
      {/* Accordion para a redação completa */}
      <Accordion
        title="Redação"
        content={redacao}
        isOpen={expanded.includes(0)}
        onPress={() => toggleAccordion(0)}
        bgColor="#ccc"
        icon="description"
      />
      {/* Accordion para cada competência */}
      {competencias.map((comp, i) => {
        const { color, icon } =
          comp.titulo === "Melhoria Geral"
            ? getNotaInfo(ajustarNotaGeral(comp.nota))
            : getNotaInfoCompetencias(ajustarNotaCompetencia(comp.nota))
        return (
          <Accordion
            key={i}
            title={
              comp.titulo === "Melhoria Geral"
                ? `${comp.titulo}: ${ajustarNotaGeral(comp.nota)}`
                : `${comp.titulo}: ${ajustarNotaCompetencia(comp.nota)}`
            }
            content={
              comp.titulo === "Melhoria Geral"
                ? `Descrição: ${comp.descricao}`
                : `Descrição: ${comp.descricao}\nSugestão de melhoria: ${comp.sugestao_de_melhoria}`
            }
            isOpen={expanded.includes(i + 1)}
            onPress={() => toggleAccordion(i + 1)}
            bgColor={color}
            icon={icon}
          />
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noCorrectionText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "#888",
  },
  accordionContainer: {
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 5,
  },
  accordionHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111",
    marginLeft: 10,
  },
  accordionContent: {
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  icon: {
    marginRight: 5,
  },
})

export default EstatisticasRedacao
