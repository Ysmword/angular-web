import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators} from '@angular/forms' 
import { ActivatedRoute } from '@angular/router';
import {HttpClient,HttpHeaders}from '@angular/common/http';
import { Router } from '@angular/router'
import { Location } from '@angular/common';


@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css']
})
export class ModifyComponent implements OnInit {

  constructor(
    public activatedRoute:ActivatedRoute,
    public http:HttpClient,
    public router:Router,
    private location: Location,
    // public cartoondata:Cartoondata
  ) { }

  ngOnInit() {
    this.getData()
  }
  name:string
  author:string
  type:string
  epiosdes:string
  comment:string
  User:string
  ID:string

  getData(){
    this.activatedRoute.queryParams.subscribe(params => {
      this.name = params['name'];
      this.author = params['author'];
      this.type = params['type'];
      this.epiosdes = params['episodes'];
      this.comment = params['comment'];
      this.User = params['User'];
      this.ID = params["ID"]
    })
    console.log(this.name,this.author,this.type,this.epiosdes,this.comment)
  }




  //逻辑不能打通，就是不能将this.name的值同步到profilename中
  profileForm = new FormGroup({
    name : new FormControl("",[Validators.required]),
    author : new FormControl("",[Validators.required]),
    type : new FormControl("",[Validators.required]),
    episodes : new FormControl("",[Validators.required]),
    // comment :new FormControl("",[Validators.required]),
  })



  onSubmit(){
    console.log(this.profileForm.value)
    // var Msg:any = JSON.stringify(this.profileForm.value)  //转化为数据json字符串类型
    // console.log(Msg)

    //没办法了，就只能用这种笨的方法了
    var idData:string=JSON.stringify({"name":this.profileForm.value.name,"author":this.profileForm.value.author,"type":this.profileForm.value.type,"episodes":this.profileForm.value.episodes,"comment":this.comment,"ID":this.ID,"User":this.User})

    const httpOptions={
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }

    var api="http://localhost:8000/changedata"

    console.log(this.comment)

    this.http.post(api,idData,httpOptions).subscribe((response:any)=>{ 
      console.log(response);
      this.location.back(); 
    });
  }

  goBack(): void {
    this.location.back();
  }



}
