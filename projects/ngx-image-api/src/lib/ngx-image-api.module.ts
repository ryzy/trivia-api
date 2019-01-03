import { ModuleWithProviders, NgModule } from '@angular/core';

import { ImageApiView } from './components/ngx-image-api/image-api.view';
import { NGX_IMAGE_API_MODULE_CONFIG, NgxImageApiModuleConfig } from './di';

@NgModule({
  declarations: [ImageApiView],
  imports: [],
  exports: [ImageApiView],
})
export class NgxImageApiModule {

  public static forRoot(config: NgxImageApiModuleConfig): ModuleWithProviders {
    return {
      ngModule: NgxImageApiModule,
      providers: [{ provide: NGX_IMAGE_API_MODULE_CONFIG, useValue: config }],
    };
  }
}
