import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Colors, Sizes, Fonts } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import { BottomSheet } from '@rneui/themed';

const EditProfileScreen = ({ navigation }) => {
  const [state, setState] = useState({
    name: 'Jeff Graham',
    email: 'jgraham@test.com',
    password: '123456',
    phoneNumber: '1234567890',
    showBottomSheet: false,
  });

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const { name, email, password, phoneNumber, showBottomSheet } = state;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {changeProfilePhoto()}
          {nameTextField()}
          {emailTextField()}
          {phoneNumberTextField()}
          {passwordTextField()}
          {saveButton()}
        </ScrollView>
      </View>
      {changeProfileOptions()}
    </SafeAreaView>
  );

  function saveButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.pop()}
        style={styles.saveButtonStyle}
      >
        <Text style={{ ...Fonts.whiteColor18Bold }}>Save</Text>
      </TouchableOpacity>
    );
  }

  function changeProfileOptions() {
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
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: Sizes.fixPadding * 2.0,
            }}
          >
            <MaterialIcons
              name='photo-camera'
              size={24}
              color={Colors.blackColor}
            />
            <Text
              style={{
                ...Fonts.blackColor16Medium,
                marginLeft: Sizes.fixPadding,
              }}
            >
              Camera
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: Sizes.fixPadding + 2.0,
              marginHorizontal: Sizes.fixPadding * 2.0,
            }}
          >
            <MaterialIcons
              name='photo-album'
              size={24}
              color={Colors.blackColor}
            />
            <Text
              style={{
                ...Fonts.blackColor16Medium,
                marginLeft: Sizes.fixPadding,
              }}
            >
              Choose from gallery
            </Text>
          </View>
        </TouchableOpacity>
      </BottomSheet>
    );
  }

  function phoneNumberTextField() {
    return (
      <TextInput
        label='Phone Number'
        mode='outlined'
        keyboardType='numeric'
        value={phoneNumber}
        onChangeText={(text) => updateState({ phoneNumber: text })}
        style={styles.textFieldStyle}
        selectionColor={Colors.primaryColor}
        theme={{
          colors: {
            primary: Colors.primaryColor,
            underlineColor: 'transparent',
          },
        }}
      />
    );
  }

  function passwordTextField() {
    return (
      <TextInput
        label='Password'
        mode='outlined'
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => updateState({ password: text })}
        style={styles.textFieldStyle}
        selectionColor={Colors.primaryColor}
        theme={{
          colors: {
            primary: Colors.primaryColor,
            underlineColor: 'transparent',
          },
        }}
      />
    );
  }

  function emailTextField() {
    return (
      <TextInput
        label='Email'
        mode='outlined'
        value={email}
        onChangeText={(text) => updateState({ email: text })}
        style={styles.textFieldStyle}
        selectionColor={Colors.primaryColor}
        theme={{
          colors: {
            primary: Colors.primaryColor,
            underlineColor: 'transparent',
          },
        }}
      />
    );
  }

  function nameTextField() {
    return (
      <TextInput
        label='Name'
        mode='outlined'
        value={name}
        onChangeText={(text) => updateState({ name: text })}
        style={styles.textFieldStyle}
        selectionColor={Colors.primaryColor}
        theme={{
          colors: {
            primary: Colors.primaryColor,
            underlineColor: 'transparent',
          },
        }}
      />
    );
  }

  function changeProfilePhoto() {
    return (
      <View
        style={{
          alignSelf: 'center',
          marginTop: Sizes.fixPadding * 3.0,
          marginBottom: Sizes.fixPadding + 5.0,
          alignItems: 'center',
        }}
      >
        <Image
          source={require('../../assets/images/user/user_5.jpg')}
          style={{ height: 100.0, width: 100.0, borderRadius: 50.0 }}
          resizeMode='cover'
        />
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => updateState({ showBottomSheet: true })}
          style={styles.changeInfoWrapStyle}
        >
          <MaterialIcons
            name='photo-camera'
            size={15}
            color={Colors.whiteColor}
          />
          <Text
            style={{
              ...Fonts.whiteColor10Medium,
              marginLeft: Sizes.fixPadding - 5.0,
            }}
          >
            Change
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <MaterialIcons
          name='arrow-back'
          size={24}
          color={Colors.blackColor}
          onPress={() => navigation.pop()}
          style={{ position: 'absolute', left: 20.0 }}
        />
        <Text
          style={{
            ...Fonts.blackColor18Bold,
            marginLeft: Sizes.fixPadding + 5.0,
          }}
        >
          Edit Profile
        </Text>
      </View>
    );
  }
};

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
  bottomSheetWrapStyle: {
    backgroundColor: Colors.whiteColor,
    paddingTop: Sizes.fixPadding + 2.0,
    paddingBottom: Sizes.fixPadding + 2.0,
  },
  bottomSheetDividerStyle: {
    backgroundColor: Colors.grayColor,
    height: 1.0,
    marginVertical: Sizes.fixPadding + 2.0,
  },
  changeInfoWrapStyle: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: -10.0,
    backgroundColor: '#E8B656',
    borderRadius: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding + 6.0,
    paddingVertical: Sizes.fixPadding - 7.0,
    alignItems: 'center',
    borderColor: Colors.whiteColor,
    borderWidth: 1.0,
  },
  textFieldStyle: {
    ...Fonts.blackColor14Medium,
    marginHorizontal: Sizes.fixPadding * 2.0,
    backgroundColor: Colors.whiteColor,
    marginVertical: Sizes.fixPadding - 3.0,
    height: 40.0,
  },

  saveButtonStyle: {
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding + 10.0,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding * 4.0,
  },
});

export default EditProfileScreen;
