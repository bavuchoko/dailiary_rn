import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { HomeStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<HomeStackParamList, 'YearCalendar'>;

const months = Array.from({ length: 12 }).map((_, index) => ({
  key: `${index + 1}`,
  month: index + 1,
}));

export const YearCalendarScreen: React.FC<Props> = ({ route, navigation }) => {
  const selectedDate = new Date(route.params.date);
  const year = selectedDate.getFullYear();

  const handlePressMonth = (month: number) => {
    navigation.navigate('MonthCalendar', {
      year,
      month,
      date: selectedDate.toISOString(),
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.yearText}>{year}년</Text>

      <FlatList
        data={months}
        numColumns={3}
        contentContainerStyle={styles.grid}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.monthItem}
            onPress={() => handlePressMonth(item.month)}>
            <Text style={styles.monthText}>{item.month}월</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
  },
  yearText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#DC2626',
    marginBottom: 16,
  },
  grid: {
    paddingTop: 8,
  },
  monthItem: {
    flex: 1,
    margin: 6,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthText: {
    fontSize: 16,
    color: '#111827',
  },
});

