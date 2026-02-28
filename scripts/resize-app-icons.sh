#!/bin/bash
# 앱 아이콘 리사이즈 스크립트
# 사용법: SOURCE=경로/1024.png ./scripts/resize-app-icons.sh
# 또는: ./scripts/resize-app-icons.sh  (기본: assets/app-icon-source.png)

set -e
cd "$(dirname "$0")/.."
SOURCE="${SOURCE:-assets/app-icon-source.png}"

if [ ! -f "$SOURCE" ]; then
  echo "소스 이미지가 없습니다: $SOURCE"
  echo "scripts/generate-icon-pacifico.html 을 브라우저에서 열고 캔버스를 우클릭 → 이미지 저장"
  echo "저장한 파일을 assets/app-icon-source.png 로 두고 다시 실행하세요."
  exit 1
fi

echo "iOS 아이콘 생성..."
for size in 40 60 58 87 80 120 180 1024; do
  case $size in
    40)  name="Icon-20@2x.png" ;;
    60)  name="Icon-20@3x.png" ;;
    58)  name="Icon-29@2x.png" ;;
    87)  name="Icon-29@3x.png" ;;
    80)  name="Icon-40@2x.png" ;;
    120) name="Icon-40@3x.png" ;;
    180) name="Icon-60@3x.png" ;;
    1024) name="Icon-1024.png" ;;
    *) continue ;;
  esac
  sips -z $size $size "$SOURCE" --out "ios/dailyStory/Images.xcassets/AppIcon.appiconset/$name"
done
sips -z 120 120 "$SOURCE" --out "ios/dailyStory/Images.xcassets/AppIcon.appiconset/Icon-60@2x.png"

echo "Android 아이콘 생성..."
for d in mdpi:48 hdpi:72 xhdpi:96 xxhdpi:144 xxxhdpi:192; do
  dir="${d%%:*}"; px="${d##*:}"
  sips -z $px $px "$SOURCE" --out "android/app/src/main/res/mipmap-$dir/ic_launcher.png"
  sips -z $px $px "$SOURCE" --out "android/app/src/main/res/mipmap-$dir/ic_launcher_round.png"
done

echo "완료!"
