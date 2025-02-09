import React, { useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native"

export default function Login() {
  const [textEmail, setTextEmail] = useState("")
  const [textSenha, setTextSenha] = useState("")

  return (
    <View style={styles.container}>
      <Image
        source={require("@assets/icone-books.png")}
        style={{ width: 200, height: 200 }}
      />
      <Text style={styles.textTitle}>LETRAS</Text>
      <Text style={styles.textSubtitle}>COMPARTILHADAS</Text>

      <View style={styles.containerWrapper}>
        <TextInput
          style={styles.inputEmail}
          onChangeText={setTextEmail}
          value={textEmail}
          placeholder="Digite o email"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.inputEmail}
          onChangeText={setTextSenha}
          value={textSenha}
          placeholder="Digite a senha"
          secureTextEntry={true} // Oculta o texto digitado (transforma em pontos ou asteriscos)
          keyboardType="default" // Usa o teclado padrão (não email ou numérico)
          autoCapitalize="none" // Não deixa a primeira letra maiúscula
          autoCorrect={false} // Evita autocorreção, útil para senhas
        />

        <View style={styles.viewEsqueciSenha}>
          <TouchableOpacity onPress={() => console.log("Esqueceu a senha?")}>
            <Text style={styles.buttonTextEsqueciSenha}>Esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.buttonLogin}
          onPress={() => console.log("Entrou")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.viewCriarConta}>
          <Text style={styles.textNaoConta}>Não tem uma conta ?</Text>
          <TouchableOpacity onPress={() => console.log("Cadastrar")}>
            <Text style={styles.buttonTextEsqueciSenha}>Criar uma conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ececec",
    alignItems: "center",
    justifyContent: "center",
  },
  textTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#a46cac",
  },
  textSubtitle: {
    fontSize: 20,
    color: "#a46cac",
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
  buttonLogin: {
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
  buttonTextEsqueciSenha: {
    color: "#3a06f7",
    textAlign: "center",
    fontSize: 15,
  },
  viewCriarConta: {
    flexDirection: "row",
    marginTop: 20,
  },
  textNaoConta: {
    fontSize: 15,
    marginEnd: 5,
  },
  viewEsqueciSenha: {
    justifyContent: "flex-end",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 150,
  },
  containerWrapper: {
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 20,
    borderRadius: 30,
    marginTop: 20,
  },
})
