# 유료 결제(광고 제거) 처리 가이드

## 구현 상태

- **광고 제거 구매**: `react-native-iap`으로 인앱 결제 요청 → 결제 완료 시 `setPaid(true)` 호출되어 광고 제거.
- **구매 복원**: `getAvailablePurchases()`로 스토어 구매 내역 조회 후, `remove_ads` 상품이 있으면 `setPaid(true)` 적용.
- **도구 탭**: 「광고 제거 구매」「구매 복원」 버튼과 현재 유료 여부 표시.

## 상품 ID

- 앱에서 사용하는 상품 ID: **`remove_ads`** (`src/config/iap.ts`)
- iOS·Android 스토어에 **동일 ID**로 인앱 상품을 등록해야 합니다.

## 스토어 설정

### iOS (App Store Connect)

1. 앱 → 인앱 구입 → 상품 생성
2. 유형: **비소모성** (Non-Consumable)
3. 상품 ID: **`remove_ads`**
4. 가격 등록 후 제출

### Android (Google Play Console)

1. 앱 → 수익 창출 → 제품 → 인앱 상품
2. 상품 ID: **`remove_ads`**
3. 가격 등록 후 활성화

## 동작 요약

| 기능 | 동작 |
|------|------|
| 광고 제거 구매 | 스토어 결제 UI 표시 → 결제 성공 시 자동으로 `setPaid(true)` 후 광고 제거 |
| 구매 복원 | 스토어에 저장된 구매 내역 조회 → `remove_ads` 있으면 `setPaid(true)` |
| IAP 미연결 시 | (라이브러리 오류 등) 구매 버튼 시 테스트용으로 `setPaid(true)` 호출 |

## 관련 파일

- `src/services/purchaseService.ts` — 구매/복원 로직, IAP 연동
- `src/services/paidStorage.ts` — 유료 여부 저장/조회
- `src/config/iap.ts` — 상품 ID 상수
- `src/screens/ToolsScreen.tsx` — 도구 탭 UI
