import React, { useState, useRef } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native"
import { CameraView, useCameraPermissions } from "expo-camera"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useRouter } from "expo-router"

export default function Submission() {
  const [cameraVisible, setCameraVisible] = useState(false)
  const [facing, setFacing] = useState("back")
  const cameraRef = useRef(null)
  const router = useRouter()

  const [permission, requestPermission] = useCameraPermissions()

  const handleRequestPermission = async () => {
    const newPermission = await requestPermission()
    if (newPermission.granted) {
      console.log("Permissão concedida!")
    } else {
      console.log("Permissão negada!")
    }
  }

  const handleTakePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync()
      await savePhoto(photo.uri)
      setCameraVisible(false)

      // Redirecionar para a tela de visualização da foto
      router.push({
        pathname: "/image-preview",
        params: { photoUri: photo.uri },
      })
    }
  }

  const savePhoto = async (uri) => {
    try {
      const storedPhotos = await AsyncStorage.getItem("@photos")
      const photosArray = storedPhotos ? JSON.parse(storedPhotos) : []
      photosArray.push(uri)
      await AsyncStorage.setItem("@photos", JSON.stringify(photosArray))
    } catch (error) {
      console.error("Erro ao salvar foto:", error)
    }
  }

  if (!permission) {
    return <View />
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Precisamos da permissão para acessar a câmera
        </Text>
        <TouchableOpacity
          style={styles.cameraButton}
          onPress={handleRequestPermission}
        >
          <Text style={styles.cameraButtonText}>Conceder Permissão</Text>
        </TouchableOpacity>
      </View>
    )
  }

  if (cameraVisible) {
    return (
      <CameraView style={{ flex: 1 }} facing={facing} ref={cameraRef}>
        <View style={styles.cameraButtonContainer}>
          <TouchableOpacity
            style={styles.cameraButton}
            onPress={handleTakePicture}
          >
            <Text style={styles.cameraButtonText}>Tirar Foto</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cameraButton}
            onPress={() => setCameraVisible(false)}
          >
            <Text style={styles.cameraButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cameraButton}
            onPress={() => setFacing(facing === "back" ? "front" : "back")}
          >
            <Text style={styles.cameraButtonText}>Trocar Câmera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Submissão da Redação</Text>
      </View>

      <View style={styles.conteinarSection}>
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() =>
            router.push({
              pathname: "/write-essay",
            })
          }
        >
          <Image
            source={require("@assets/teclado.png")}
            style={{ width: 160, height: 60 }}
          />
          <Text style={styles.subText}>Digite sua Redação</Text>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.conteinarSection}>
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => setCameraVisible(true)}
        >
          <Image
            source={require("@assets/camera.png")}
            style={{ width: 90, height: 70 }}
          />
          <Text style={styles.subText}>Fotografe sua Redação</Text>
        </TouchableOpacity>
      </View> */}

      {/* <View style={styles.conteinarSection}>
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
      </View> */}
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
  cameraButtonContainer: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  cameraButton: {
    backgroundColor: "#a46cac",
    padding: 10,
    borderRadius: 5,
  },
  cameraButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  message: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 10,
  },
})
