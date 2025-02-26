import { Tabs } from "expo-router"
import { FontAwesome } from "@expo/vector-icons"

export default function Layout() {
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
