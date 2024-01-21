import { React, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

let { width, height } = Dimensions.get("window");

export default function ButtonIcon({ navigation, name, page, modoStyle }) {
    
    let style = modoStyle ? darkStyles : lightStyles;
    useEffect(() =>{
        style = modoStyle ? darkStyles : lightStyles;
    }, [modoStyle])

    return (
        <View>

            <TouchableOpacity style={style.iconContainer} onPress={() => navigation.navigate(page, {modoStyle: modoStyle})}>
                <FontAwesome5
                    name={name}
                    size={28}
                    color= {modoStyle ? "#fff" : "#001F3F"}
                />
            </TouchableOpacity>

        </View>
    );
};

const darkStyles = StyleSheet.create({

    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.6,
        height: 100,
        backgroundColor: "#343475",
        borderRadius: 20,
    },
    icon: {
        fontSize: 24,
    },
});


const lightStyles = StyleSheet.create({

    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.6,
        height: 100,
        backgroundColor: "#85a7d4",
        borderRadius: 20,
    },
    icon: {
        fontSize: 24,
    },
});

