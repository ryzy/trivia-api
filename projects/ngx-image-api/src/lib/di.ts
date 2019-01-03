import { InjectionToken } from '@angular/core';

/**
 * Module config
 */
export interface NgxImageApiModuleConfig {
  /**
   * API base URL, without ending /, please
   */
  apiUrl: string;
}

export const NGX_IMAGE_API_MODULE_CONFIG: InjectionToken<NgxImageApiModuleConfig> = new InjectionToken<NgxImageApiModuleConfig>(
  'NgxImageApiModuleConfig'
);
