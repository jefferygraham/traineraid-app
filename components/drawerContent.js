import { DrawerContentScrollView } from '@react-navigation/drawer';
import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import { Colors, Fonts, Sizes } from '../constants/styles';
import Dialog from 'react-native-dialog';
import { MaterialIcons } from '@expo/vector-icons';
import { Auth } from 'aws-amplify';

const { width } = Dimensions.get('window');

const CustomDrawer = (props) => {
  const [state, setState] = useState({ showLogoutDialog: false });

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const { showLogoutDialog } = state;

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: Colors.primaryColor,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.drawerStyle}>
          {userInfo()}
          {drawerOptions()}
          {logOutDialog()}
        </View>
      </DrawerContentScrollView>
    </View>
  );

  function drawerOptions() {
    return (
      <>
        {drawerOptionSort({
          iconName: 'home',
          option: 'Home',
          navigateTo: 'Home',
        })}
        {drawerOptionSort({
          iconName: 'security',
          option: 'My Bookings',
          navigateTo: 'MyBooking',
        })}
        {drawerOptionSort({
          iconName: 'favorite',
          option: 'Favorites',
          navigateTo: 'Favorites',
        })}

        {drawerOptionSort({
          iconName: 'email',
          option: 'Contact us',
          navigateTo: 'ContactUs',
        })}
        {drawerOptionSort({
          iconName: 'settings',
          option: 'Settings',
          navigateTo: 'Settings',
        })}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => updateState({ showLogoutDialog: true })}
          style={styles.logoutWrapStyle}
        >
          <MaterialIcons
            name='exit-to-app'
            size={24}
            color={Colors.primaryColor}
          />
          <Text
            style={{
              ...Fonts.primaryColor14Regular,
              marginLeft: Sizes.fixPadding * 2.0,
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </>
    );
  }

  function drawerOptionSort({ iconName, option, navigateTo }) {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          props.navigation.navigate(navigateTo);
        }}
        style={{ ...styles.drawerItemStyle, marginTop: Sizes.fixPadding - 5.0 }}
      >
        <MaterialIcons name={iconName} size={24} color={Colors.blackColor} />
        <Text
          style={{
            ...Fonts.blackColor14Regular,
            marginLeft: Sizes.fixPadding * 2.0,
          }}
        >
          {option}
        </Text>
      </TouchableOpacity>
    );
  }

  function userInfo() {
    return (
      <View
        style={{
          alignItems: 'center',
          marginTop: Sizes.fixPadding + 10.0,
          marginBottom: Sizes.fixPadding * 3.0,
        }}
      >
        <Image
          source={require('../assets/images/user.jpg')}
          style={{
            width: 100.0,
            height: 100.0,
            borderRadius: 50.0,
          }}
        />
        <Text
          style={{
            ...Fonts.blackColor14Regular,
            marginTop: Sizes.fixPadding,
            marginBottom: Sizes.fixPadding - 5.0,
          }}
        >
          Jeff Graham
        </Text>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            props.navigation.push('Profile');
          }}
        >
          <Text style={{ ...Fonts.grayColor12MediumItalic }}>View Profile</Text>
        </TouchableOpacity>
      </View>
    );
  }

  async function signOut() {
    try {
      await Auth.signOut({ global: true });
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  function logOutDialog() {
    return (
      <Dialog.Container
        visible={showLogoutDialog}
        contentStyle={styles.dialogStyle}
        headerStyle={{ margin: 0.0 }}
      >
        <View
          style={{ backgroundColor: Colors.whiteColor, alignItems: 'center' }}
        >
          <Text
            style={{
              marginTop: Sizes.fixPadding + 5.0,
              ...Fonts.blackColor16Bold,
              paddingBottom: Sizes.fixPadding,
            }}
          >
            Are you sure want to logout?
          </Text>
          <View style={styles.cancelAndLogoutButtonWrapStyle}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => updateState({ showLogoutDialog: false })}
              style={styles.cancelButtonStyle}
            >
              <Text style={{ ...Fonts.blackColor16Medium }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                updateState({ showLogoutDialog: false });
                signOut();
              }}
              style={styles.logOutButtonStyle}
            >
              <Text style={{ ...Fonts.whiteColor16Medium }}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Dialog.Container>
    );
  }
};

const styles = StyleSheet.create({
  cancelAndLogoutButtonWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Sizes.fixPadding,
  },
  drawerStyle: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  dialogStyle: {
    borderRadius: Sizes.fixPadding,
    width: width - 40,
    paddingTop: -Sizes.fixPadding,
    paddingBottom: Sizes.fixPadding * 2.0,
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
  logOutButtonStyle: {
    flex: 0.45,
    backgroundColor: Colors.primaryColor,
    borderRadius: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding - 5.0,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Sizes.fixPadding + 5.0,
  },
  drawerItemStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding - 5.0,
  },
  logoutWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Sizes.fixPadding + 12,
    marginTop: Sizes.fixPadding,
  },
});

export default CustomDrawer;
