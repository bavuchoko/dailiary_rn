/**
 * react-native-iap RN 0.84 + New Arch 호환용 패치
 * npm install 후 pod install 전에 실행: node scripts/patch-rniap-podspec.js
 */
const fs = require('fs');
const path = require('path');

const podspecPath = path.join(
  __dirname,
  '..',
  'node_modules',
  'react-native-iap',
  'RNIap.podspec'
);

if (!fs.existsSync(podspecPath)) {
  console.log('RNIap.podspec not found, skip patch');
  process.exit(0);
}

let content = fs.readFileSync(podspecPath, 'utf8');

if (content.includes('RCT-Folly')) {
  content = content.replace(
    /  # Don't install the dependencies when we run `pod install` in the old architecture.\s*\n  if ENV\['RCT_NEW_ARCH_ENABLED'\] == '1' then\s*\n[\s\S]*?s\.dependency "ReactCommon\/turbomodule\/core"\s*\n  end\s*\n/,
    '  # New Arch deps removed for RN 0.84 prebuilt compatibility.\n  # RNIap builds with React-Core only.\n'
  );
  fs.writeFileSync(podspecPath, content);
  console.log('Patched RNIap.podspec for RN 0.84');
} else {
  console.log('RNIap.podspec already patched');
}
