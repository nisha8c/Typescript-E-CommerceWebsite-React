declare global {
    namespace NodeJS {
      interface ProcessEnv {
        MONGODB_URL: string;
      }
    }
  }
  export {};