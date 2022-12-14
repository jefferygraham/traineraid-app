import React from 'react';
import {
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Sizes, Fonts } from '../constants/styles';
import { CircleFade } from 'react-native-animated-spinkit';

const SplashScreen = ({ navigation }) => {
  setTimeout(() => {
    navigation.navigate('MainDrawer');
  }, 2000);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor='rgba(0,0,0,0)' />
      <ImageBackground
        style={{ flex: 1 }}
        source={require('../assets/images/bg.png')}
        resizeMode='contain'
      >
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          colors={['black', 'rgba(0,0.10,0,0.0)', 'rgba(0,0,0,0.0)']}
          style={styles.pageStyle}
        >
          <CircleFade
            size={56}
            color={Colors.whiteColor}
            style={{
              position: 'absolute',
              bottom: 40.0,
            }}
          />
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageStyle: {
    flex: 1,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;
