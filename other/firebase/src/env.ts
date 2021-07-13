declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface ProcessEnv {
      FIREBASE_API_KEY: string;
      FIREBASE_AUTH_DOMAIN: string;
      FIREBASE_DB_URL: string;
      FIREBASE_PROJECT_ID: string;
      FIREBASE_STORAGE_BUCKET: string;
      FIREBASE_MESSAGE_SENDER_ID: string;
      FIREBASE_APP_ID: string;
      FIREBASE_MEASUREMENT_ID: string;
    }
  }
}

export {};
