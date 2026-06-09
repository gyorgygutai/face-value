declare global {
  namespace NodeJS {
    interface ProcessEnv {
      INFERENCE_TOKEN: string;
      INFERENCE_ENDPOINT_ID: string;
    }
  }
}

export {}