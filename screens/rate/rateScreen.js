import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, StyleSheet, Text, TouchableOpacity, } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';

const RateScreen = ({ navigation }) => {

    const [state, setState] = useState({
        rate1: false,
        rate2: false,
        rate3: false,
        rate4: false,
        rate5: false,
        review: '',
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        rate1,
        rate2,
        rate3,
        rate4,
        rate5,
        review,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {rating()}
                {reviewField()}
                {submitButton()}
            </View>
        </SafeAreaView>
    )

    function submitButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.pop()}
                style={styles.submitButtonStyle} >
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Submit
                </Text>
            </TouchableOpacity>
        )
    }

    function reviewField() {
        return (
            <TextInput
                mode="outlined"
                selectionColor={Colors.primaryColor}
                placeholder="Write your review here"
                placeholderTextColor={Colors.grayColor}
                value={review}
                onChangeText={text => updateState({ review: text })}
                style={styles.textFieldWrapStyle}
                multiline={true}
                numberOfLines={6}
                theme={{ colors: { primary: Colors.primaryColor } }}
            />
        )
    }

    function rating() {
        return (
            <View style={styles.ratingWrapStyle}>
                <MaterialIcons
                    name={rate1 ? "star" : "star-border"}
                    size={33}
                    color={Colors.ratingColor}
                    onPress={() => {
                        if (rate1) {
                            updateState({
                                rate2: false,
                                rate3: false,
                                rate4: false,
                                rate5: false,
                            })
                        }
                        else {
                            updateState({ rate1: true })
                        }
                    }}
                />
                <MaterialIcons
                    name={rate2 ? "star" : "star-border"}
                    size={33}
                    color={Colors.ratingColor}
                    onPress={() => {
                        if (rate2) {
                            updateState({
                                rate1: true,
                                rate3: false,
                                rate4: false,
                                rate5: false,
                            })
                        }
                        else {
                            updateState({
                                rate2: true,
                                rate1: true,
                            })
                        }
                    }}
                />
                <MaterialIcons
                    name={rate3 ? "star" : "star-border"}
                    size={33}
                    color={Colors.ratingColor}
                    onPress={() => {
                        if (rate3) {
                            updateState({
                                rate4: false,
                                rate5: false,
                                rate2: true,
                            })
                        }
                        else {
                            updateState({
                                rate3: true,
                                rate2: true,
                                rate1: true,
                            })
                        }
                    }}
                />
                <MaterialIcons
                    name={rate4 ? "star" : "star-border"}
                    size={33}
                    color={Colors.ratingColor}
                    onPress={() => {
                        if (rate4) {
                            updateState({
                                rate5: false,
                                rate3: true,
                            })
                        }
                        else {
                            updateState({
                                rate4: true,
                                rate3: true,
                                rate2: true,
                                rate1: true,
                            })
                        }
                    }}
                />
                <MaterialIcons
                    name={rate5 ? "star" : "star-border"}
                    size={33}
                    color={Colors.ratingColor}
                    onPress={() => {
                        if (rate5) {
                            updateState({
                                rate4: true,
                            })
                        }
                        else {
                            updateState({
                                rate5: true,
                                rate4: true,
                                rate3: true,
                                rate2: true,
                                rate1: true,
                            })
                        }
                    }}
                />
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
                    Rate Your Service Provider
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
    ratingWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: Sizes.fixPadding * 3.0
    },
    textFieldWrapStyle: {
        ...Fonts.blackColor14Regular,
        marginHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
        marginVertical: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding,
    },
    submitButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding + 10.0,
        alignItems: 'center',
        justifyContent: 'center',
        height: 56.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 3.0,
    }
})

export default RateScreen;