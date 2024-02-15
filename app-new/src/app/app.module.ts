import { CartFactory } from './common/CartFactory';
import { CheckoutFactory } from './common/CheckoutFactory';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UpgradeModule } from '@angular/upgrade/static';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, UpgradeModule],
  providers: [CartFactory, CheckoutFactory, ],
  bootstrap: [AppComponent],
})
export class AppModule {}
