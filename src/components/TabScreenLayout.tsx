import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  children: React.ReactNode;
};

export const TabScreenLayout: React.FC<Props> = ({ children }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + (Platform.OS === 'android' ? 24 : 8),
        },
      ]}>
      <Text style={styles.titleText}>Daily Story</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: '#F3F4F6',
  },
  titleText: {
    fontSize: 32,
    color: '#111827',
    marginBottom: 20,
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Pacifico' : 'Pacifico-Regular',
  },
});
