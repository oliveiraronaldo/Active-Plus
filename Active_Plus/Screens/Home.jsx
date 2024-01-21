import { View, Text, StyleSheet, Dimensions, ScrollView, Switch } from "react-native";
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonIcon from "../Components/ButonIcon.jsx";


const screenWidth = Dimensions.get("window").width;

export default function Home({ navigation }) {

  const [switchValue, setSwitchValue] = useState(false);

  const [modoStyle, setModoStyle] = useState(lightStyles);


  useEffect(() => {
    // Carrega o estado do modo escuro salvo no AsyncStorage ao iniciar o componente
    loadDarkModeState();
  }, []);

  const loadDarkModeState = async () => {
    try {
      const darkModeState = await AsyncStorage.getItem('darkMode');
      if (darkModeState !== null) {
        setSwitchValue(JSON.parse(darkModeState));
        if (JSON.parse(darkModeState)) {
          setModoStyle(darkStyles)
        } else {
          setModoStyle(lightStyles)
        }
      }
    } catch (e) {
      console.error('Erro ao carregar o estado do modo escuro:', e);
    }
  };

  const saveDarkModeState = async (value) => {
    try {
      await AsyncStorage.setItem('darkMode', JSON.stringify(value));
    } catch (e) {
      console.error('Erro ao salvar o estado do modo escuro:', e);
    }
  };

  const toggleSwitch = () => {
    const newValue = !switchValue;
    setSwitchValue(newValue);
    saveDarkModeState(newValue);
    setModoStyle(!switchValue ? darkStyles : lightStyles);
  };


  return (
    <View style={modoStyle.pagina}>
      <ScrollView contentContainerStyle={modoStyle.containerScroll}>
        <View style={modoStyle.container}>
          <View>
            <View style={modoStyle.content}>
              <Text style={modoStyle.text}>Perfil</Text>

              <View style={modoStyle.info}>
                <ButtonIcon navigation={navigation} name={"user"} page={"UsuarioPage"} modoStyle={switchValue} />
              </View>
            </View>

            <View style={modoStyle.content}>
              <Text style={modoStyle.text}>Registrar Atividade</Text>

              <View style={modoStyle.info}>
                <ButtonIcon navigation={navigation} name={"dumbbell"} page={"TreinoPage"} modoStyle={switchValue} />
              </View>
            </View>

            <View style={modoStyle.content}>
              <Text style={modoStyle.text}>Calculadora de Calorias</Text>

              <View style={modoStyle.info}>
                <ButtonIcon navigation={navigation} name={"calculator"} page={"CalculadoraPage"} modoStyle={switchValue} />
              </View>
            </View>
          </View>

          <Text style={modoStyle.textConfig}>Configurações</Text>
          <View>
            <View style={modoStyle.content}>

              <Text style={modoStyle.text}>Ativar Modo Escuro</Text>

              <View style={modoStyle.info}>

                <Switch
                  value={switchValue}
                  onValueChange={toggleSwitch}
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={switchValue ? '#f5dd4b' : '#f4f3f4'}
                />

                <Text style={modoStyle.text}>{switchValue ? 'Ativado' : 'Desativado'}</Text>

              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

let darkStyles = StyleSheet.create({
  pagina: {
    flex: 1,
  },
  containerScroll: {
    alignItems: "center",
  },
  container: {
    backgroundColor: "#001F3F",
    width: screenWidth,
    alignItems: "center",
  },
  textConfig: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#f5f5f5",
    marginTop: 50,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    color: "#f5f5f5",
    marginBottom: 10,
    marginTop: 15
  },
  content: {
    width: screenWidth * 0.9,
    backgroundColor: "#252763",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 30,
    paddingBottom: 10,
    paddingTop: "10",
  },
  info: {
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth * 0.6,
    backgroundColor: "#343475",
    borderRadius: 20,
  }
});


let lightStyles = StyleSheet.create({
  pagina: {
    flex: 1,
  },
  containerScroll: {
    alignItems: "center",
  },
  container: {
    backgroundColor: "#d2e4fc",
    width: screenWidth,
    alignItems: "center",
  },
  textConfig: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 50,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
    marginTop: 15
  },
  content: {
    width: screenWidth * 0.9,
    backgroundColor: "#b1d8fa",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 30,
    paddingBottom: 10,
    paddingTop: "10",
  },
  info: {
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth * 0.6,
    backgroundColor: "#85a7d4",
    borderRadius: 20,
  }
});
