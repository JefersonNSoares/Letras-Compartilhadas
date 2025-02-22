import React, { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native"
import { useLocalSearchParams } from "expo-router"
import { MaterialIcons } from "@expo/vector-icons"

// Função para definir a cor e o ícone com base na nota
const getNotaInfo = (nota) => {
  if (nota < 400) return { color: "#ff4d4d", icon: "error" } // Vermelho - Erro
  if (nota >= 400 && nota < 700) return { color: "#ffcc00", icon: "warning" } // Amarelo - Aviso
  if (nota >= 700 && nota < 900)
    return { color: "#66cc66", icon: "check-circle" } // Verde - Correto
  return { color: "#d4af37", icon: "emoji-events" } // Dourado - Troféu
}

const EstatisticasRedacao = () => {
  const { id } = useLocalSearchParams()
  const [expanded, setExpanded] = useState([])

  const redacao = "Esta é a redação exemplo..." // Texto fixo para exemplo
  const competencias = [
    {
      titulo: "Competência 1",
      nota: 850,
      descricao: "Muito bom, mas pode melhorar...",
    },
    {
      titulo: "Competência 2",
      nota: 600,
      descricao: "Médio, trabalhe mais em coesão...",
    },
    {
      titulo: "Competência 3",
      nota: 920,
      descricao: "Excelente desenvolvimento...",
    },
    {
      titulo: "Competência 4",
      nota: 500,
      descricao: "Razoável, precisa melhorar...",
    },
    {
      titulo: "Competência 5",
      nota: 300,
      descricao: "Fraco, precisa revisar estrutura...",
    },
  ]

  // Alternar a visibilidade de um accordion específico
  const toggleAccordion = (index) => {
    setExpanded((prevExpanded) => {
      if (prevExpanded.includes(index)) {
        return prevExpanded.filter((i) => i !== index)
      } else {
        return [...prevExpanded, index]
      }
    })
  }

  // Componente Accordion manual
  const Accordion = ({ title, content, isOpen, onPress, bgColor, icon }) => (
    <View style={[styles.accordionContainer, { borderColor: bgColor }]}>
      <TouchableOpacity
        style={[styles.accordionHeader, { backgroundColor: bgColor }]}
        onPress={onPress}
      >
        <MaterialIcons name={icon} size={20} color="#fff" style={styles.icon} />
        <Text style={styles.accordionTitle}>{title}</Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.accordionContent}>
          <Text>{content}</Text>
        </View>
      )}
    </View>
  )

  return (
    <ScrollView style={styles.container}>
      {/* Redação Completa */}
      <Accordion
        title="Redação"
        content={redacao}
        isOpen={expanded.includes(0)}
        onPress={() => toggleAccordion(0)}
        bgColor="#ccc"
        icon="description"
      />

      {/* Competências */}
      {competencias.map((comp, index) => {
        const { color, icon } = getNotaInfo(comp.nota)
        return (
          <Accordion
            key={index}
            title={`${comp.titulo}: ${comp.nota}`}
            content={comp.descricao}
            isOpen={expanded.includes(index + 1)}
            onPress={() => toggleAccordion(index + 1)}
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
    color: "#fff",
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
