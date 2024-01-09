import { DreamsFactory } from './common/DreamsFactory';
import { SecretStashService } from './common/SecretStash';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UpgradeModule } from '@angular/upgrade/static';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, UpgradeModule],
  providers: [DreamsFactory, SecretStashService, ],
  bootstrap: [AppComponent],
})
export class AppModule {}
