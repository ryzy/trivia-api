import { InjectionToken } from '@angular/core';

/**
 * Module config
 */
export interface NgxTriviaApiModuleConfig {
  /**
   * API base URL, without ending /, please
   */
  apiUrl: string;
}

export const NGX_TRIVIA_API_MODULE_CONFIG: InjectionToken<NgxTriviaApiModuleConfig> = new InjectionToken<
  NgxTriviaApiModuleConfig
>('NgxTriviaApiModuleConfig');
