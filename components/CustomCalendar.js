import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { colors } from "@/app/theme";

const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

const CustomCalendar = ({
  startDate,
  endDate,
  locationArray,
  monthNumber,
  startDay = 3, // 0: Sen, 1: Sel, ..., 6: Ming
  onDayPress,
}) => {
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [active, setActive] = useState(null);

  const isDateInRange = (date) => {
    return date >= startDate && date <= endDate;
  };

  const getQuotaForDate = (date) => {
    let quota = 0;
    let times = [];

    const filterType = "reguler"; // Adjust based on your filter type (regular, fast, etc.)
    const monthData = locationArray[filterType];

    const monthKey = monthNumber;
    if (monthData && monthData.length > 0) {
      monthData.forEach((monthObj) => {
        const monthKey = Object.keys(monthObj)[0];
        if (parseInt(monthKey, 10) === monthNumber) {
          monthObj[monthKey].forEach((dayObj) => {
            const dayKey = parseInt(Object.keys(dayObj)[0], 10);
            if (dayKey == date) {
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

  const renderCalendarDay = (date) => {
    const isAvailable = isDateInRange(date);
    const { quota, times } = getQuotaForDate(date);

    const handleDayPress = () => {
      if (isAvailable) {
        setSelectedDate(date);
        setActive(date);
        onDayPress(quota, times);
      } else {
        Alert.alert("No Quota", "There is no quota available for this date.", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
    };

    return (
      <TouchableOpacity
        // style={[
        //   styles.calendarDay,
        //   date === active && styles.activeDay,
        //   isAvailable && quota > 0 && date !== active && styles.availableDay,
        // ]}
        style={{
          margin: "auto",
          flexDirection: "column",
          alignItems: "center",
          height: 70,
        }}
        onPress={handleDayPress}
        disabled={quota === 0}
      >
        {isAvailable && (
          <Text style={quota != 0 ? styles.quotaText : styles.quotaTextNo}>
            {quota}
          </Text>
        )}
        <View
          style={[
            styles.calendarDay,
            date === active && styles.activeDay,
            isAvailable && quota > 0 && date !== active && styles.availableDay,
          ]}
        >
          <Text style={styles.dayText}>{date}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const generateCalendarDays = () => {
    const totalDays = endDate - startDate + 1;
    const daysArray = new Array(startDay).fill(null); // Prepend empty slots for the starting day
    // for (let i = 0; i < totalDays; i++) {
    //   daysArray.push(startDate + i);
    // }
    for (let date = startDate; date <= endDate; date++) {
      daysArray.push(date);
    }

    // Fill the remaining days to complete the final week
    while (daysArray.length % 7 !== 0) {
      daysArray.push(null);
    }

    return daysArray;

    const calendarDays = [];

    for (let date = startDate; date <= endDate; date++) {
      calendarDays.push(date);
    }

    return calendarDays;
  };

  return (
    <View style={styles.container}>
      <View style={styles.dayNamesContainer}>
        {dayNames.map((dayName, index) => (
          <Text key={index} style={styles.dayName}>
            {dayName}
          </Text>
        ))}
      </View>
      <View style={styles.daysContainer}>
        {generateCalendarDays().map((date, index) => (
          <View key={index} style={styles.dayContainer}>
            {date ? (
              renderCalendarDay(date)
            ) : (
              <View style={styles.calendarDay} />
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "pink",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  dayNamesContainer: {
    flexDirection: "row",
  },
  dayName: {
    width: 50,
    height: 50,
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "bold",
    color: colors.darkBlue,
    fontFamily: "FiraSansMedium",
  },
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  dayContainer: {
    width: "14.28%",
    alignItems: "center",
  },
  calendarDay: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 0,
    borderRadius: 8,
    // borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  availableDay: {
    backgroundColor: "#CAFFCA",
  },
  activeDay: {
    backgroundColor: "#FFBE69",
  },
  dayText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  quotaText: {
    fontFamily: "FiraSansSemiBold",
    fontSize: 14,
    color: "#0AA00A",
    marginTop: 2,
  },
  quotaTextNo: {
    fontFamily: "FiraSansSemiBold",
    fontSize: 14,
    color: "white",
    marginTop: 2,
  },
});

export default CustomCalendar;
