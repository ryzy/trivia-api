import { AppEnvironment } from './app-environment.model';

export const environment: AppEnvironment = {
  /** TODO: doesn't seem to have any effect when passed to enableCors() method... */
  allowOrigin: ['localhost', '*.bscode.net', '*.bsapps.net', '*.blackswan.com'],
  unsplashApiKey: process.env.UNSPLASH_ACCESS_KEY || 'Please set ENV variable UNSPLASH_ACCESS_KEY',
  googleApiKey: process.env.GOOGLE_API_KEY || 'Please set ENV variable GOOGLE_API_KEY',
};
