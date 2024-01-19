import { ReviewService } from './common/ReviewFactory';
import { OrderHistoryService } from './common/OrderHistoryFactory';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UpgradeModule } from '@angular/upgrade/static';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, UpgradeModule],
  providers: [ReviewService, OrderHistoryService, ],
  bootstrap: [AppComponent],
})
export class AppModule {}
