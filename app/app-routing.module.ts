import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import {RouterModule,Routes} from '@angular/router'
import {CartoonsComponent} from './cartoons/cartoons.component'  //因为路由要用到这个组件
import {CartoonDetailComponent} from './cartoon-detail/cartoon-detail.component'  //因为路由需要用到这个组件
import {LoginComponent} from './login/login.component'
import {RegisterComponent} from "./register/register.component"
import {MyCartoonComponent} from "./my-cartoon/my-cartoon.component"
import {ModifyComponent} from "./modify/modify.component"
import {AddcartoonComponent} from "./addcartoon/addcartoon.component"
import {MyCartoonDetailComponent} from "./my-cartoon-detail/my-cartoon-detail.component"
import{FindPwdComponent} from "./find-pwd/find-pwd.component"
const routes:Routes=[
  //这里实现定义路由
  {path:'',redirectTo:'/cartoons',pathMatch:'full'},  //这句话表示为：当地址框没有匹配到任何的组件的地址的时候，就跳转到特定的页面
  {path:'cartoons', component : CartoonsComponent},
  {path:'detail/:id',component : CartoonDetailComponent}, //这里冒号的意思为：占位符，将来会被name所附的值所改变
  {path:'login',component:LoginComponent},  //我也引入了登录的界面的了
  {path:"register",component:RegisterComponent},
  {path:"my-cartoon",component:MyCartoonComponent},
  {path:"mod",component:ModifyComponent},
  {path:"add",component:AddcartoonComponent},
  {path:"search",component:MyCartoonDetailComponent},
  {path:"findpwd",component:FindPwdComponent}
  //因为我现在只是制作了这两个组件，到后期我还会添加查找动漫的信息组件、更改动漫信息的组件、删除数据的组件
]



@NgModule({
  // declarations: [],
  imports: [
    // CommonModule
    RouterModule.forRoot(routes)  //这里表示导出路由，routes表示为路由
  ],

  exports:[RouterModule]
})



export class AppRoutingModule { }
