import { CategoryFactory } from './common/CategoryFactory';
import { ProductFactory } from './common/ProductFactory';
import { AuthService } from './common/Socket';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UpgradeModule } from '@angular/upgrade/static';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, UpgradeModule],
  providers: [CategoryFactory, ProductFactory, AuthService, ],
  bootstrap: [AppComponent],
})
export class AppModule {}
