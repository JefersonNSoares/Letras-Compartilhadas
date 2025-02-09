import { StatusBar } from "expo-status-bar"
import React from "react"
import { StyleSheet, Text, View } from "react-native"
import Login from "./src/pages/Login"
import ResetPassword from "./src/pages/ResetPassword"

export default function App() {
  return <ResetPassword />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
