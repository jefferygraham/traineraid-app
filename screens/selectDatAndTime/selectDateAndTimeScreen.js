import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  StyleSheet,
  Dimensions,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Colors, Sizes, Fonts } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import CalendarStrip from 'react-native-calendar-strip';
import Dialog from 'react-native-dialog';

const { width } = Dimensions.get('window');

const slots = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
  '6:00 PM',
  '7:00 PM',
];

const SelectDateAndTimeScreen = ({ navigation }) => {
  const [state, setState] = useState({
    selectedSlot: slots[0],
    showSuccessDialog: false,
  });

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const { selectedSlot, showSuccessDialog } = state;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        {header()}
        {calender()}
        {divider()}
        {slotInfo()}
        {continueButton()}
        {successDialog()}
      </View>
    </SafeAreaView>
  );

  function successDialog() {
    return (
      <Dialog.Container
        visible={showSuccessDialog}
        contentStyle={styles.dialogWrapStyle}
        headerStyle={{ margin: 0.0 }}
      >
        <View
          style={{ backgroundColor: Colors.whiteColor, alignItems: 'center' }}
        >
          <View style={styles.successIconWrapStyle}>
            <MaterialIcons name='done' size={24} color={Colors.primaryColor} />
          </View>
          <Text
            style={{ ...Fonts.grayColor18Bold, marginTop: Sizes.fixPadding }}
          >
            Success
          </Text>
        </View>
      </Dialog.Container>
    );
  }

  function continueButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          updateState({ showSuccessDialog: true });
          setTimeout(() => {
            updateState({ showSuccessDialog: false });
            navigation.push('MainDrawer');
          }, 2000);
        }}
        style={styles.continueButtonStyle}
      >
        <Text style={{ ...Fonts.whiteColor18Bold }}>Continue</Text>
      </TouchableOpacity>
    );
  }

  function slotInfo() {
    const renderItem = ({ item, index }) => {
      return (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            updateState({ selectedSlot: item });
          }}
        >
          <View
            style={{
              backgroundColor:
                selectedSlot == item ? Colors.primaryColor : Colors.whiteColor,
              borderColor:
                selectedSlot == item ? Colors.primaryColor : '#D7D7D7',
              ...styles.slotWrapStyle,
            }}
          >
            <Text
              style={
                selectedSlot == item
                  ? { ...Fonts.whiteColor14Medium }
                  : { ...Fonts.primaryColor14Medium }
              }
            >
              {item}
            </Text>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <View>
        <Text
          style={{
            ...Fonts.blackColor16Bold,
            marginVertical: Sizes.fixPadding + 5.0,
            marginHorizontal: Sizes.fixPadding * 2.0,
          }}
        >
          {slots.length} Slots
        </Text>
        <FlatList
          data={slots}
          keyExtractor={(index) => `${index}`}
          renderItem={renderItem}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: Sizes.fixPadding * 2.0,
          }}
        />
      </View>
    );
  }

  function divider() {
    return <View style={styles.dividerStyle} />;
  }

  function calender() {
    const datesBlacklistFunc = (date) => {
      return date.isoWeekday() === 7;
    };

    return (
      <CalendarStrip
        calendarAnimation={{ type: 'sequence', duration: 30 }}
        daySelectionAnimation={{
          type: 'background',
          duration: 200,
          highlightColor: Colors.primaryColor,
        }}
        style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
        calendarHeaderStyle={{
          color: Colors.blackColor,
          marginBottom: Sizes.fixPadding + 5.0,
        }}
        calendarColor={'transparent'}
        dateNumberStyle={{ ...Fonts.blackColor18Medium }}
        dateNameStyle={{ ...Fonts.blackColor16Medium }}
        highlightDateNumberStyle={{ ...Fonts.whiteColor18Medium }}
        highlightDateNameStyle={{ ...Fonts.whiteColor16Medium }}
        scrollable={true}
        upperCaseDays={false}
        datesBlacklist={datesBlacklistFunc}
        disabledDateNameStyle={{ ...Fonts.grayColor14Medium }}
        disabledDateNumberStyle={{ ...Fonts.grayColor14Medium }}
        useIsoWeekday={false}
      />
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
          Select date & time
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
  slotWrapStyle: {
    alignItems: 'center',
    borderRadius: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding * 2.0,
    justifyContent: 'center',
    borderWidth: 1.0,
    elevation: 3.0,
    marginRight: Sizes.fixPadding * 2.0,
    height: 30.0,
    minWidth: width / 3.9,
    flex: 1,
  },
  dividerStyle: {
    backgroundColor: Colors.grayColor,
    height: 1.0,
    marginVertical: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  continueButtonStyle: {
    position: 'absolute',
    bottom: 0.0,
    left: 0.0,
    right: 0.0,
    backgroundColor: Colors.primaryColor,
    height: 50.0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SelectDateAndTimeScreen;
