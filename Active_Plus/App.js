import { Text, SafeAreaView, StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./Screens/Home.jsx";
import Calculadora from "./Screens/Calculadora.jsx";
import Treino from "./Screens/Treino.jsx";
import Usuario from "./Screens/Usuario.jsx";
import Autenticacao from "./Screens/Authentication.jsx"

//criando a pilha de telas
let Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Autenticacao">
        <Stack.Screen
          name="Autenticacao"
          component={Autenticacao}
          options={{
            title: "Senha",
            headerStyle: {
              backgroundColor: "#001F3F",
            },
            headerTintColor: "#F5F5F5",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitleAlign: "center",
          }}
        />

        <Stack.Screen
          name="HomePage"
          component={Home}
          options={{
            title: "Active Plus",
            headerStyle: {
              backgroundColor: "#001F3F",
            },
            headerTintColor: "#F5F5F5",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="CalculadoraPage"
          component={Calculadora}
          options={{
            title: "Calculadora de Calorias",
            headerStyle: {
              backgroundColor: "#001F3F",
            },
            headerTintColor: "#F5F5F5",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="TreinoPage"
          component={Treino}
          options={{
            title: "Registrar Atividade",
            headerStyle: {
              backgroundColor: "#001F3F",
            },
            headerTintColor: "#F5F5F5",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="UsuarioPage"
          component={Usuario}
          options={{
            title: "Perfil",
            headerStyle: {
              backgroundColor: "#001F3F",
            },
            headerTintColor: "#F5F5F5",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
});
