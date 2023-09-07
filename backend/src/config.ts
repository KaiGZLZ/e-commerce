export = {
    NODE_ENV: process.env.NODE_ENV ?? 'development',
    HOST: process.env.HOST ?? '127.0.0.1',
    PORT: process.env.PORT ?? 4000,
    SECRET: process.env.SECRET ?? 'secret-word',

    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PASSWORD_HOST: process.env.EMAIL_PASSWORD_HOST

  }