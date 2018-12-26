import { AppEnvironment } from './app-environment.model';

export const environment: AppEnvironment = {
  unsplashApiKey:
    process.env.UNSPLASH_ACCESS_KEY ||
    'Please set ENV variable UNSPLASH_ACCESS_KEY',
};
