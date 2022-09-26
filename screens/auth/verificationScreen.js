import React, { createRef, useState } from "react";
import {
    Text,
    View,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    ImageBackground,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Sizes, Fonts } from "../../constants/styles";
import Dialog from "react-native-dialog";
import { CircleFade } from 'react-native-animated-spinkit';

const { width } = Dimensions.get('screen');

const VerificationScreen = ({ navigation }) => {

    const [state, setState] = useState({
        isLoading: false,
        firstDigit: '',
        secondDigit: '',
        thirdDigit: '',
        forthDigit: '',
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        isLoading,
        firstDigit,
        secondDigit,
        thirdDigit,
        forthDigit,
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
                        {backArrow()}
                        {verificationInfo()}
                        {otpFields()}
                        {resendInfo()}
                        {continueButton()}
                    </ScrollView>
                </LinearGradient>
            </ImageBackground>
            {loading()}
        </SafeAreaView >
    )

    function backArrow() {
        return (
            <MaterialIcons
                name="arrow-back"
                size={24}
                color={Colors.whiteColor}
                style={{
                    marginTop: Sizes.fixPadding * 7.0,
                    marginBottom: Sizes.fixPadding
                }}
                onPress={() => navigation.pop()}
            />
        )
    }

    function loading() {
        return (
            <Dialog.Container
                visible={isLoading}
                contentStyle={styles.dialogContainerStyle}
            >
                <View style={{ backgroundColor: 'white', alignItems: 'center', }}>
                    <CircleFade size={56} color={Colors.primaryColor} />
                    <Text style={{
                        ...Fonts.grayColor12Medium,
                        marginTop: Sizes.fixPadding * 2.0
                    }}>
                        Please wait..
                    </Text>
                </View>
            </Dialog.Container>
        );
    }

    function continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    updateState({ isLoading: true })
                    setTimeout(() => {
                        updateState({ isLoading: false })
                        navigation.push('Register');
                    }, 2000);
                }}
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
            </TouchableOpacity >
        )
    }

    function resendInfo() {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: Sizes.fixPadding * 7.0,
            }}>
                <Text style={{ ...Fonts.whiteColor14Medium, paddingBottom: Sizes.fixPadding - 8.0, alignSelf: 'flex-end', }}>
                    Didn’t receive otp code!
                </Text>
                <Text style={{ ...Fonts.whiteColor18Bold, marginLeft: Sizes.fixPadding - 5.0 }}>
                    Resend
                </Text>
            </View>
        )
    }

    function otpFields() {
        const secondTextInput = createRef();
        const thirdTextInput = createRef();
        const forthTextInput = createRef();

        return (
            <View style={styles.otpFieldsWrapStyle}>
                <View style={styles.textFieldWrapStyle}>
                    <TextInput
                        selectionColor={Colors.whiteColor}
                        value={firstDigit}
                        style={{ ...Fonts.whiteColor18Medium, }}
                        onChangeText={(text) => {
                            updateState({ firstDigit: text })
                            secondTextInput.current.focus();
                        }}
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.textFieldWrapStyle}>
                    <TextInput
                        selectionColor={Colors.whiteColor}
                        value={secondDigit}
                        style={{ ...Fonts.whiteColor18Medium, }}
                        ref={secondTextInput}
                        keyboardType="numeric"
                        onChangeText={(text) => {
                            updateState({ secondDigit: text })
                            thirdTextInput.current.focus();
                        }}
                    />
                </View>

                <View style={styles.textFieldWrapStyle}>
                    <TextInput
                        selectionColor={Colors.whiteColor}
                        style={{ ...Fonts.whiteColor18Medium, }}
                        keyboardType="numeric"
                        value={thirdDigit}
                        ref={thirdTextInput}
                        onChangeText={(text) => {
                            updateState({ thirdDigit: text })
                            forthTextInput.current.focus();
                        }}

                    />
                </View>

                <View style={styles.textFieldWrapStyle}>
                    <TextInput
                        selectionColor={Colors.whiteColor}
                        style={{ ...Fonts.whiteColor18Medium, }}
                        keyboardType="numeric"
                        value={forthDigit}
                        ref={forthTextInput}
                        onChangeText={(text) => {
                            updateState({ forthDigit: text })
                            updateState({ isLoading: true })
                            setTimeout(() => {
                                updateState({ isLoading: false })
                                navigation.navigate('Register');
                            }, 2000);
                        }}
                    />
                </View>
            </View>
        )
    }

    function verificationInfo() {
        return (
            <View style={{
                marginTop: Sizes.fixPadding * 3.0,
                marginBottom: Sizes.fixPadding * 4.0
            }}>
                <Text style={{ ...Fonts.whiteColor36Bold }}>
                    Verification
                </Text>
                <Text style={{ ...Fonts.whiteColor14Medium, }}>
                    Enter the otp code from the phone we just sent you
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    otpFieldsWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Sizes.fixPadding * 4.0,
    },
    textFieldWrapStyle: {
        height: 60.0,
        width: 60.0,
        borderRadius: Sizes.fixPadding,
        backgroundColor: 'rgba(203, 189, 189, 0.73)',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        paddingLeft: Sizes.fixPadding - 4.0,
    },
    continueButtonStyle: {
        borderRadius: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding * 5.0,
        height: 56.0,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 40,
        paddingHorizontal: Sizes.fixPadding * 3.0,
        paddingTop: -Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding,
    },
})

export default VerificationScreen;