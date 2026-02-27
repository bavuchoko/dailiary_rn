import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  onPressDiary: () => void;
  onPressCollection: () => void;
};

type WeekDay = {
  key: string;
  label: string;
  date: number;
  isToday: boolean;
};

function getStartOfWeek(date: Date) {
  const d = new Date(date);
  const day = d.getDay(); // 0 (일) - 6 (토)
  const diff = d.getDate() - day;
  return new Date(d.getFullYear(), d.getMonth(), diff);
}

function buildWeek(date: Date): WeekDay[] {
  const today = new Date();
  const start = getStartOfWeek(date);
  const labels = ['일', '월', '화', '수', '목', '금', '토'];

  return Array.from({ length: 7 }).map((_, index) => {
    const current = new Date(
      start.getFullYear(),
      start.getMonth(),
      start.getDate() + index,
    );

    const isToday =
      current.getFullYear() === today.getFullYear() &&
      current.getMonth() === today.getMonth() &&
      current.getDate() === today.getDate();

    return {
      key: `${current.toISOString()}`,
      label: labels[current.getDay()],
      date: current.getDate(),
      isToday,
    };
  });
}

export const MainScreen: React.FC<Props> = ({
  onPressDiary,
  onPressCollection,
}) => {
  const today = new Date();
  const week = buildWeek(today);
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <View style={styles.weekContainer}>
        <FlatList
          data={week}
          horizontal
          keyExtractor={item => item.key}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View
              style={[
                styles.weekItem,
                item.isToday && styles.weekItemTodayContainer,
              ]}>
              <Text
                style={[
                  styles.weekDayLabel,
                  item.isToday && styles.weekItemTodayText,
                ]}>
                {item.label}
              </Text>
              <Text
                style={[
                  styles.weekDayNumber,
                  item.isToday && styles.weekItemTodayText,
                ]}>
                {item.date}
              </Text>
            </View>
          )}
        />
      </View>

      <View style={styles.cardRow}>
        <TouchableOpacity style={styles.card} onPress={onPressDiary}>
          <Text style={styles.cardTitle}>일기장</Text>
          <Text style={styles.cardSubtitle}>오늘의 일기를 확인해요</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={onPressCollection}>
          <Text style={styles.cardTitle}>모아보기</Text>
          <Text style={styles.cardSubtitle}>지난 일기를 모아봐요</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  weekContainer: {
    marginBottom: 32,
  },
  weekItem: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  weekItemTodayContainer: {
    backgroundColor: '#111827',
  },
  weekItemTodayText: {
    color: 'white',
    fontWeight: '600',
  },
  weekDayLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  weekDayNumber: {
    fontSize: 16,
    color: '#111827',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 28,
    paddingHorizontal: 20,
    height:250,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#6B7280',
  },
});

