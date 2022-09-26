import React from "react";
import { SafeAreaView, View, StatusBar, StyleSheet, Text, Image } from "react-native";
import { Colors, Sizes, Fonts } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {userInfo()}
            </View>
        </SafeAreaView>
    )

    function userInfo() {
        return (
            <>
                <View style={{ marginVertical: Sizes.fixPadding * 3.0, }}>
                    <Image
                        source={require('../../assets/images/user/user_5.jpg')}
                        style={styles.userImageStyle}
                    />
                    <Text style={{ textAlign: 'center', ...Fonts.blackColor18Bold, marginTop: Sizes.fixPadding }}>
                        Ellison Perry
                    </Text>
                </View>
                {info({ title: 'Phone Number', value: '123456789' })}
                {info({ title: 'Email', value: 'ellison@test.com' })}
            </>
        )
    }

    function info({ title, value }) {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginBottom: Sizes.fixPadding + 5.0 }}>
                <Text style={{ ...Fonts.blackColor16Bold }}>
                    {title}
                </Text>
                <Text style={{ ...Fonts.grayColor14Medium, marginTop: Sizes.fixPadding - 5.0, marginBottom: Sizes.fixPadding }}>
                    {value}
                </Text>
                <View style={{ backgroundColor: Colors.grayColor, height: 0.8 }} />
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons
                    name="arrow-back"
                    size={24}
                    color={Colors.blackColor}
                    onPress={() => navigation.pop()}
                />
                <Text style={{ ...Fonts.blackColor18Bold }}>
                    Profile
                </Text>
                <MaterialIcons
                    name="edit"
                    size={24}
                    color={Colors.blackColor}
                    onPress={() => navigation.push('EditProfile')}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        height: 50.0,
        paddingHorizontal: Sizes.fixPadding * 2.0
    },
    userImageStyle: {
        height: 100.0,
        width: 100.0,
        borderRadius: 50.0,
        alignSelf: 'center',
    }
})

export default ProfileScreen;