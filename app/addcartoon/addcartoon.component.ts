import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators} from '@angular/forms' 
import { ActivatedRoute } from '@angular/router';
import {HttpClient,HttpHeaders}from '@angular/common/http';
import { Router } from '@angular/router'
import { Location } from '@angular/common';



@Component({
  selector: 'app-addcartoon',
  templateUrl: './addcartoon.component.html',
  styleUrls: ['./addcartoon.component.css']
})
export class AddcartoonComponent implements OnInit {

  constructor(
    public activatedRoute:ActivatedRoute,
    public http:HttpClient,
    public router:Router,
    private location: Location,
  ) { }

  ngOnInit() {
    this.getData()
  }

  User:string  //用来接收用户信息
  comment:string   //用来收集用户的评论的
  getData(){
    this.activatedRoute.queryParams.subscribe(params => {
      this.User = params['User'];
    })
    console.log(this.User)
  }

  //制作表格
  profileForm = new FormGroup({
    name : new FormControl("",[Validators.required]),
    author : new FormControl("",[Validators.required]),
    type : new FormControl("",[Validators.required]),
    episodes : new FormControl("",[Validators.required]),
    // comment :new FormControl("",[Validators.required]),
  })


  onSubmit(){
    console.log(this.profileForm.value)

    //真是没办法了
    var idData:string=JSON.stringify({"name":this.profileForm.value.name,"author":this.profileForm.value.author,"type":this.profileForm.value.type,"episodes":this.profileForm.value.episodes,"comment":this.comment,"User":this.User})

    //添加请求头
    const httpOptions={
      headers:new HttpHeaders({"Content-Type":"application/json"})
    }


    var api="http://localhost:8000/addct"

    this.http.post(api,idData,httpOptions).subscribe((response:any)=>{
      
      if (response.data=="添加成功"){
        alert(response.data); 
        this.location.back();
      }

      if(response.data=="已存在这部动漫"){
        alert(response.data);
      }

      if (response.data=="系统出现错误"){
        alert(response.data);
      }
    });
  }


  goBack(): void {
    this.location.back();
  }

}
