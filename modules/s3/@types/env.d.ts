declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ETHBERRY_API_KEY: string;
    }
  }
}

export {};
