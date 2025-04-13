import { useState } from "react"
import { useLocalSearchParams, useRouter } from "expo-router"
import { Image } from "expo-image"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from "react-native"
import * as FileSystem from "expo-file-system"
import { extractTextFromImage } from "../services/visionService"

export default function ImagePreviewScreen() {
  const { photoUri } = useLocalSearchParams()
  const router = useRouter()

  const decodedUri = decodeURIComponent(photoUri) // <-- ESSENCIAL

  const [loading, setLoading] = useState(false)

  console.log("photoUri recebido:", photoUri)
  console.log("photoUri decodificado:", decodedUri)

  const handleTranscribe = async () => {
    try {
      setLoading(true)

      // Move a imagem para armazenamento seguro
      const newPath = `${FileSystem.documentDirectory}redacao-${Date.now()}.jpg`
      await FileSystem.copyAsync({ from: decodedUri, to: newPath })

      // Extrai o texto usando a Vision API
      const textoExtraido = await extractTextFromImage(newPath)

      // Navega para write-essay com o texto extraído
      router.push({
        pathname: "/write-essay",
        params: { texto: encodeURIComponent(textoExtraido) },
      })
    } catch (error) {
      console.error("Erro ao transcrever imagem:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <View>
          <Text style={{ color: "white" }}>
            Aguarde enquanto transcrevemos imagem...
          </Text>
          <ActivityIndicator size="large" color="#a46cac" />
        </View>
      ) : (
        <>
          <Image
            source={{ uri: decodedUri }}
            style={styles.image}
            contentFit="contain"
          />

          <View style={styles.wrapper}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.back()}
            >
              <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleTranscribe}>
              <Text style={styles.buttonText}>Transcrever Redação</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "80%",
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  transcribeButton: {
    position: "absolute",
    bottom: 40,
    right: 20,
    backgroundColor: "#BC80FA",
    padding: 10,
    borderRadius: 5,
  },
  wrapper: {
    position: "absolute",
    bottom: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16, // ou use marginHorizontal se seu React Native ainda não suportar gap
    paddingHorizontal: 20,
    width: "100%",
  },
  button: {
    flex: 1,
    backgroundColor: "#a46cac",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
})
