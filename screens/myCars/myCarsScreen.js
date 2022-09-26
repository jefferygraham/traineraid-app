import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, StyleSheet, Text, Image, FlatList, Dimensions, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import Dialog from "react-native-dialog";

const carsList = [
    {
        id: '1',
        image: require('../../assets/images/bmw-x7.jpg'),
        name: 'BMW X7',
        number: 'ABC 007',
    },
    {
        id: '2',
        image: require('../../assets/images/mercedes-s-class.jpg'),
        name: 'Mercedes Benz S Class',
        number: 'XYZ 007',
    }
];

const { width } = Dimensions.get('screen');

const MyCarsScreen = ({ navigation }) => {

    const [state, setState] = useState({
        isDeleteCarDialog: false,
        deleteCarId: '',
        cars: carsList,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        isDeleteCarDialog,
        deleteCarId,
        cars,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {carsInfo()}
                {addNewCarButton()}
                {deleteCarDialog()}
            </View>
        </SafeAreaView>
    )

    function deleteCarDialog() {
        return (
            <Dialog.Container
                visible={isDeleteCarDialog}
                contentStyle={styles.dialogContainerStyle}
                headerStyle={{ margin: 0.0 }}
            >
                <View style={{ backgroundColor: Colors.whiteColor, alignItems: 'center', }}>
                    <Text style={{ marginTop: Sizes.fixPadding + 5.0, ...Fonts.blackColor16Bold, paddingBottom: Sizes.fixPadding - 5.0, }}>
                        Are you sure delete this car?
                    </Text>
                    <View style={styles.cancelAndDeleteButtonWrapStyle}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => updateState({
                                isDeleteCarDialog: false,
                                deleteCarId: '',
                            })}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.blackColor14Medium }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9}
                            onPress={() => {
                                updateState({ isDeleteCarDialog: false })
                                handleDelete();
                            }}
                            style={styles.deleteButtonStyle}
                        >
                            <Text style={{ ...Fonts.whiteColor14Medium }}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog.Container>
        )
    }

    function handleDelete() {
        const newList = cars.filter((val, i) => {
            if (val.id !== deleteCarId) {
                return val;
            }
        })
        updateState({ cars: newList })
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

    function carsInfo() {
        const renderItem = ({ item }) => (
            <View style={styles.carsInfoWrapStyle}>
                <View style={{ flexDirection: "row", alignItems: 'center' }}>
                    <Image
                        source={item.image}
                        style={{ width: 80.0, height: 80.0, borderRadius: Sizes.fixPadding }}
                    />
                    <View style={{ marginLeft: Sizes.fixPadding, }}>
                        <Text style={{ ...Fonts.blackColor18Bold, width: width / 1.9, }}>
                            {item.name}
                        </Text>
                        <Text style={{ ...Fonts.grayColor16Medium, marginTop: Sizes.fixPadding }}>
                            {item.number}
                        </Text>
                    </View>
                </View>
                <MaterialIcons name="delete-forever" size={24} color={Colors.primaryColor}
                    onPress={() => updateState({ isDeleteCarDialog: true, deleteCarId: item.id })}
                />
            </View>
        )
        return (
            <View>
                <FlatList
                    data={cars}
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
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor}
                    onPress={() => navigation.goBack()}
                    style={{ position: 'absolute', left: 20.0 }}
                />
                <Text style={{ ...Fonts.blackColor18Bold, marginLeft: Sizes.fixPadding + 5.0, }}>
                    My Cars
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
    carsInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding + 5.0,
    },
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 40,
        paddingTop: -Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding * 2.0
    },
    deleteButtonStyle: {
        flex: 0.45,
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: Sizes.fixPadding + 5.0
    },
    cancelButtonStyle: {
        flex: 0.45,
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        borderColor: Colors.blackColor,
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding - 5.0,
    },
    cancelAndDeleteButtonWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding,
    }
})

export default MyCarsScreen;