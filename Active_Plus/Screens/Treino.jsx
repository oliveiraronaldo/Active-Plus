import { Dimensions, StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList } from "react-native";
import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { FontAwesome5 } from '@expo/vector-icons';




let { width, height } = Dimensions.get("window");

export default function Treino(modoStyle) {

    let darkMode = modoStyle.route.params.modoStyle;
    let styleMode = darkMode ? darkStyles : lightStyles;

    useEffect(() => {
        styleMode = darkMode ? darkStyles : lightStyles;
    }, [darkMode])

    const [exercicioSelecionado, setExercicioSelecionado] = useState('');
    const [caloriasTotais, setCaloriasTotais] = useState(0);

    const [text, setText] = useState('');
    const [treino, setTreino] = useState([]);
    const tamanhoLimite = 10;

    const handleInputChange = (inputText) => {
        setText(inputText);
    };

    function AdicionarTreino() {
        let execValue = exercicioSelecionado.split(' ');
        let tempo = text + ' Minutos';

        let calorias = parseFloat(text * execValue[1]);
        let exercicio = execValue[0];

        setCaloriasTotais(caloriasTotais + calorias);

        const novoTreino = { Exercicio: exercicio, Tempo: tempo, Calorias: parseFloat(calorias).toFixed(2) };

        setTreino((anterior) => [novoTreino, ...anterior.slice(0, tamanhoLimite - 1)]);
    }

    useEffect(() => {
        renderHistorico
    }, [treino]);

    function renderHistorico({ item }) {

        return (
            <View style={styleMode.historico}>
                <Text style={styleMode.textHistorico}>Exercicio: {item.Exercicio} </Text>
                <Text style={styleMode.textHistorico}>Tempo Gasto: {item.Tempo}</Text>
                <Text style={styleMode.textHistorico}>Calorias Queimadas: {item.Calorias} cal</Text>
            </View>
        )
    }

    async function compartilharCalorias() {

        try {
            const mensagem = `O Ronaldo já queimou ${parseFloat(caloriasTotais).toFixed(2)} calorias`;

            // Crie um arquivo temporário
            const fileUri = `${FileSystem.cacheDirectory}calorias_queimadas.txt`;
            await FileSystem.writeAsStringAsync(fileUri, mensagem);

            // Compartilhe o arquivo
            await Sharing.shareAsync(fileUri, { mimeType: 'text/plain', dialogTitle: 'Compartilhar Mensagem' });

            //Exclua o arquivo temporário após compartilhar
            await FileSystem.deleteAsync(fileUri, { idempotent: true });
        } catch (error) {
            console.error('Erro ao compartilhar mensagem:', error);
        }
    };


    return (



        <View style={styleMode.container}>
            <View>
                <View style={styleMode.content}>
                    <Text style={styleMode.text}>
                        Exercício
                    </Text>

                    <Picker
                        style={styleMode.picker}
                        selectedValue={exercicioSelecionado}
                        onValueChange={(itemValue, itemIndex,) =>
                            setExercicioSelecionado(itemValue)
                        }>
                        <Picker.Item label="Balé" value="Balé 8" style={styleMode.pickerItem} />
                        <Picker.Item label="Basquete" value="Basquete 10" style={styleMode.pickerItem} />
                        <Picker.Item label="Bicicleta" value="Bicicleta 5" style={styleMode.pickerItem} />
                        <Picker.Item label="Boxe" value="Boxe 11" style={styleMode.pickerItem} />
                        <Picker.Item label="Caminhada" value="Caminhada 5.5" style={styleMode.pickerItem} />
                        <Picker.Item label="Capoeira" value="Capoeira 12" style={styleMode.pickerItem} />
                        <Picker.Item label="Escada" value="Escada 16.6" style={styleMode.pickerItem} />
                        <Picker.Item label="Futebol" value="Futebol 9" style={styleMode.pickerItem} />
                        <Picker.Item label="Handebol" value="Handebol 10" style={styleMode.pickerItem} />
                        <Picker.Item label="Hidroginástica" value="Hidroginástica 6" style={styleMode.pickerItem} />
                        <Picker.Item label="Jiu-jitsu" value="Jiu-jitsu 12" style={styleMode.pickerItem} />
                        <Picker.Item label="Judô" value="Judô 12" style={styleMode.pickerItem} />
                        <Picker.Item label="Musculação" value="Musculação 5" style={styleMode.pickerItem} />
                        <Picker.Item label="Vôlei" value="Vôlei 6" style={styleMode.pickerItem} />
                    </Picker>

                    <Text style={styleMode.text}>
                        Duração
                    </Text>


                    <TextInput
                        style={styleMode.input}
                        onChangeText={handleInputChange}
                        value={text}
                        keyboardType="numeric"
                        placeholder="Tempo (m)"
                    />


                    <TouchableOpacity onPress={AdicionarTreino}>
                        <Text style={styleMode.botao}>
                            Adicionar
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styleMode.caloriasTotais} onPress={compartilharCalorias}>
                        <Text style={styleMode.caloriasTotaisTxT}>
                            Calorias totais queimadas
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
                data={treino}
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
        paddingBottom: 10,
        paddingTop: "10",
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
        paddingBottom: 10,
        paddingTop: "10",
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

});