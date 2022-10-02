import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  BackHandler,
  StatusBar,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Colors, Fonts, Sizes } from '../../constants/styles';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { getDrawerStatusFromState } from '@react-navigation/drawer';

const markers = [
  {
    coordinate: {
      latitude: 38.9045,
      longitude: -77.0422,
    },
    image: require('../../assets/images/service_provider/provider_1.jpg'),
    place: 'Trainer 1',
    address: '1150 18th St NW Washington, DC 20036',
    rating: '4.5',
    cost: 75,
  },
  {
    coordinate: {
      latitude: 38.91487,
      longitude: -76.98407,
    },
    image: require('../../assets/images/service_provider/provider_2.jpg'),
    place: 'Trainer 2',
    address: '1406 Okie St NE, Washington, DC 20002',
    rating: '4.5',
    cost: 75,
  },
  {
    coordinate: {
      latitude: 38.932388,
      longitude: -76.979843,
    },
    image: require('../../assets/images/service_provider/provider_3.jpg'),
    place: 'Trainer 3',
    address: '3408 18th St NE, Washington, DC 20018',
    rating: '4.5',
    cost: 75,
  },
];

const { width } = Dimensions.get('screen');

const cardWidth = width / 1.5;

const HomeScreen = ({ navigation }) => {
  var isDrawerOpen;

  const backAction = () => {
    if (isDrawerOpen) {
      navigation.closeDrawer();
      isDrawerOpen = false;
    } else {
      backClickCount == 1 ? BackHandler.exitApp() : _spring();
    }
    return true;
  };

  useFocusEffect(
    useCallback(() => {
      isDrawerOpen = getDrawerStatusFromState(navigation.getState()) === 'open';
      BackHandler.addEventListener('hardwareBackPress', backAction);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, [backAction]),
  );

  function _spring() {
    setBackClickCount(1);
    setTimeout(() => {
      setBackClickCount(0);
    }, 1000);
  }

  const [backClickCount, setBackClickCount] = useState(0);

  const [markerList] = useState(markers);
  const [region] = useState({
    latitude: 38.8851122,
    longitude: -76.9158068,
    latitudeDelta: 0.04864195044303443,
    longitudeDelta: 0.040142817690068,
  });

  let mapAnimation = new Animated.Value(0);
  let mapIndex = 0;

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / cardWidth + 0.3);
      if (index >= markerList.length) {
        index = markerList.length;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex != index) {
          mapIndex = index;
          const { coordinate } = markerList[index];
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: region.latitudeDelta,
              longitudeDelta: region.longitudeDelta,
            },
            350,
          );
        }
      }, 10);
    });
  });

  const interpolation = markerList.map((marker, index) => {
    const inputRange = [
      (index - 1) * cardWidth,
      index * cardWidth,
      (index + 1) * cardWidth,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: 'clamp',
    });

    return { scale };
  });

  const _map = React.useRef(null);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
      {header()}
      <View>
        <MapView
          ref={_map}
          initialRegion={region}
          style={{ width: '100%', height: '100%' }}
          provider={PROVIDER_GOOGLE}
        >
          {markerList.map((marker, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolation[index].scale,
                },
              ],
            };
            return (
              <MapView.Marker key={index} coordinate={marker.coordinate}>
                <Animated.View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 50.0,
                    height: 50.0,
                  }}
                >
                  <Animated.Image
                    source={require('../../assets/images/custom_marker.png')}
                    resizeMode='cover'
                    style={[styles.markerStyle, scaleStyle]}
                  ></Animated.Image>
                </Animated.View>
              </MapView.Marker>
            );
          })}
        </MapView>
        <Animated.ScrollView
          horizontal={true}
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          style={styles.nearestPlacesInfoWrapStyle}
          snapToInterval={cardWidth + 20}
          snapToAlignment='center'
          contentContainerStyle={{
            paddingLeft: Sizes.fixPadding * 5.0,
            paddingRight: Sizes.fixPadding * 2.0,
          }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: mapAnimation,
                  },
                },
              },
            ],
            { useNativeDriver: true },
          )}
        >
          {markerList.map((marker, index) => (
            <View key={index}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('ServiceProvider', { marker })}
                style={styles.nearestPlacesWrapStyle}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: Sizes.fixPadding + 7.0,
                  }}
                >
                  <Image
                    source={marker.image}
                    style={{
                      width: 51.0,
                      height: 51.0,
                      borderRadius: 25.5,
                    }}
                  />
                  <View style={{ marginLeft: Sizes.fixPadding }}>
                    <Text
                      numberOfLines={1}
                      style={{ ...Fonts.blackColor14Bold }}
                    >
                      {marker.place}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{
                        ...Fonts.grayColor12Regular,
                        marginVertical: Sizes.fixPadding - 8.0,
                      }}
                    >
                      {marker.address}
                    </Text>
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <Text style={{ ...Fonts.blackColor12Regular }}>
                        {marker.rating}
                      </Text>
                      <MaterialIcons
                        name='star'
                        size={11}
                        color={Colors.ratingColor}
                        style={{ marginLeft: Sizes.fixPadding - 5.0 }}
                      />
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <View>
                    <Text style={{ ...Fonts.grayColor12Regular }}>Cost</Text>
                    <Text style={{ ...Fonts.blackColor14Bold }}>
                      ${marker.cost}+
                    </Text>
                  </View>
                  <View style={styles.bookNowButtonStyle}>
                    <Text style={{ ...Fonts.blackColor12Regular }}>
                      Book now
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </Animated.ScrollView>
      </View>
      {backClickCount == 1 ? (
        <View style={[styles.animatedView]}>
          <Text style={{ ...Fonts.whiteColor14Medium }}>
            Press Back Once Again to Exit
          </Text>
        </View>
      ) : null}
    </SafeAreaView>
  );

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <MaterialIcons
          name='menu'
          size={24}
          color='black'
          onPress={() => {
            navigation.openDrawer();
          }}
          style={{ marginLeft: Sizes.fixPadding * 2.0 }}
        />
        <Text style={{ ...Fonts.blackColor18Bold }}>TrainerAid</Text>
        <MaterialIcons
          name='notifications'
          size={24}
          color='black'
          style={{ marginRight: Sizes.fixPadding * 2.0 }}
          onPress={() => navigation.push('Notifications')}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    backgroundColor: 'white',
    height: 50.0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  markerStyle: {
    width: 30.0,
    height: 30.0,
  },
  nearestPlacesWrapStyle: {
    backgroundColor: Colors.whiteColor,
    elevation: 1.0,
    marginHorizontal: Sizes.fixPadding,
    padding: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding,
    width: width / 1.5,
    marginBottom: Sizes.fixPadding,
  },
  bookNowButtonStyle: {
    backgroundColor: Colors.whiteColor,
    borderColor: Colors.primaryColor,
    borderWidth: 1.0,
    alignItems: 'center',
    paddingVertical: Sizes.fixPadding - 8.0,
    paddingHorizontal: Sizes.fixPadding - 2.0,
    borderRadius: Sizes.fixPadding + 10.0,
  },
  nearestPlacesInfoWrapStyle: {
    position: 'absolute',
    bottom: 60.0,
    left: 0.0,
    right: 0.0,
    paddingVertical: 10.0,
  },
  animatedView: {
    backgroundColor: '#333333',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    borderRadius: Sizes.fixPadding + 5.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
