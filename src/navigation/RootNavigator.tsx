import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import {
  createBottomTabNavigator,
  type BottomTabBarButtonProps,
} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { MainScreen } from '../screens/MainScreen';
import { DiaryReadScreen } from '../screens/DiaryReadScreen';
import { YearCalendarScreen } from '../screens/YearCalendarScreen';
import { MonthCalendarScreen } from '../screens/MonthCalendarScreen';
import { SplashScreen } from '../screens/SplashScreen';
import type { HomeStackParamList } from './types';

const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const Tab = createBottomTabNavigator();

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#F3F4F6',
  },
};

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Main"
        component={MainScreenWrapper}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="DiaryRead"
        component={DiaryReadScreen}
        options={{
          gestureEnabled: false,
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="YearCalendar"
        component={YearCalendarScreen}
        options={{ title: '연도 선택' }}
      />
      <HomeStack.Screen
        name="MonthCalendar"
        component={MonthCalendarScreen}
        options={{ title: '월 선택' }}
      />
    </HomeStack.Navigator>
  );
};

const MainScreenWrapper = ({ navigation }: { navigation: any }) => {
  return (
    <MainScreen
      onPressDiary={() => navigation.navigate('DiaryRead')}
      onPressCollection={() => {
        // 추후 모아보기 화면으로 확장 가능
      }}
    />
  );
};

const PlaceholderScreen = ({ label }: { label: string }) => (
  <View style={styles.placeholderContainer}>
    <Text style={styles.placeholderText}>{label}</Text>
  </View>
);

const TabBarItem = ({
  label,
  iconName,
  focused,
}: {
  label: string;
  iconName: string;
  focused: boolean;
}) => (
  <View style={styles.tabItem}>
    <FeatherIcon
      name={iconName}
      size={24}
      color={focused ? '#111827' : '#9CA3AF'}
      style={styles.tabIcon}
    />
    <Text
      style={[styles.tabLabel, focused && styles.tabFocusedText]}
      numberOfLines={1}
      ellipsizeMode="clip">
      {label}
    </Text>
  </View>
);

const CenterAddButton: React.FC<BottomTabBarButtonProps> = ({ onPress }) => (
  <TouchableOpacity
    style={styles.centerButton}
    activeOpacity={0.8}
    onPress={onPress}>
    <Text style={styles.centerButtonText}>+</Text>
  </TouchableOpacity>
);

export const RootNavigator = () => {
  return (
    <NavigationContainer theme={AppTheme}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: Platform.OS === 'ios' ? 92 : 82,
            paddingLeft: 15,
            paddingRight: 15,
            borderTopWidth: 0,
            backgroundColor: '#F3F4F6',
          },
          tabBarItemStyle: {
            paddingTop: 7,
            paddingBottom: 2,
          },
        }}>
        <Tab.Screen
          name="HomeTab"
          component={HomeStackNavigator}
          options={{
            title: '홈',
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <TabBarItem label="홈" iconName="home" focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="ReminderTab"
        children={() => <PlaceholderScreen label="리마" />}
          options={{
          title: '리마',
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
            <TabBarItem label="리마" iconName="bell" focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="AddTab"
          children={() => <PlaceholderScreen label="작성" />}
          options={{
            title: '',
            tabBarLabel: () => null,
            tabBarIcon: () => null,
            tabBarButton: props => <CenterAddButton {...props} />,
          }}
        />
        <Tab.Screen
          name="SearchTab"
          children={() => <PlaceholderScreen label="검색" />}
          options={{
            title: '검색',
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <TabBarItem label="검색" iconName="search" focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="StatsTab"
          children={() => <PlaceholderScreen label="통계" />}
          options={{
            title: '통계',
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <TabBarItem label="통계" iconName="bar-chart-2" focused={focused} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  placeholderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 18,
    color: '#6B7280',
  },
  centerButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
    transform: [{ translateX: 4 }],
  },
  centerButtonText: {
    fontSize: 32,
    color: '#FFFFFF',
    marginTop: -2,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 4,
    paddingHorizontal: 4,
  },
  tabIcon: {
    marginBottom: 2,
  },
  tabLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  tabFocusedText: {
    color: '#111827',
    fontWeight: '600',
  },
});

