import { Tabs } from "expo-router"
import { FontAwesome } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native"
import { Feather } from "@expo/vector-icons"
import { signOut } from "firebase/auth"
import { auth } from "../../../../firebaseConfig"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useRouter } from "expo-router"

export default function Layout() {
  const router = useRouter()

  const handleLogout = async () => {
    console.log("Logout")
    try {
      await signOut(auth)
      await AsyncStorage.removeItem("user")
      router.replace("/login") // redireciona para login
    } catch (error) {
      console.error("Erro ao sair:", error)
    }
  }

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: "#a46cac",
        },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
      }}
    >
      <Tabs.Screen
        name="homeScreen"
        options={{
          title: "Pagina Inicial",
          tabBarIcon: ({ size, focused }) => (
            <FontAwesome
              name="home"
              color={focused ? "#a46cac" : "#c2c2c2"}
              size={size}
            />
          ),
          tabBarLabelStyle: {
            color: "#a46cac",
            fontSize: 14,
          },
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={async () => {
                  handleLogout()
                }}
                style={{ marginRight: 16 }}
              >
                <Feather name="log-out" size={22} color="#fff" />
              </TouchableOpacity>
            )
          },
        }}
      />

      <Tabs.Screen
        name="redacoes"
        options={{
          title: "Redações",
          tabBarIcon: ({ size, focused }) => (
            <FontAwesome
              name="file-text"
              color={focused ? "#a46cac" : "#c2c2c2"}
              size={size}
            />
          ),
          tabBarLabelStyle: {
            color: "#a46cac",
            fontSize: 14,
          },
        }}
      />

      <Tabs.Screen
        name="submission"
        options={{
          title: "Submissão",
          tabBarIcon: ({ size, focused }) => (
            <FontAwesome
              name="share"
              color={focused ? "#a46cac" : "#c2c2c2"}
              size={size}
            />
          ),
          tabBarLabelStyle: {
            color: "#a46cac",
            fontSize: 14,
          },
        }}
      />
    </Tabs>
  )
}
