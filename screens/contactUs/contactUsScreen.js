import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';

const ContactUsScreen = ({ navigation }) => {

    const [state, setState] = useState({
        name: '',
        email: '',
        message: '',
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        name,
        email,
        message,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {nameTextField()}
                {emailTextField()}
                {messageTextField()}
                {submitButton()}
            </View>
        </SafeAreaView>
    )

    function submitButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                style={styles.submitButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Sumbit
                </Text>
            </TouchableOpacity>
        )
    }

    function messageTextField() {
        return (
            <TextInput
                mode="outlined"
                selectionColor={Colors.primaryColor}
                placeholder="Write here"
                placeholderTextColor={Colors.grayColor}
                value={message}
                onChangeText={text => updateState({ message: text })}
                multiline={true}
                style={{ marginHorizontal: Sizes.fixPadding * 2.0, backgroundColor: Colors.whiteColor, marginTop: Sizes.fixPadding + 5.0 }}
                numberOfLines={6}
                theme={{ colors: { primary: Colors.primaryColor } }}
            />
        )
    }

    function emailTextField() {
        return (
            <TextInput
                placeholder="Email Address"
                mode="outlined"
                placeholderTextColor={Colors.grayColor}
                value={email}
                onChangeText={text => updateState({ email: text })}
                style={{ ...styles.textFieldStyle }}
                selectionColor={Colors.primaryColor}
                theme={{ colors: { primary: Colors.primaryColor, } }}
            />
        )
    }

    function nameTextField() {
        return (
            <TextInput
                placeholder="Name"
                mode="outlined"
                placeholderTextColor={Colors.grayColor}
                value={name}
                onChangeText={text => updateState({ name: text })}
                style={styles.textFieldStyle}
                selectionColor={Colors.primaryColor}
                theme={{ colors: { primary: Colors.primaryColor, } }}
            />
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor}
                    onPress={() => navigation.goBack()}
                    style={{ position: 'absolute', left: 20.0 }}
                />
                <Text style={{ ...Fonts.blackColor18Bold, marginLeft: Sizes.fixPadding + 5.0, }}>
                    Contact us
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        height: 50.0,
        elevation: 3.0,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: Sizes.fixPadding * 2.0,
    },
    textFieldStyle: {
        ...Fonts.grayColor16Medium,
        backgroundColor: Colors.whiteColor,
        marginHorizontal: Sizes.fixPadding * 2.0,
        height: 40.0,
        marginTop: Sizes.fixPadding + 5.0,
    },
    submitButton: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding + 10.0,
        alignItems: 'center',
        justifyContent: 'center',
        height: 56.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 5.0,
    }
})

export default ContactUsScreen;