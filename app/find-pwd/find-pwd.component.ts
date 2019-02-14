import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators} from '@angular/forms'
import {HttpClient,HttpHeaders}from '@angular/common/http'
import { Location } from '@angular/common';    

@Component({
  selector: 'app-find-pwd',
  templateUrl: './find-pwd.component.html',
  styleUrls: ['./find-pwd.component.css']
})
export class FindPwdComponent implements OnInit {

  constructor(
    public http:HttpClient,
    private location: Location,
  ) { }

  ngOnInit() {
  }

  profileForm = new FormGroup({
    id : new FormControl("",[Validators.required]),
    phonenumber: new FormControl("",[Validators.required])
  })

  onSubmit(){
    var Msg:string = JSON.stringify(this.profileForm.value)

    const httpOptions={
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }

    var api="http://localhost:8000/findpassword"

    this.http.post(api,Msg,httpOptions).subscribe((response:any)=>{ 
      console.log(response); 
      if(response.data == "存在该用户")
      {
        //从后端待会两个信息，一个是错误或者正确的信息，还有一个就是密码
        alert(response.name)
      }else{
        alert(response.data)
      }
    });
  }



  goBack(): void {
    this.location.back();
  }
}
