import { Link, useRouter } from "expo-router"
import React, { useState, useEffect } from "react"
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { auth } from "../../firebaseConfig"

export default function Login() {
  const [textEmail, setTextEmail] = useState("")
  const [textSenha, setTextSenha] = useState("")
  const [loading, setLoading] = useState(true) // Estado para verificar carregamento
  const router = useRouter()

  // Verifica se o usuário já está logado ao abrir a tela
  useEffect(() => {
    const checkUserSession = async () => {
      const user = await AsyncStorage.getItem("user")
      if (user) {
        router.push("/home") // Se o usuário já está salvo, vai direto para a home
      }
      setLoading(false) // Para de carregar
    }

    checkUserSession()
  }, [])

  const handleLogin = async () => {
    if (!textEmail || !textSenha) {
      Alert.alert("Erro", "Preencha todos os campos!")
      return
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        textEmail,
        textSenha
      )
      const user = userCredential.user

      // Salva os dados do usuário localmente
      await AsyncStorage.setItem("user", JSON.stringify(user))

      Alert.alert("Sucesso", "Login realizado!")
      router.push("/home") // Redireciona para a home após login bem-sucedido
    } catch (error) {
      Alert.alert("Erro ao entrar", error.message)
    }
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#a46cac" />
      </View>
    )
  }

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
          secureTextEntry
        />

        <View style={styles.viewEsqueciSenha}>
          <Link href={"/resetPassword"}>
            <Text style={styles.buttonTextEsqueciSenha}>Esqueceu a senha?</Text>
          </Link>
        </View>

        <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.viewCriarConta}>
          <Text style={styles.textNaoConta}>Não tem uma conta?</Text>
          <TouchableOpacity onPress={() => router.push("/register")}>
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
