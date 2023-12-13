import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import * as angular from 'angular';
import { AppModule } from './app/app.module';
import { UpgradeModule, setAngularJSGlobal } from '@angular/upgrade/static';

setAngularJSGlobal(angular);

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then((platformRef) => {
    console.log('Angular Bootstrap!');
    const upgrade = platformRef.injector.get(UpgradeModule) as UpgradeModule;
    upgrade.bootstrap(document.body, ['FullstackGeneratedApp'], {
      strictDi: false,
    });
    console.log('Angular Module Bootstraped!');
  });
