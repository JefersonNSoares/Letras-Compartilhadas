import { Link } from "expo-router"
import React from "react"
import { StyleSheet, Text } from "react-native"

export default function App() {
  return (
    <>
      <Text>Olá, mundo!</Text>
      <Link href={"/pages/login"}>Login</Link>
      <Link href={"/pages/resetPassword"}>resetPassword</Link>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
