import React, { useEffect } from "react"
import { Redirect } from "expo-router"
import { app } from "../../firebaseConfig"

export default function HomeScreen() {
  const autentificado = true

  useEffect(() => {
    console.log("Firebase inicializado:", app)
  }, [])

  return <Redirect href="/login" />
}
