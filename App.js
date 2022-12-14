import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import { LogBox } from 'react-native';
import LoadingScreen from './components/loadingScreen';
import SplashScreen from './screens/splashScreen';
import homeScreen from './screens/home/homeScreen';
import serviceProviderScreen from './screens/serviceProvider/serviceProviderScreen';
import selectDateAndTimeScreen from './screens/selectDatAndTime/selectDateAndTimeScreen';
import selectPaymentMethodScreen from './screens/selectPaymentMethod/selectPaymentMethodScreen';
import profileScreen from './screens/profile/profileScreen';
import editProfileScreen from './screens/editProfile/editProfileScreen';
import myBookingScreen from './screens/myBooking/myBookingScreen';
import bookingDetailScreen from './screens/bookingDetail/bookingDetailScreen';
import rateScreen from './screens/rate/rateScreen';
import favoritesScreen from './screens/favorites/favoritesScreen';
import contactUsScreen from './screens/contactUs/contactUsScreen';
import settingsScreen from './screens/settings/settingsScreen';
import privacyPolicyScreen from './screens/privacyPolicy/privacyPolicyScreen';
import termsOfUseScreen from './screens/termsOfUse/termsOfUseScreen';
import notificationsScreen from './screens/notifications/notificationsScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './components/drawerContent';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';
import awsconfig from './src/aws-exports';

Amplify.configure(awsconfig);

LogBox.ignoreAllLogs();

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen
        name='Home'
        component={homeScreen}
        options={{ ...TransitionPresets.DefaultTransition }}
      />
    </Drawer.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <Stack.Screen name='Loading' component={LoadingScreen} />
        <Stack.Screen
          name='Splash'
          component={SplashScreen}
          options={{ ...TransitionPresets.DefaultTransition }}
        />
        <Stack.Screen
          name='MainDrawer'
          component={DrawerNavigation}
          options={{ ...TransitionPresets.DefaultTransition }}
        />
        <Stack.Screen name='MyBooking' component={myBookingScreen} />
        <Stack.Screen name='Favorites' component={favoritesScreen} />
        <Stack.Screen name='ContactUs' component={contactUsScreen} />
        <Stack.Screen name='Settings' component={settingsScreen} />
        <Stack.Screen
          name='ServiceProvider'
          component={serviceProviderScreen}
        />
        <Stack.Screen
          name='SelectDateAndTime'
          component={selectDateAndTimeScreen}
        />
        <Stack.Screen
          name='SelectPaymentMethod'
          component={selectPaymentMethodScreen}
        />
        <Stack.Screen name='Profile' component={profileScreen} />
        <Stack.Screen name='EditProfile' component={editProfileScreen} />
        <Stack.Screen name='BookingDetail' component={bookingDetailScreen} />
        <Stack.Screen name='Rate' component={rateScreen} />
        <Stack.Screen name='PrivacyPolicy' component={privacyPolicyScreen} />
        <Stack.Screen name='TermsOfUse' component={termsOfUseScreen} />
        <Stack.Screen name='Notifications' component={notificationsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default withAuthenticator(App);
