import { Dimensions, StyleSheet } from "react-native";
import { Image, TouchableOpacity, Text, View } from 'react-native';
import IconPerfil from '../Components/IconPerfil';
import * as ImagePicker from 'expo-image-picker';
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';





const { width, height } = Dimensions.get('window');

export default function Usuario(modoStyle) {

  let darkMode = modoStyle.route.params.modoStyle;
  let styleMode = darkMode ? darkStyles : lightStyles;

  useEffect(() => {
    styleMode = darkMode ? darkStyles : lightStyles;
  }, [darkMode]);

  useEffect(() => {
    const carregarFotoSalva = async () => {
      try {
        // Carregar a URI da imagem do AsyncStorage
        const uri = await AsyncStorage.getItem('perfilFoto');
        if (uri) {
          setFoto({ uri });
        }
      } catch (error) {
        console.error('Erro ao carregar a foto do AsyncStorage:', error);
      }
    };

    carregarFotoSalva();
  }, []);

  const [foto, setFoto] = useState(null);

  async function fotoPerfil() {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setFoto(result.assets[0]);

      try {
        // Armazenar a URI da imagem usando AsyncStorage
        await AsyncStorage.setItem('perfilFoto', result.assets[0].uri);
      } catch (error) {
        console.error('Erro ao salvar a foto no AsyncStorage:', error);
      }

    }
  }


  return (
    <View style={styleMode.container}>

      <View style={styleMode.head}>
        <TouchableOpacity onPress={fotoPerfil} style={styleMode.perfil}>
          {foto && (<Image source={{ uri: foto.uri }} style={styleMode.perfil} />)}
        </TouchableOpacity>

        <IconPerfil name="pencil" size={20} />

        <Text style={styleMode.titulo}>Perfil</Text>
      </View>

      <View style={styleMode.info}>
        <Text style={styleMode.textinfo}>Nome: Ronaldo Delfino de Oliveria Filho</Text>
        <Text style={styleMode.textinfo}>Nascimento: 16/03/1998</Text>
        <Text style={styleMode.textinfo}>Peso: 78Kg</Text>
        <Text style={styleMode.textinfo}>Altura: 1.80m</Text>
        <Text style={styleMode.textinfo}>IMC: 24.07 - Normal</Text>
      </View>
    </View>
  )
}

const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: '#252763',
    height: height,
  },
  head: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    height: height / 2.3,
    width: width,
    backgroundColor: "#001F3F"
  },
  perfil: {
    width: width / 2.5,
    height: width / 2.5,
    borderRadius: 100,
    backgroundColor: "#494b87",
  },
  imagemPerfil: {
    minWidth: width / 3,
    minHeight: width / 3,
  },
  titulo: {
    fontSize: 24,
    marginTop: 0,
    paddingTop: 0,
    color: "#f5f5f5",
    paddingBottom: 15
  },
  texto: {
    fontSize: 12
  },
  info: {
    paddingTop: 30,
    paddingLeft: 10,
  },
  textinfo: {
    margin: 5,
    marginBottom: 15,
    fontSize: 16,
    color: '#f5f5f5'
  }
})

const lightStyles = StyleSheet.create({
  container: {
    backgroundColor: '#d2e4fc',
    height: height,
  },
  head: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    height: height / 2.3,
    width: width,
    backgroundColor: "#b1d8fa"
  },
  perfil: {
    width: width / 2.5,
    height: width / 2.5,
    borderRadius: 100,
    backgroundColor: "#fff",
  },
  imagemPerfil: {
    minWidth: width / 3,
    minHeight: width / 3,
  },
  titulo: {
    fontSize: 24,
    marginTop: 0,
    paddingTop: 0,
    color: "#333",
    paddingBottom: 15
  },
  texto: {
    fontSize: 12
  },
  info: {
    paddingTop: 30,
    paddingLeft: 10,
  },
  textinfo: {
    margin: 5,
    marginBottom: 15,
    fontSize: 16,
    color: '#333'
  }
})