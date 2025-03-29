// components/ModalAviso.jsx
import React from "react"
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native"

export default function ModalAviso({ visible, onClose }) {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <ImageBackground
            source={require("@assets/pergaminho.png")} // imagem de pergaminho no estilo antigo
            resizeMode="stretch"
            style={styles.imageBackground}
          >
            <Text style={styles.title}>Atenção</Text>
            <Text style={styles.message}>
              Para criar uma conta, entre em contato com os alunos responsáveis
              pelo projeto.
            </Text>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Entendi</Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    aspectRatio: 3 / 4,
    backgroundColor: "transparent",
    borderRadius: 20,
    overflow: "hidden",
  },
  imageBackground: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#5a381e",
    marginTop: 60,
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    color: "#3e2a1b",
    fontStyle: "italic",
    marginTop: -20,
  },
  button: {
    backgroundColor: "#6a4c93",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 70,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
})
