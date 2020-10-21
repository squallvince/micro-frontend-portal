declare global {
  namespace NodeJS {
    interface ProcessEnv {
      mode: string
    }
  }
}

export {}