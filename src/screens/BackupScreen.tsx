import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
  Pressable,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { TabScreenLayout } from '../components/TabScreenLayout';

export const BackupScreen: React.FC = () => {
  const isFocused = useIsFocused();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isFocused) setDrawerVisible(true);
    else setDrawerVisible(false);
  }, [isFocused]);

  useEffect(() => {
    if (drawerVisible) {
      Animated.spring(slideAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [drawerVisible, slideAnim]);

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [400, 0],
  });

  const handleClose = () => setDrawerVisible(false);

  const handleExport = () => {
    // TODO: 내보내기 로직
    handleClose();
  };

  const handleImport = () => {
    // TODO: 가져오기 로직
    handleClose();
  };

  return (
    <TabScreenLayout>
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>백업</Text>
      </View>

      <Modal
        visible={drawerVisible}
        transparent
        animationType="none"
        onRequestClose={handleClose}>
        <Pressable style={styles.overlay} onPress={handleClose}>
          <Pressable onPress={e => e.stopPropagation()}>
            <Animated.View
              style={[styles.drawer, { transform: [{ translateY }] }]}>
              <View style={styles.drawerHandle} />
              <Text style={styles.drawerTitle}>백업</Text>
              <TouchableOpacity
                style={styles.drawerButton}
                onPress={handleExport}
                activeOpacity={0.7}>
                <Text style={styles.drawerButtonText}>내보내기</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.drawerButton}
                onPress={handleImport}
                activeOpacity={0.7}>
                <Text style={styles.drawerButtonText}>가져오기</Text>
              </TouchableOpacity>
            </Animated.View>
          </Pressable>
        </Pressable>
      </Modal>
    </TabScreenLayout>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 18,
    color: '#6B7280',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  drawer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 12,
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  drawerHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D1D5DB',
    alignSelf: 'center',
    marginBottom: 20,
  },
  drawerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 24,
  },
  drawerButton: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 12,
  },
  drawerButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
});
