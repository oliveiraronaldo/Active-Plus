import { StyleSheet, TouchableOpacity, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';



export default function IconPerfil({ name, size }) {
    return (
        <View style={styles.buttonPerfil}>
                <FontAwesome
                    name={name}
                    size={size}
                    color="#000000"
                />
        </View>
    )
}


const styles = StyleSheet.create({
    buttonPerfil: {
        width: 32,
        height: 32,
        transform:[{ translateX: 40 }, { translateY: -20 }],
        backgroundColor: '#a3a4d6',
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
