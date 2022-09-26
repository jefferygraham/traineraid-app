import React, { useState, useCallback } from "react";
import {
    BackHandler,
    Text,
    View,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    ImageBackground,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Sizes, Fonts } from "../../constants/styles";
import IntlPhoneInput from 'react-native-intl-phone-input';
import { useFocusEffect } from "@react-navigation/native";

const { width, height } = Dimensions.get('screen');

const LoginScreen = ({ navigation }) => {

    const backAction = () => {
        backClickCount == 1 ? BackHandler.exitApp() : _spring();
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    function _spring() {
        updateState({ backClickCount: 1 });
        setTimeout(() => {
            updateState({ backClickCount: 0 })
        }, 1000)
    }

    const [state, setState] = useState({
        phoneNumber: "",
        backClickCount: 0
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        phoneNumber,
        backClickCount,
    } = state;


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
            <ImageBackground
                style={{ flex: 1 }}
                source={require('../../assets/images/bg.jpg')}
                resizeMode="cover"
            >
                <LinearGradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    colors={['black', 'rgba(0,0.10,0,0.70)', 'rgba(0,0,0,0.0)',]}
                    style={{ flex: 1, paddingHorizontal: Sizes.fixPadding * 2.0 }}
                >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        {welcomeInfo()}
                        {phoneNumberTextField()}
                        {continueButton()}
                        {otpText()}
                        {loginWithFacebookButton()}
                        {loginWithGoogleButton()}
                    </ScrollView>
                </LinearGradient>
            </ImageBackground>
            {
                backClickCount == 1
                    ?
                    <View style={[styles.animatedView]}>
                        <Text style={{ ...Fonts.whiteColor14Medium }}>
                            press back again to exit the app
                        </Text>
                    </View>
                    :
                    null
            }
        </SafeAreaView >
    )

    function phoneNumberTextField() {
        return (
            <IntlPhoneInput
                defaultCountry="IN"
                onChangeText={({ phoneNumber }) => updateState({ phoneNumber: phoneNumber })}
                phoneInputStyle={{ flex: 1, ...Fonts.whiteColor14Medium, marginLeft: Sizes.fixPadding }}
                placeholder="Phone Number"
                dialCodeTextStyle={{ ...Fonts.whiteColor14Medium, marginLeft: Sizes.fixPadding }}
                containerStyle={{
                    backgroundColor: 'rgba(203, 189, 189, 0.73)',
                    borderRadius: Sizes.fixPadding * 2.0,
                    height: 56.0,
                    marginTop: Sizes.fixPadding * 8.0
                }}
            />
        )
    }

    function loginWithGoogleButton() {
        return (
            <View style={styles.loginWithGoogleButtonStyle}>
                <Image
                    source={require('../../assets/images/google.png')}
                    style={{ height: 37.0, width: 37.0, }}
                    resizeMode="cover"
                />
                <Text style={{ ...Fonts.blackColor14Medium, marginLeft: Sizes.fixPadding + 5.0 }}>
                    Log in with Google
                </Text>
            </View>
        )
    }

    function loginWithFacebookButton() {
        return (
            <View style={styles.loginWithFacebookButtonStyle}>
                <Image
                    source={require('../../assets/images/facebook.png')}
                    style={{ height: 37.0, width: 37.0, }}
                    resizeMode="cover"
                />
                <Text style={{ ...Fonts.whiteColor14Medium, marginLeft: Sizes.fixPadding + 5.0 }}>
                    Log in with Facebook
                </Text>
            </View>
        )
    }

    function otpText() {
        return (
            <Text style={{ ...Fonts.whiteColor18Medium, textAlign: 'center' }}>
                We’ll send otp for verification
            </Text>
        )
    }

    function continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('Verification')}
            >
                <LinearGradient
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 0 }}
                    colors={['rgba(219, 24, 24, 1.0)', 'rgba(219, 24, 24, 0.49)',]}
                    style={styles.continueButtonStyle}
                >
                    <Text style={{ ...Fonts.whiteColor18Bold }}>
                        Continue
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        )
    }

    function welcomeInfo() {
        return (
            <View style={{
                marginTop: Sizes.fixPadding * 8.0,
                marginBottom: Sizes.fixPadding * 4.0
            }}>
                <Text style={{ ...Fonts.whiteColor36Bold }}>
                    Welcome back
                </Text>
                <Text style={{
                    ...Fonts.whiteColor14Medium,
                    //marginTop: Sizes.fixPadding - 5.0
                }}>
                    Login your account
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    phoneNumberContentStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 60.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        backgroundColor: "rgba(128, 128, 128, 0.8)",
        borderRadius: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 8.0,
    },
    selectAreaModalStyle: {
        height: height * 0.5,
        width: width * 0.8,
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding
    },
    loginWithGoogleButtonStyle: {
        borderRadius: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.whiteColor,
        flexDirection: 'row',
        height: 56.0,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    loginWithFacebookButtonStyle: {
        borderRadius: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding * 6.0,
        marginBottom: Sizes.fixPadding * 2.5,
        backgroundColor: '#3B5998',
        flexDirection: 'row',
        height: 56.0,
    },
    continueButtonStyle: {
        borderRadius: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding * 4.0,
        marginBottom: Sizes.fixPadding * 2.0,
        height: 56.0,
    },
    searchCountryTextFieldContentStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 2.0,
        borderBottomWidth: 1.0,
        borderBottomColor: Colors.grayColor
    },
    animatedView: {
        backgroundColor: "#333333",
        position: "absolute",
        bottom: 20,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
})

export default LoginScreen;