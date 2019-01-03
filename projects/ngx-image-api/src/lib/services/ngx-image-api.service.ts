import { Inject, Injectable } from '@angular/core';

import { NGX_IMAGE_API_MODULE_CONFIG, NgxImageApiModuleConfig } from '../di';

@Injectable({
  providedIn: 'root',
})
export class NgxImageApiService {
  constructor(
    @Inject(NGX_IMAGE_API_MODULE_CONFIG)
    protected config: NgxImageApiModuleConfig,
  ) {}
}
