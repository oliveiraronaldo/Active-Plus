import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export default function Pagina({ navigation }) {


    useEffect(() => {
        solicitarConfirmacaoBiometria()
    },[])


    const solicitarConfirmacaoBiometria = async () => {
        try {
            const compativel = await LocalAuthentication.hasHardwareAsync();

            if (compativel) {
                const biometriaAtiva = await LocalAuthentication.isEnrolledAsync();

                if (biometriaAtiva) {
                    const resultado = await LocalAuthentication.authenticateAsync({
                        promptMessage: 'Confirme sua identidade',
                    });

                    if (resultado.success) {
                        navigation.navigate('HomePage');
                    } else {
                        Alert.alert('Identidade não confirmada', 'Tente novamente.');
                    }
                } else {
                    Alert.alert(
                        'Biometria não configurada',
                        'Configure uma opção de biometria nas configurações do dispositivo.'
                    );
                }
            } else {
                Alert.alert(
                    'Hardware não compatível',
                    'Seu dispositivo não suporta biometria.'
                );
            }
        } catch (error) {
            console.error('Erro ao autenticar biometria:', error);
        }
    };

    return (
        <View style={styles.container}>
          <TouchableOpacity onPress={solicitarConfirmacaoBiometria}>
            <Text>Toque para entrar</Text>
          </TouchableOpacity>
        </View>
      );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
