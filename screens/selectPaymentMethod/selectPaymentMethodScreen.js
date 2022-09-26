import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, StyleSheet, Text, ScrollView, Dimensions, TouchableOpacity, Image } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import Dialog from "react-native-dialog";

const { width } = Dimensions.get('screen');

const SelectPaymentMethodScreen = ({ navigation }) => {

    const [state, setState] = useState({
        currentPaymentMethodIndex: 1,
        showSuccessDialog: false,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        currentPaymentMethodIndex,
        showSuccessDialog,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 8.0 }}
                >
                    {payableAmount()}
                    {paymentMethod({
                        icon: require('../../assets/images/payment/card.png'),
                        paymentType: 'Card',
                        index: 1,
                    })}
                    {paymentMethod({
                        icon: require('../../assets/images/payment/paypal.png'),
                        paymentType: 'Paypal',
                        index: 2,
                    })}
                    {paymentMethod({
                        icon: require('../../assets/images/payment/skrill.png'),
                        paymentType: 'Skrill',
                        index: 3,
                    })}
                </ScrollView>
                {payButton()}
                {successDialog()}
            </View>
        </SafeAreaView>
    )

    function successDialog() {
        return (
            <Dialog.Container
                visible={showSuccessDialog}
                contentStyle={styles.dialogWrapStyle}
                headerStyle={{ margin: 0.0 }}
            >
                <View style={{ backgroundColor: Colors.whiteColor, alignItems: 'center' }}>
                    <View style={styles.successIconWrapStyle}>
                        <MaterialIcons name="done" size={24} color={Colors.primaryColor} />
                    </View>
                    <Text style={{ ...Fonts.grayColor18Bold, marginTop: Sizes.fixPadding }}>
                        Success
                    </Text>
                </View>
            </Dialog.Container>
        )
    }

    function payButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    updateState({ showSuccessDialog: true })
                    setTimeout(() => {
                        updateState({ showSuccessDialog: false })
                        navigation.push('MainDrawer');
                    }, 2000);
                }
                }
                style={styles.payButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Pay
                </Text>
            </TouchableOpacity>
        )
    }

    function payableAmount() {
        return (
            <TouchableOpacity style={{
                flexDirection: 'row',
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginTop: Sizes.fixPadding,
                marginBottom: Sizes.fixPadding - 5.0
            }}>
                <Text style={{ ...Fonts.primaryColor18Bold }}>
                    Pay:
                </Text>
                <Text style={{ ...Fonts.blackColor18Medium, marginLeft: Sizes.fixPadding - 5.0 }}>
                    $50
                </Text>
            </TouchableOpacity>
        )
    }

    function paymentMethod({ icon, paymentType, index }) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => updateState({ currentPaymentMethodIndex: index })}
                style={{
                    borderColor: currentPaymentMethodIndex == index ? Colors.primaryColor : '#E0E0E0',
                    ...styles.paymentMethodWrapStyle
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={icon}
                        style={{
                            width: 55.0,
                            height: 55.0,
                        }}
                        resizeMode="contain"
                    />
                    <Text numberOfLines={1} style={{
                        ...Fonts.blackColor18Bold,
                        marginLeft: Sizes.fixPadding,
                        width: width / 2.2,
                    }}>
                        {paymentType}
                    </Text>
                </View>
                <View style={{
                    borderColor: currentPaymentMethodIndex == index ? Colors.primaryColor : '#E0E0E0',
                    ...styles.radioButtonStyle
                }}>
                    {
                        currentPaymentMethodIndex == index ?
                            <View style={{
                                width: 12.0,
                                height: 12.0,
                                borderRadius: 6.0,
                                backgroundColor: Colors.primaryColor
                            }}>
                            </View>
                            :
                            null
                    }
                </View>
            </TouchableOpacity>
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
                    Select Payment Method
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        height: 56.0,
        elevation: 3.0,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: Sizes.fixPadding * 2.0,
    },
    paymentMethodWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        borderWidth: 1.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: Sizes.fixPadding,
    },
    radioButtonStyle: {
        width: 20.0,
        height: 20.0,
        borderRadius: 10.0,
        borderWidth: 1.0,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    payButtonOuterWrapStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.whiteColor,
        borderTopColor: '#ECECEC',
        borderTopWidth: 1.0,
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0
    },
    payButtonStyle: {
        position: 'absolute',
        left: 0.0,
        right: 0.0,
        bottom: 0.0,
        backgroundColor: Colors.primaryColor,
        height: 50.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dialogWrapStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 40,
        backgroundColor: Colors.whiteColor,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
    },
    successIconWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        width: 60.0,
        height: 60.0,
        borderRadius: 30.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding,
    },
})

export default SelectPaymentMethodScreen;