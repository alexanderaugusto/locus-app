import 'dotenv/config'

const LOGO_IMAGE = './assets/icon.png'
const SPLASH_IMAGE = './assets/splash.png'

export default {
  expo: {
    name: 'Locus',
    slug: 'Locus',
    version: '1.0.0',
    orientation: 'portrait',
    icon: LOGO_IMAGE,
    splash: {
      image: SPLASH_IMAGE,
      resizeMode: 'cover',
      backgroundColor: '#0565FC'
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.inatel.locus',
      buildNumber: '1.0.0'
    },
    android: {
      package: 'com.inatel.locus',
      versionCode: 1,
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY
        }
      }
    },
    web: {
      favicon: LOGO_IMAGE
    },
    extra: {
      apiUrl: process.env.API_URL,
      storageUrl: process.env.STORAGE_URL,
      zipcodeApiUrl: process.env.ZIPCODE_API_URL
    }
  }
}
