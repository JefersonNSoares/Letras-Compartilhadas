import React from "react"
import { Redirect } from "expo-router"

export default function App() {
  const autentificado = true

  return <Redirect href="/home" />
}
