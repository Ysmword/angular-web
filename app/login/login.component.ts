import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators} from '@angular/forms'    //因为这里我想要使用分组，方便我以后的扩展
import {HttpClient,HttpHeaders}from '@angular/common/http'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  
  constructor(
    public http:HttpClient,
    public router:Router
  ) { }



  ngOnInit() {
  }

  //在这里是在使用数据库里面的值来验证：账号名是否相同，我这里只是创建一个虚假的数据进行验证
  //创建分组的控件

  id:string;

  profileForm = new FormGroup({
    id : new FormControl("",[Validators.required,Validators.minLength(3)]),
    password: new FormControl("",[Validators.required])
  })

  ///这里可以证明通登录可以拿到值，原理为
  onSubmit(){
    console.log(this.profileForm.value)
    var Msg:string = JSON.stringify(this.profileForm.value)  //转化为数据json字符串类型
    console.log(Msg)

    const httpOptions={
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }

    var api="http://localhost:8000/login"

    this.http.post(api,Msg,httpOptions).subscribe((response:any)=>{ 
      console.log(response); 
      //解析后端发来的响应，用这个来显示数据，能接收到信息，因此我只需要在这里实现数据的处理就行了,将respone为任意的数据类型，才能更好的接收
      if(response.data == "存在该用户")
      {
        this.router.navigate(["/my-cartoon"],{queryParams:{'name':response.name}})
      }else{
        alert(response.data)
      }
    });
  }
}
