import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, StyleSheet, Text, TextInput, ScrollView, FlatList, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { BottomSheet } from '@rneui/themed';

const colorsList = [
    {
        id: '1',
        color: '#FF0000',
    },
    {
        id: '2',
        color: '#FFFFFF',
    },
    {
        id: '3',
        color: '#5B44E8',
    },
    {
        id: '4',
        color: '#E5E3EF',
    },
    {
        id: '5',
        color: '#000000',
    },
];

const AddNewCarScreen = ({ navigation }) => {

    const [state, setState] = useState({
        selectedCarColorId: colorsList[0].id,
        carBrandName: '',
        carModel: '',
        carNumber: '',
        showBottomSheet: false,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        selectedCarColorId,
        carBrandName,
        carModel,
        carNumber,
        showBottomSheet,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {cameraSelection()}
                    {carBrandNameTextField()}
                    {carModelTextField()}
                    {carNumberTextField()}
                    {selectColorInfo()}
                    {addCarButton()}

                </ScrollView>
                {addNewCarBottomSheet()}
            </View>
        </SafeAreaView>
    )

    function addNewCarBottomSheet() {
        return (
            <BottomSheet
                isVisible={showBottomSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
                onBackdropPress={() => updateState({ showBottomSheet: false })}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => updateState({ showBottomSheet: false })}
                    style={styles.bottomSheetWrapStyle}
                >
                    <Text style={{ ...Fonts.blackColor18Bold, textAlign: 'center' }}>
                        Choose Option
                    </Text>
                    <View style={styles.bottomSheetDividerStyle} />
                    <View style={{ flexDirection: 'row', marginHorizontal: Sizes.fixPadding * 2.0 }}>
                        <MaterialIcons name="photo-camera" size={24} color={Colors.blackColor} />
                        <Text style={{ ...Fonts.blackColor16Medium, marginLeft: Sizes.fixPadding }}>
                            Camera
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: Sizes.fixPadding + 2.0, marginHorizontal: Sizes.fixPadding * 2.0 }}>
                        <MaterialIcons name="photo-album" size={24} color={Colors.blackColor} />
                        <Text style={{ ...Fonts.blackColor16Medium, marginLeft: Sizes.fixPadding }}>
                            Choose from gallery
                        </Text>
                    </View>
                </TouchableOpacity>
            </BottomSheet>
        )
    }

    function addCarButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.pop()}
                style={styles.addCarButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Add Car
                </Text>
            </TouchableOpacity>
        )
    }

    function selectColorInfo() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => updateState({ selectedCarColorId: item.id })}
                style={{
                    backgroundColor: item.color,
                    ...styles.displayColorStyle,
                }}>
                {
                    selectedCarColorId == item.id
                        ?
                        <MaterialIcons
                            name="check"
                            size={24}
                            color={item.color == '#ffffff' || item.color == '#FFFFFF' ? Colors.blackColor : Colors.whiteColor}
                        />
                        :
                        null
                }
            </TouchableOpacity>
        )
        return (
            <View style={{
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginTop: Sizes.fixPadding
            }}>
                <Text style={{ ...Fonts.blackColor18Bold }}>
                    Select color
                </Text>
                <FlatList
                    data={colorsList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    contentContainerStyle={{ paddingTop: Sizes.fixPadding }}
                />
            </View>
        )
    }

    function carNumberTextField() {
        return (
            <TextInput
                value={carNumber}
                onChangeText={(text) => updateState({ carNumber: text })}
                selectionColor={Colors.primaryColor}
                placeholder="Enter car number"
                style={{ ...styles.textFieldStyle, marginTop: Sizes.fixPadding * 2.0 }}
                placeholderTextColor={Colors.grayColor}
            />
        )
    }

    function carModelTextField() {
        return (
            <TextInput
                value={carModel}
                onChangeText={(text) => updateState({ carModel: text })}
                selectionColor={Colors.primaryColor}
                placeholder="Enter car model"
                style={{ ...styles.textFieldStyle, marginTop: Sizes.fixPadding * 2.0 }}
                placeholderTextColor={Colors.grayColor}
            />
        )
    }

    function carBrandNameTextField() {
        return (
            <TextInput
                value={carBrandName}
                onChangeText={(text) => updateState({ carBrandName: text })}
                selectionColor={Colors.primaryColor}
                placeholder="Enter car brand name"
                style={styles.textFieldStyle}
                placeholderTextColor={Colors.grayColor}
            />
        )
    }

    function cameraSelection() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => updateState({ showBottomSheet: true })}
                style={styles.cameraSelectionStyle}>
                <MaterialIcons name="add-a-photo" size={30} color={Colors.primaryColor} />
            </TouchableOpacity>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ ...Fonts.blackColor18Bold }}>
                    Add New Car
                </Text>
                <MaterialIcons
                    name="arrow-back"
                    size={24}
                    color={Colors.blackColor}
                    style={{ position: 'absolute', left: 20.0, }}
                    onPress={() => navigation.pop()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        height: 50.0,
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textFieldStyle: {
        ...Fonts.blackColor16Bold,
        borderColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderWidth: 1.0,
        height: 44.0,
        paddingHorizontal: Sizes.fixPadding + 5.0
    },
    displayColorStyle: {
        width: 46.0,
        height: 46.0,
        borderRadius: 23.0,
        borderColor: Colors.blackColor,
        borderWidth: 1.0,
        marginRight: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addCarButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding + 10.0,
        alignItems: 'center',
        justifyContent: 'center',
        height: 56.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 5.0,
    },
    cameraSelectionStyle: {
        width: 100.0,
        height: 100.0,
        borderRadius: 50.0,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: Sizes.fixPadding * 3.0
    },
    bottomSheetWrapStyle: {
        backgroundColor: Colors.whiteColor,
        paddingTop: Sizes.fixPadding + 2.0,
        paddingBottom: Sizes.fixPadding + 2.0,
    },
    bottomSheetDividerStyle: {
        backgroundColor: Colors.grayColor,
        height: 1.0,
        marginVertical: Sizes.fixPadding + 2.0,
    }
})

export default AddNewCarScreen;