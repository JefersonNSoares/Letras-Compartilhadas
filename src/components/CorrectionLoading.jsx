import React from "react"
import { View, Text, ActivityIndicator, StyleSheet } from "react-native"
import LottieView from "lottie-react-native"

export default function CorrectionLoading() {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../assets/animations/hamster.json")}
        autoPlay
        loop
        style={styles.animation}
      />

      <Text style={styles.title}>Corrigindo sua redação...</Text>

      <ActivityIndicator
        size="large"
        color="#0000ff"
        style={styles.indicator}
      />

      <Text style={styles.message}>
        Aguarde enquanto processamos sua redação. Por favor, não saia desta tela
        para não perder seu progresso.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  animation: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  indicator: {
    marginVertical: 8,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
    marginTop: 8,
  },
})
