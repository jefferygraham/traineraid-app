import React from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import { Colors, Fonts, Sizes } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';

const BookingDetailScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 6.0 }}
        >
          {serviceProviderDetail()}
          {divider()}
          {dateAndTimeDetail()}
          {divider()}
          {servicesDetail()}
          {divider()}
          {totalAmountInfo()}
        </ScrollView>
        {cancelBookingButton()}
      </View>
    </SafeAreaView>
  );

  function cancelBookingButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.pop()}
        style={styles.cancelBookingButtonStyle}
      >
        <Text style={{ ...Fonts.whiteColor18Bold }}>Cancel Booking</Text>
      </TouchableOpacity>
    );
  }

  function totalAmountInfo() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={{ ...Fonts.blackColor18Bold }}>Total Amount</Text>
        <Text style={{ ...Fonts.primaryColor22Bold }}>$135</Text>
      </View>
    );
  }

  function servicesDetail() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
        <Text
          style={{
            ...Fonts.primaryColor18Bold,
            marginBottom: Sizes.fixPadding,
          }}
        >
          Services
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ ...Fonts.blackColor14Medium }}>Engine Detailing</Text>
          <Text style={{ ...Fonts.blackColor14Medium }}>$85</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: Sizes.fixPadding - 5.0,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ ...Fonts.blackColor14Medium }}>Body Wash</Text>
          <Text style={{ ...Fonts.blackColor14Medium }}>$50</Text>
        </View>
      </View>
    );
  }

  function dateAndTimeDetail() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
        <Text
          style={{
            ...Fonts.primaryColor18Bold,
            marginBottom: Sizes.fixPadding,
          }}
        >
          Date & Time Detail
        </Text>
        <Text style={{ ...Fonts.blackColor14Medium }}>22 Feb, 2021</Text>
        <Text
          style={{
            ...Fonts.blackColor14Regular,
            marginTop: Sizes.fixPadding - 5.0,
          }}
        >
          10:00 AM
        </Text>
      </View>
    );
  }

  function divider() {
    return (
      <View
        style={{
          backgroundColor: Colors.grayColor,
          height: 5.0,
          marginVertical: Sizes.fixPadding + 8.0,
        }}
      />
    );
  }

  function serviceProviderDetail() {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginTop: Sizes.fixPadding + 5.0,
        }}
      >
        <Text
          style={{
            ...Fonts.primaryColor18Bold,
            marginBottom: Sizes.fixPadding,
          }}
        >
          Service Provider Detail
        </Text>
        <Text style={{ ...Fonts.blackColor16Medium }}>Trainer 1</Text>
        <Text
          style={{
            ...Fonts.blackColor14Regular,
            marginTop: Sizes.fixPadding - 8.0,
          }}
        >
          104, Apple Square, New York.
        </Text>
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
          onPress={() => navigation.goBack()}
          style={{ position: 'absolute', left: 20.0 }}
        />
        <Text
          style={{
            ...Fonts.blackColor18Bold,
            marginLeft: Sizes.fixPadding + 5.0,
          }}
        >
          Booking Details
        </Text>
      </View>
    );
  }
};

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
  cancelBookingButtonStyle: {
    position: 'absolute',
    bottom: 0.0,
    left: 0.0,
    right: 0.0,
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50.0,
  },
});

export default BookingDetailScreen;
