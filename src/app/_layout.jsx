import { Stack } from "expo-router"

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#a46cac",
        },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="login"
        options={{ title: "login", headerShown: false }}
      />
      <Stack.Screen name="resetPassword" options={{ title: "" }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="write-essay" options={{ headerShown: false }} />
      <Stack.Screen
        name="statistics-writing"
        options={{ title: "Correção da Redação", headerShown: true }}
      />
      <Stack.Screen name="edit-writing" options={{ title: "Editar Redação" }} />
    </Stack>
  )
}
