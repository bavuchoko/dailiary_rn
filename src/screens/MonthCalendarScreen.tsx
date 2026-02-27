import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { HomeStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<HomeStackParamList, 'MonthCalendar'>;

type DayCell = {
  key: string;
  day: number | null;
  isToday: boolean;
};

function buildMonthGrid(year: number, month: number): DayCell[] {
  const firstDay = new Date(year, month - 1, 1);
  const startWeekday = firstDay.getDay();
  const daysInMonth = new Date(year, month, 0).getDate();

  const today = new Date();

  const cells: DayCell[] = [];

  for (let i = 0; i < startWeekday; i += 1) {
    cells.push({
      key: `empty-${i}`,
      day: null,
      isToday: false,
    });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, month - 1, day);
    const isToday =
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate();

    cells.push({
      key: `day-${day}`,
      day,
      isToday,
    });
  }

  return cells;
}

export const MonthCalendarScreen: React.FC<Props> = ({
  route,
  navigation,
}) => {
  const { year, month } = route.params;

  const grid = useMemo(
    () => buildMonthGrid(year, month),
    [year, month],
  );

  const handlePressDay = (day: number | null) => {
    if (!day) {
      return;
    }

    const selected = new Date(year, month - 1, day);
    navigation.navigate('DiaryRead', {
      date: selected.toISOString(),
    });
  };

  const labels = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {year}년 {month}월
      </Text>

      <View style={styles.weekHeaderRow}>
        {labels.map(label => (
          <Text key={label} style={styles.weekHeaderText}>
            {label}
          </Text>
        ))}
      </View>

      <View style={styles.grid}>
        {grid.map(cell => {
          if (!cell.day) {
            return <View key={cell.key} style={styles.dayCellEmpty} />;
          }

          return (
            <TouchableOpacity
              key={cell.key}
              style={[
                styles.dayCell,
                cell.isToday && styles.dayCellToday,
              ]}
              onPress={() => handlePressDay(cell.day)}>
              <Text
                style={[
                  styles.dayText,
                  cell.isToday && styles.dayTextToday,
                ]}>
                {cell.day}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
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
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  weekHeaderRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 13,
    color: '#6B7280',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  dayCellEmpty: {
    width: `${100 / 7}%`,
    paddingVertical: 12,
  },
  dayCell: {
    width: `${100 / 7}%`,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
  },
  dayCellToday: {
    backgroundColor: '#111827',
  },
  dayText: {
    fontSize: 14,
    color: '#111827',
  },
  dayTextToday: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

