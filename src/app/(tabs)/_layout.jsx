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
        headerShown: false,
      }}
    >
      <Stack.Screen name="home/index" options={{ title: "Home" }} />
      <Stack.Screen name="home/submission" options={{ title: "Home" }} />
    </Stack>
  )
}
