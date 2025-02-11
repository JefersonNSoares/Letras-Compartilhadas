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
        name="login/index"
        options={{ title: "login", headerShown: false }}
      />
      <Stack.Screen name="resetPassword/index" options={{ title: "" }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  )
}
