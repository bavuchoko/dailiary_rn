import AsyncStorage from '@react-native-async-storage/async-storage';

const PAID_KEY = '@daily_story_paid';

export async function getIsPaid(): Promise<boolean> {
  try {
    const value = await AsyncStorage.getItem(PAID_KEY);
    return value === 'true';
  } catch {
    return false;
  }
}

export async function setPaid(purchased: boolean): Promise<void> {
  await AsyncStorage.setItem(PAID_KEY, purchased ? 'true' : 'false');
}
