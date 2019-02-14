import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from'@angular/forms'

import { AppComponent } from './app.component';
import { CartoonsComponent } from './cartoons/cartoons.component';
import {FormsModule} from '@angular/forms';
import { CartoonDetailComponent } from './cartoon-detail/cartoon-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component'

//引入HttpClientModule并注入
import {HttpClientModule} from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { MyCartoonComponent } from './my-cartoon/my-cartoon.component';
import { ModifyComponent } from './modify/modify.component';
import { AddcartoonComponent } from './addcartoon/addcartoon.component';
import { MyCartoonDetailComponent } from './my-cartoon-detail/my-cartoon-detail.component';
import { FindPwdComponent } from './find-pwd/find-pwd.component';


@NgModule({
  declarations: [
    AppComponent,
    CartoonsComponent,
    CartoonDetailComponent,
    LoginComponent,
    RegisterComponent,
    MyCartoonComponent,
    ModifyComponent,
    AddcartoonComponent,
    MyCartoonDetailComponent,
    FindPwdComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule     //这里表示注入
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
