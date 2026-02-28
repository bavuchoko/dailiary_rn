import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { launchImageLibrary } from 'react-native-image-picker';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../navigation/types';
import { TagIcon } from '../components/icons/TagIcon';
import { TextSizeIcon } from '../components/icons/TextSizeIcon';
import { PhotoIcon } from '../components/icons/PhotoIcon';
import { CircleXIcon } from '../components/icons/CircleXIcon';
import {
  addEntry,
  updateEntry,
  getDateString,
  getEntryById,
} from '../services/diaryStorage';

type Props = NativeStackScreenProps<RootStackParamList, 'DiaryWrite'>;

type ImageAsset = { uri: string };

export const DiaryWriteScreen: React.FC<Props> = ({ navigation, route }) => {
  const entryId = route.params?.entryId;
  const [text, setText] = useState('');
  const [images, setImages] = useState<ImageAsset[]>([]);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(!entryId);

  const saveDate =
    route.params?.date ?? getDateString(new Date());

  useEffect(() => {
    if (!entryId) {
      setLoaded(true);
      return;
    }
    getEntryById(entryId).then(entry => {
      if (entry) {
        setText(entry.text);
        setImages(entry.imageUris.map(uri => ({ uri })));
      }
      setLoaded(true);
    });
  }, [entryId]);

  const handlePickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 5,
        includeBase64: false,
      },
      res => {
        if (res.didCancel) return;
        if (res.errorCode) return;
        const assets = res.assets?.filter(a => a.uri) ?? [];
        if (assets.length) {
          setImages(prev => [
            ...prev,
            ...assets.map(a => ({ uri: a.uri! })),
          ].slice(0, 10));
        }
      },
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.topButton}>
            <Text style={styles.backText}>{'< back'}</Text>
          </TouchableOpacity>

          <Text style={styles.title}>일기 쓰기</Text>

          <TouchableOpacity
            onPress={async () => {
              if (saving || !loaded) return;
              setSaving(true);
              try {
                if (entryId) {
                  await updateEntry(entryId, {
                    text,
                    imageUris: images.map(i => i.uri),
                  });
                } else {
                  await addEntry({
                    date: saveDate,
                    text,
                    imageUris: images.map(i => i.uri),
                  });
                }
                navigation.goBack();
              } finally {
                setSaving(false);
              }
            }}
            style={styles.saveButton}
            disabled={saving || !loaded}>
            <Text style={styles.saveText}>
              {saving ? '저장 중...' : '저장'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.body}>
          {images.length > 0 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.imageList}
              contentContainerStyle={styles.imageListContent}>
              {images.map((img, index) => (
                <View key={`${img.uri}-${index}`} style={styles.imageWrap}>
                  <Image source={{ uri: img.uri }} style={styles.thumb} />
                  <TouchableOpacity
                    style={styles.removeImage}
                    onPress={() =>
                      setImages(prev => prev.filter((_, i) => i !== index))
                    }>
                    <CircleXIcon size={16} color="#FFF" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="내용을 입력하세요..."
            placeholderTextColor="#9CA3AF"
            style={styles.input}
            multiline
            textAlignVertical="top"
          />
        </View>

        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.toolButton}>
            <TagIcon size={22} color="#4f5052" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolButton}>
            <TextSizeIcon size={22} color="#4f5052" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolButton} onPress={handlePickImage}>
            <PhotoIcon size={22} color="#4f5052" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolButton}>
            <FeatherIcon name="video" size={22} color="#4f5052" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolButton}>
            <FeatherIcon name="mic" size={22} color="#111827" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topBar: {
    height: 52,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topButton: {
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  backText: {
    fontSize: 14,
    color: '#6B7280',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  saveButton: {
    minWidth: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  saveText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6B7280',
  },
  body: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  imageList: {
    maxHeight: 100,
    marginBottom: 12,
  },
  imageListContent: {
    paddingRight: 8,
  },
  imageWrap: {
    position: 'relative',
    marginRight: 8,
  },
  thumb: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  removeImage: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  bottomBar: {
    height: 56,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
  },
  toolButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

