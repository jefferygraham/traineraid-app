import React from "react";
import { SafeAreaView, View, StatusBar, StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';

const SettingsScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {title({ title: 'About' })}
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => navigation.push('PrivacyPolicy')}
                    >
                        {settingInfo({ title: 'Privacy policy' })}
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => navigation.push('TermsOfUse')}
                    >
                        {settingInfo({ title: 'Terms of use' })}
                    </TouchableOpacity>
                    {title({ title: 'App' })}
                    {settingInfo({ title: 'Support' })}
                    {settingInfo({ title: 'Report a bug' })}
                    {settingInfo({ title: 'App version 1.0' })}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function settingInfo({ title }) {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ ...Fonts.blackColor16Medium }}>
                        {title}
                    </Text>
                    <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                </View>
                <View style={{ marginVertical: Sizes.fixPadding + 2.0, backgroundColor: Colors.grayColor, height: 0.8 }} />
            </View>
        )
    }

    function title({ title }) {
        return (
            <Text style={{ ...Fonts.blackColor14Regular, margin: Sizes.fixPadding * 2.0 }}>
                {title}
            </Text>
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
                    Settings
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
})

export default SettingsScreen;