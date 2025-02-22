import { useLocalSearchParams, useRouter } from "expo-router"
import { View, StyleSheet, TouchableOpacity, Text } from "react-native"
import { Image } from "expo-image"

export default function ImagePreviewScreen() {
  const { photoUri } = useLocalSearchParams()
  const router = useRouter()

  const decodedUri = decodeURIComponent(photoUri) // <-- ESSENCIAL

  console.log("photoUri recebido:", photoUri)
  console.log("photoUri decodificado:", decodedUri)

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: decodedUri }}
        style={styles.image}
        contentFit="contain"
      />

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
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
  backButton: {
    position: "absolute",
    bottom: 40,
    backgroundColor: "#a46cac",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
})
