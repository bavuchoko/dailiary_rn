import { Platform } from 'react-native';
import { setPaid, getIsPaid } from './paidStorage';
import { IAP_PRODUCT_ID_REMOVE_ADS } from '../config/iap';

type PurchaseResult = { success: boolean; message?: string };
type RestoreResult = { success: boolean; restored: boolean; message?: string };

let iapReady = false;
let purchaseResolve: ((r: PurchaseResult) => void) | null = null;

async function ensureIapConnection(): Promise<boolean> {
  if (iapReady) return true;
  try {
    const RNIap = await import('react-native-iap');
    await RNIap.initConnection();
    iapReady = true;

    RNIap.purchaseUpdatedListener?.((purchase: { productId?: string; productIdentifier?: string }) => {
      const id = purchase.productId ?? purchase.productIdentifier ?? '';
      if (id === IAP_PRODUCT_ID_REMOVE_ADS) {
        setPaid(true).then(() => {
          purchaseResolve?.({ success: true });
          purchaseResolve = null;
        });
        RNIap.finishTransaction?.({ purchase, isConsumable: false }).catch(() => {});
      }
    });

    RNIap.purchaseErrorListener?.((error: { code?: string; message?: string }) => {
      if (error.code !== 'E_USER_CANCELLED') {
        purchaseResolve?.({ success: false, message: error.message ?? '결제에 실패했습니다.' });
      }
      purchaseResolve = null;
    });
    return true;
  } catch {
    return false;
  }
}

/**
 * 광고 제거 유료 구매 (인앱 결제)
 */
export async function purchaseAdRemoval(): Promise<PurchaseResult> {
  try {
    const connected = await ensureIapConnection();
    if (!connected) {
      return { success: false, message: '인앱 결제를 초기화할 수 없습니다.' };
    }

    const RNIap = await import('react-native-iap');
    const productId = IAP_PRODUCT_ID_REMOVE_ADS;

    return await new Promise<PurchaseResult>((resolve) => {
      purchaseResolve = resolve;
      const req =
        Platform.OS === 'ios'
          ? (RNIap as any).requestPurchase({ sku: productId })
          : (RNIap as any).requestPurchase({ skus: [productId] });
      Promise.resolve(req).catch((e: Error) => {
        purchaseResolve = null;
        resolve({ success: false, message: e.message ?? '결제 요청에 실패했습니다.' });
      });
    });
  } catch (e) {
    return { success: false, message: (e as Error).message };
  }
}

/**
 * 구매 복원 (재설치·기기 변경 시 스토어에서 구매 내역 조회)
 */
export async function restorePurchases(): Promise<RestoreResult> {
  try {
    const connected = await ensureIapConnection();
    if (!connected) {
      const already = await getIsPaid();
      return { success: true, restored: already };
    }

    const RNIap = await import('react-native-iap');
    const purchases = await RNIap.getAvailablePurchases();
    const hasRemoveAds = purchases?.some(
      (p: { productId?: string; productIdentifier?: string }) =>
        (p.productId ?? p.productIdentifier) === IAP_PRODUCT_ID_REMOVE_ADS,
    );
    if (hasRemoveAds) {
      await setPaid(true);
      return { success: true, restored: true };
    }
    return { success: true, restored: false };
  } catch (e) {
    return { success: false, restored: false, message: (e as Error).message };
  }
}

/** 앱 시작 시 호출해 두면 구매 완료 리스너가 등록됩니다. */
export function initIapIfAvailable(): void {
  ensureIapConnection().then(() => {});
}

export { getIsPaid } from './paidStorage';
