import React from "react"
import { Slot } from "expo-router"
import { useFonts, Caveat_400Regular } from "@expo-google-fonts/caveat"
import { View, ActivityIndicator } from "react-native"

export default function App() {
  const [fontsLoaded] = useFonts({
    Caveat_400Regular,
  })

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  // Slot carrega as rotas de /src/app/*
  return <Slot />
}
