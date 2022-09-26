import React from "react";
import { SafeAreaView, View, StatusBar, Text, StyleSheet } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';

const TermsOfUseScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {termsOfUseInfo()}
            </View>
        </SafeAreaView>
    )

    function termsOfUseInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginVertical: Sizes.fixPadding + 5.0 }}>
                <Text style={{ ...Fonts.blackColor14Regular }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit. Maecenas aenean scelerisque egestas turpis
                    suspendisse arcu eu. Vitae malesuada ac et arcu,
                    luctus condimentum nec. Egestas adipiscing et,
                    euismod elementum cras. Risus, est ullamcorper
                    urna vel consequat, quis at.
                </Text>
                <Text style={{ ...Fonts.blackColor14Regular, marginTop: Sizes.fixPadding }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit. Maecenas aenean scelerisque egestas turpis
                    suspendisse arcu eu. Vitae malesuada ac et arcu,
                    luctus condimentum nec. Egestas adipiscing et,
                    euismod elementum cras. Risus, est ullamcorper
                    urna vel consequat, quis at.
                </Text>
                <Text style={{ ...Fonts.blackColor14Regular, marginTop: Sizes.fixPadding }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit. Maecenas aenean scelerisque egestas turpis
                    suspendisse arcu eu. Vitae malesuada ac et arcu,
                    luctus condimentum nec. Egestas adipiscing et,
                    euismod elementum cras. Risus, est ullamcorper
                    urna vel consequat, quis at.
                </Text>
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor}
                    onPress={() => navigation.pop()}
                    style={{ position: 'absolute', left: 20.0 }}
                />
                <Text style={{ ...Fonts.blackColor18Bold, marginLeft: Sizes.fixPadding + 5.0, }}>
                    Terms of use
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

export default TermsOfUseScreen;