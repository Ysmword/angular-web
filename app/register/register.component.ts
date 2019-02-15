import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators} from '@angular/forms' 
import {HttpClient,HttpHeaders}from '@angular/common/http'
import { Router } from '@angular/router'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public http:HttpClient,public router:Router) { }

  ngOnInit() {
  }

  Name:string

  //用表单组的方式管理表单
  profileForm = new FormGroup({
    name : new FormControl("",[Validators.required,Validators.minLength(2)]),
    id : new FormControl("",[Validators.required,Validators.required,Validators.minLength(11),Validators.maxLength(11),Validators.pattern('[0-9]*')]),
    password : new FormControl("",[Validators.required]),
    phonenumber : new FormControl("",[Validators.required,Validators.minLength(11),Validators.maxLength(11),Validators.pattern('[0-9]*')])
  })

  get name(){ return this.profileForm.get("name")}
  get id() { return this.profileForm.get('id'); }  //做验证表单的时候，很重要
  get password() { return this.profileForm.get('password'); }
  get phonenumber(){return this.profileForm.get('phonenumber')}

  //提交数据
  onSubmit(){
    console.log(this.profileForm.value)   //查看是否能拿到值

    this.Name=this.profileForm.value.name

    console.log(this.Name)
    var Msg:string = JSON.stringify(this.profileForm.value)  //转化为数据json字符串类型
    console.log(Msg)

    //跨域请求
    const httpOptions={
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    //绑定后端
    var api="http://localhost:8000/register"

    this.http.post(api,Msg,httpOptions).subscribe((response:any)=>{ 
      console.log(response);
      if(response.data == "添加成功")
      {
        this.router.navigate(["/my-cartoon"],{queryParams:{'name':this.Name}})
      }else{
        alert(response.data)
      }
    })
  }
}
