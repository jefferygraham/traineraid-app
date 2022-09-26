import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, StyleSheet, Text, FlatList, Dimensions, Image, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const carsList = [
    {
        id: '1',
        image: require('../../assets/images/bmw-x7.jpg'),
        name: 'BMW X7',
    },
    {
        id: '2',
        image: require('../../assets/images/mercedes-s-class.jpg'),
        name: 'Mercedes Benz S Class',
    },
];

const SelectCarScreen = ({ navigation }) => {

    const [state, setState] = useState({
        currentSelectedCarIndex: carsList[0].id,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const { currentSelectedCarIndex, } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {cars()}
                {addNewCarButton()}
                {continueButton()}
            </View>
        </SafeAreaView>
    )

    function continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('SelectDateAndTime')}
                style={styles.continueButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Continue
                </Text>
            </TouchableOpacity>
        )
    }

    function addNewCarButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('AddNewCar')}
                style={styles.addNewCarButtonStyle}>
                <Text style={{ ...Fonts.blackColor16Bold }}>
                    Add new car
                </Text>
            </TouchableOpacity>
        )
    }

    function cars() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => updateState({ currentSelectedCarIndex: item.id })}
                style={styles.carsInfoWrapStyle}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={item.image}
                        style={{ width: 70.0, height: 70.0, borderRadius: 35.0, }}
                    />
                    <Text style={{
                        maxWidth: width / 1.8,
                        ...Fonts.blackColor16Medium,
                        marginLeft: Sizes.fixPadding
                    }}>
                        {item.name}
                    </Text>
                </View>
                {
                    currentSelectedCarIndex == item.id
                        ?
                        <View style={styles.checkIconWrapStyle}>
                            <MaterialIcons name="check" size={11} color={Colors.whiteColor} />
                        </View>
                        :
                        null
                }
            </TouchableOpacity>
        )
        return (
            <View>
                <FlatList
                    data={carsList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingTop: Sizes.fixPadding + 5.0 }}
                />
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ ...Fonts.blackColor18Bold }}>
                    Select Car
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
    carsInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderColor: '#D7D7D7',
        borderWidth: 1.0,
        elevation: 3.0,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        paddingLeft: Sizes.fixPadding,
        paddingRight: Sizes.fixPadding + 5.0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding + 5.0,
    },
    checkIconWrapStyle: {
        width: 20.0,
        height: 20.0,
        borderRadius: 10.0,
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addNewCarButtonStyle: {
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.blackColor,
        borderWidth: 1.0,
        borderStyle: 'dashed',
        borderRadius: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        height: 40.0
    },
    continueButtonStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50.0
    }
})

export default SelectCarScreen;