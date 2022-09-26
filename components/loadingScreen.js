import React, { useEffect } from "react";
import { View } from "react-native";
import * as Font from "expo-font";
import { Colors } from "../constants/styles";

const LoadingScreen = ({ navigation }) => {

    useEffect(() => {
        async function loadFont() {
            await Font.loadAsync({
                Montserrat_Light: require("../assets/fonts/montserrat/Montserrat-Light.ttf"),
                Montserrat_Medium: require("../assets/fonts/montserrat/Montserrat-Medium.ttf"),
                Montserrat_Regular: require("../assets/fonts/montserrat/Montserrat-Regular.ttf"),
                Montserrat_SemiBold: require("../assets/fonts/montserrat/Montserrat-SemiBold.ttf"),
                Montserrat_Bold: require("../assets/fonts/montserrat/Montserrat-Bold.ttf"),
            });
            navigation.navigate('Splash');
        }
        loadFont();
    })

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteColor }} />
    )
}

export default LoadingScreen;

