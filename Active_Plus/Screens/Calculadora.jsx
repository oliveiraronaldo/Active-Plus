import { Dimensions, StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList } from "react-native";
import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { FontAwesome5 } from '@expo/vector-icons';

let { width, height } = Dimensions.get("window");

export default function Calculadora(modoStyle) {

  let darkMode = modoStyle.route.params.modoStyle;
  let styleMode = darkMode ? darkStyles : lightStyles;

  useEffect(() => {
    styleMode = darkMode ? darkStyles : lightStyles;
  }, [darkMode])

  const [alimentoSelecionado, setAlimentoSelecionado] = useState('');
  const [caloriasTotais, setCaloriasTotais] = useState(0);

  const [text, setText] = useState('');
  const [refeicao, setRefeicao] = useState([]);
  const tamanhoLimite = 10;


  const handleInputChange = (inputText) => {
    setText(inputText);
  };


  function AdicionarRefeicao() {
    let alimentoValue = alimentoSelecionado.split(' ');
    let peso = text + 'g';

    let calorias = parseFloat(text * alimentoValue[1]);
    let alimento = alimentoValue[0];

    setCaloriasTotais(caloriasTotais + calorias);

    const novaRefeicao = { Alimento: alimento, Quantidade: peso, Calorias: parseFloat(calorias).toFixed(2) };

    setRefeicao((anterior) => [novaRefeicao, ...anterior.slice(0, tamanhoLimite - 1)]);
  }

  useEffect(() => {
    renderHistorico

  }, [refeicao]);

  async function compartilharCalorias() {

    try {
      const mensagem = `O Ronaldo já consumiu ${parseFloat(caloriasTotais).toFixed(2)} calorias`;

      // Crie um arquivo temporário
      const fileUri = `${FileSystem.cacheDirectory}calorias_consumidas.txt`;
      await FileSystem.writeAsStringAsync(fileUri, mensagem);

      // Compartilhe o arquivo
      await Sharing.shareAsync(fileUri, { mimeType: 'text/plain', dialogTitle: 'Compartilhar Mensagem' });

      //Exclua o arquivo temporário após compartilhar
      await FileSystem.deleteAsync(fileUri, { idempotent: true });
    } catch (error) {
      console.error('Erro ao compartilhar mensagem:', error);
    }
  };

  function renderHistorico({ item }) {

    return (
      <View style={styleMode.historico}>
        <Text style={styleMode.textHistorico}>Alimento: {item.Alimento} </Text>
        <Text style={styleMode.textHistorico}>Quantidade: {item.Quantidade}</Text>
        <Text style={styleMode.textHistorico}>Calorias: {item.Calorias} cal</Text>
      </View>
    )
  }


  return (
    <View style={styleMode.container}>

      <View>

        <View style={styleMode.content}>
          <Text style={styleMode.text}>
            Alimento
          </Text>

          <Picker
            style={styleMode.picker}
            selectedValue={alimentoSelecionado}
            onValueChange={(itemValue, itemIndex,) =>
              setAlimentoSelecionado(itemValue)
            }>
            <Picker.Item label="Arroz" value="Arroz 1.1" style={styleMode.pickerItem} />
            <Picker.Item label="Feijao" value="Feijão 3.16" style={styleMode.pickerItem} />
            <Picker.Item label="Frango" value="Frango 1.06" style={styleMode.pickerItem} />
            <Picker.Item label="Carne-de-Porco" value="Carne-de-Porco 2.85" style={styleMode.pickerItem} />
            <Picker.Item label="Carne-de-Vaca" value="Carne-de-Vaca 1.4" style={styleMode.pickerItem} />
            <Picker.Item label="Ovo-Cozido" value="Ovo-Cozido 1.48" style={styleMode.pickerItem} />
            <Picker.Item label="Ovo-Frito" value="Ovo-Frito 1.8" style={styleMode.pickerItem} />
            <Picker.Item label="Bacon" value="Bacon 5.68" style={styleMode.pickerItem} />
            <Picker.Item label="Pão-Francês" value="Pão-Francês 2.7" style={styleMode.pickerItem} />
            <Picker.Item label="Peixe-Cozido" value="Peixe-Cozido 0.98" style={styleMode.pickerItem} />
            <Picker.Item label="Peixe-Frito" value="Peixe-Frito 3.63" style={styleMode.pickerItem} />
            <Picker.Item label="Batata-Cozida" value="Batata-Cozida 0.8" style={styleMode.pickerItem} />
            <Picker.Item label="Batata-Frita" value="Batata-Frita 2.74" style={styleMode.pickerItem} />
            <Picker.Item label="Chocolate" value="Chocolate 5.43" style={styleMode.pickerItem} />
          </Picker>

          <Text style={styleMode.text}>
            Quantidade
          </Text>


          <TextInput
            style={styleMode.input}
            onChangeText={handleInputChange}
            value={text}
            keyboardType="numeric"
            placeholder="Quantidade (g)"
          />


          <TouchableOpacity onPress={AdicionarRefeicao}>
            <Text style={styleMode.botao}>
              Calcular
            </Text>
          </TouchableOpacity>


          <TouchableOpacity style={styleMode.caloriasTotais} onPress={compartilharCalorias}>
            <Text style={styleMode.caloriasTotaisTxT}>
              Calorias totais consumidas
            </Text >

            <Text style={styleMode.caloriasTotaisTxT}>
              {parseFloat(caloriasTotais).toFixed(2)} cal
            </Text>

            <FontAwesome5
              name={"share"}
              size={15}
              color={darkMode ? "#fff" : "#001F3F"}
            />

          </TouchableOpacity>

        </View>
      </View>

      <FlatList
        data={refeicao}
        renderItem={renderHistorico}
      />
    </View>
  )
}


let darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001F3F',
    width: width,
    alignItems: 'center',
    paddingTop: 15
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f5f5f5',
    marginTop: 15,
    marginBottom: 25,
    textAlign: 'center'
  },
  content: {
    width: width * 0.9,
    backgroundColor: "#252763",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 15,
    paddingBottom: 10
  },
  text: {
    fontSize: 16,
    color: "#f5f5f5",
    marginBottom: 10,
    marginTop: 15
  },
  botao: {
    width: width * 0.6,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: "#001F3F",
    textAlign: "center",
    color: "#f5f5f5",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 15
  },
  picker: {
    width: width * 0.6,
    backgroundColor: "#001F3F",
    color: "#f5f5f5"
  },
  pickerItem: {
    color: "#001F3F",
    fontSize: 18,

  },
  input: {
    height: 40,
    borderColor: '#001F3F',
    borderWidth: 1,
    backgroundColor: "#f5f5f5",
    marginBottom: 16,
    paddingHorizontal: 8,
    width: width * 0.6,
  },
  historico: {
    flex: 1,
    backgroundColor: '#252763',
    width: width * 0.9,
    marginBottom: 10
  },
  textHistorico: {
    color: '#f5f5f5',
    fontSize: 14,
    padding: 5

  },
  caloriasTotais: {
    width: width * 0.6,
    backgroundColor: "#343475",
    paddingTop: 15,
    paddingBottom: 15,
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center"
  },
  caloriasTotaisTxT: {
    fontSize: 14,
    color: "#f5f5f5",
    textAlign: "center",
    marginBottom: 5
  }

});



let lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d2e4fc',
    width: width,
    alignItems: 'center',
    paddingTop: 15
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 25,
    textAlign: 'center'
  },
  content: {
    width: width * 0.9,
    backgroundColor: "#b1d8fa",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 15,
    paddingBottom: 10
  },
  text: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
    marginTop: 15
  },
  botao: {
    width: width * 0.6,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: "#12365c",
    textAlign: "center",
    color: "#f5f5f5",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 15
  },
  picker: {
    width: width * 0.6,
    backgroundColor: "#12365c",
    color: "#f5f5f5"
  },
  pickerItem: {
    color: "#001F3F",
    fontSize: 18,

  },
  input: {
    height: 40,
    borderColor: '#001F3F',
    borderWidth: 1,
    backgroundColor: "#f5f5f5",
    marginBottom: 16,
    paddingHorizontal: 8,
    width: width * 0.6,
  },
  historico: {
    flex: 1,
    backgroundColor: '#b1d8fa',
    width: width * 0.9,
    marginBottom: 10
  },
  textHistorico: {
    color: '#333',
    fontSize: 14,
    padding: 5

  },
  caloriasTotais: {
    width: width * 0.6,
    backgroundColor: "#85a7d4",
    paddingTop: 15,
    paddingBottom: 15,
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center"
  },
  caloriasTotaisTxT: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    marginBottom: 5
  }

})