import React from "react"
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native"

export default function Submission() {
  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Submissão da Redação</Text>
      </View>

      <View style={styles.conteinarSection}>
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => console.log("Digite sua redação")}
        >
          <Image
            source={require("@assets/teclado.png")}
            style={{ width: 160, height: 60 }}
          />
          <Text style={styles.subText}>Digite sua Redação</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.conteinarSection}>
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => console.log("Fotografe sua redação")}
        >
          <Image
            source={require("@assets/camera.png")}
            style={{ width: 90, height: 70 }}
          />
          <Text style={styles.subText}>Fotagrafe sua Redação</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.conteinarSection}>
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => console.log("Pdf da sua redação")}
        >
          <Image
            source={require("@assets/pdf.png")}
            style={{ width: 60, height: 80 }}
          />
          <Text style={styles.subText}>PDF da sua Redação</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e4e4e4",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 30,
  },
  containerTitle: {
    width: "100%",
    height: 100,
    backgroundColor: "#a46cac",
    alignItems: "center",
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
  },
  conteinarSection: {
    marginTop: 20,
    width: 300,
    height: 150,
    backgroundColor: "#c2c2c2",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  subText: {
    fontSize: 20,
    fontWeight: "bold",
  },
})
