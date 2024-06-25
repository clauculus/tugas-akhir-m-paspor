import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

const CustomCalendar = ({
  startDate,
  endDate,
  locationArray,
  monthNumber,
  onDayPress,
}) => {
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [active, setActive] = useState(null);

  console.log(locationArray);
  const isDateInRange = (date) => {
    return date >= startDate && date <= endDate;
  };

  const getQuotaForDate = (date) => {
    let quota = 0;
    let times = [];

    const filterType = "reguler"; // Adjust based on your filter type (regular, fast, etc.)
    const monthData = locationArray[filterType];

    console.log("mooo", monthData);

    const monthKey = monthNumber;
    if (monthData && monthData.length > 0) {
      monthData.forEach((monthObj) => {
        const monthKey = Object.keys(monthObj)[0];
        if (parseInt(monthKey, 10) === monthNumber) {
          console.log("bjir", monthNumber);
          monthObj[monthKey].forEach((dayObj) => {
            const dayKey = parseInt(Object.keys(dayObj)[0], 10);
            console.log("daykey", dayKey);
            console.log(date);
            if (dayKey == date) {
              console.log("kuota", dayObj[dayKey].kuota);
              quota = dayObj[dayKey].kuota;
              times = dayObj[dayKey].waktu;
              return { quota, times };
            }
          });
        }
      });
    }

    return { quota, times };
  };

  console.log(locationArray["reguler"]);

  const renderCalendarDay = (date) => {
    const isAvailable = isDateInRange(date);
    const { quota, times } = getQuotaForDate(date);

    const handleDayPress = () => {
      if (isAvailable) {
        // Alert.alert("Quota Available", `Quota: ${quota}`, [
        //   { text: "OK", onPress: () => console.log("OK Pressed") },
        // ]);
        setSelectedDate(date);
        setActive(date);
        console.log("inii", date);
        onDayPress(quota, times);
      } else {
        Alert.alert("No Quota", "There is no quota available for this date.", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
    };
    console.log(selectedDate, date, "hi", active);

    return (
      <TouchableOpacity
        style={[
          styles.calendarDay,
          date === active && styles.activeDay,
          isAvailable && quota > 0 && date !== active && styles.availableDay,
        ]}
        onPress={handleDayPress}
        disabled={quota === 0}
      >
        <Text style={styles.dayText}>{(selectedDate, date)}</Text>
        {isAvailable && <Text style={styles.quotaText}>{quota}</Text>}
      </TouchableOpacity>
    );
  };

  const generateCalendarDays = () => {
    const calendarDays = [];

    for (let date = startDate; date <= endDate; date++) {
      calendarDays.push(date);
    }

    return calendarDays;
  };

  return (
    <View style={styles.container}>
      {generateCalendarDays().map((date) => (
        <View key={date}>{renderCalendarDay(date)}</View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "pink",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  calendarDay: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  availableDay: {
    backgroundColor: "green",
  },
  activeDay: {
    backgroundColor: "blue",
  },
  dayText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  quotaText: {
    fontSize: 12,
    color: "#fff",
    marginTop: 5,
  },
});

export default CustomCalendar;
