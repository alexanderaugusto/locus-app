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
      buildNumber: '1.0.0',
      config: {
        googleSignIn: {
          reservedClientId:
            'com.googleusercontent.apps.574394277326-e194l3uqsqtliha97prpctr77fe9d6a1'
        }
      },
      googleServicesFile: './config/GoogleService-Info.plist'
    },
    android: {
      package: 'com.inatel.locus',
      versionCode: 1,
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY
        }
      },
      googleServicesFile: './config/google-services.json'
    },
    web: {
      favicon: LOGO_IMAGE
    },
    extra: {
      apiUrl: process.env.API_URL,
      storageUrl: process.env.STORAGE_URL,
      zipcodeApiUrl: process.env.ZIPCODE_API_URL,
      googleAuthAndroidClientId: process.env.GOOGLE_AUTH_ANDROID_CLIENT_ID,
      googleAuthIosClientId: process.env.GOOGLE_AUTH_IOS_CLIENT_ID,
      positionStackApiUrl: process.env.POSITION_STACK_API_URL,
      positionStackAccessKey: process.env.POSITION_STACK_ACCESS_KEY,
      wmlApiUrl: process.env.WML_API_URL,
      wmlApikey: process.env.WML_API_KEY,
      wmlGetTokenUrl: process.env.WML_GET_TOKEN_URL,
      housingPredictorApiUrl: process.env.HOUSING_PREDICTOR_API_URL
    }
  }
}
