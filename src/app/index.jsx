import React from "react"
import { Redirect } from "expo-router"

export default function HomeScreen() {
  const autentificado = true

  return <Redirect href="/login" />
}
