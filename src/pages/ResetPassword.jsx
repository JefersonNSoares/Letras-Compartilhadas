import React, { useState } from "react"
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native"

export default function ResetPassword() {
  const [textEmail, setTextEmail] = useState("")

  return (
    <View style={styles.container}>
      <View style={styles.viewHeader}>
        <Text style={styles.textTitle}>Esqueceu a Senha</Text>
      </View>

      <Image
        source={require("../assets/icon-cadeado.png")}
        style={{ width: 100, height: 100, marginTop: "10%" }}
      />

      <Text style={styles.textSubTitle}>Com problemas para logar?</Text>
      <Text style={styles.textDescription}>
        Escreva seu e-mail e nós lhe enviaremos um link para restaurar sua
        senha.
      </Text>

      <TextInput
        style={styles.inputEmail}
        onChangeText={setTextEmail}
        value={textEmail}
        placeholder="Digite o email"
        keyboardType="email-address"
      />

      <TouchableOpacity
        style={styles.buttonResetSenha}
        onPress={() => console.log("Recuperar senha")}
      >
        <Text style={styles.buttonText}>Restaurar senha</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ececec",
    alignItems: "center",
  },
  viewHeader: {
    width: "100%",
    height: "20%",
    backgroundColor: "#a46cac",
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
  },
  textTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginTop: "10%",
  },
  inputEmail: {
    height: 40,
    width: 300,
    margin: 12,
    borderColor: "gray",
    borderWidth: 3,
    padding: 10,
    backgroundColor: "#e4e4e4",
    borderRadius: 10,
  },
  buttonResetSenha: {
    width: 300,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#a46cac",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
  },
  textSubTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textDescription: {
    marginHorizontal: 30,
    fontSize: 15,
  },
})
