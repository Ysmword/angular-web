import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpClient,HttpHeaders}from '@angular/common/http'
// import { Type } from '@angular/compiler';
import { Router } from '@angular/router'
// import {FormGroup,FormControl, Validators} from '@angular/forms'
import { Location } from '@angular/common';



@Component({
  selector: 'app-my-cartoon',
  templateUrl: './my-cartoon.component.html',
  styleUrls: ['./my-cartoon.component.css']
})
export class MyCartoonComponent implements OnInit {


  public list :any[]=[]
  constructor(
    public activatedRoute:ActivatedRoute,
    public http:HttpClient,
    public router:Router,
    private location: Location
  ) { }
  data:any    //用来接收数据，并且在上显示,这个是用户的名字
  public a:any
  search_data:any
  cartoon_name:string
  ngOnInit() {
    this.getData();
    this.getPageList();
  }



  getData(){
    //实现页面传值
    this.activatedRoute.queryParams.subscribe(params => {
      this.data = params['name'];
    });
    const httpOptions={
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    var api="http://localhost:8000/cartoon"
    this.http.post(api,{"name":this.data},httpOptions).subscribe((response:any)=>{ 
      console.log(response);
      
      //遍历对象,并且将数据放在以一个数组中
      for(const key of Object.keys(response)) {
        if(response.hasOwnProperty(key)) {
          console.log(response[key])
          this.a = response[key]
          this.list.push(this.a)    //添加数据再数组中
        }
      }
      //解析后端发来的响应，用这个来显示数据，能接收到信息，因此我只需要在这里实现数据的处理就行了,将respone为任意的数据类型，才能更好的接收
      console.log(this.list)
    });
  }


  //删除数据
  Delete(Name:string){
    console.log("删除数据"+Name)
    console.log(this.data)
    // var Data = this.data
    const httpOptions={
      headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    var api="http://localhost:8000/delete"
    this.http.post(api,{"name":Name,"cartoon_user":this.data},httpOptions).subscribe((response:any)=>{ 
      alert("删除成功，请刷新页面")
    })
    this.getData()
    // this.router.navigate(["/my-cartoon"],{queryParams:{"User":Data}})
    // window.location.reload(true)
    // this.location.load() 
  }

  //传输数据
  sendData(name:string,author:string,type:string,episodes:string,comment:string,id:string){
    this.router.navigate(["/mod"],{queryParams:{'name':name,'author':author,'type':type,"episodes":episodes,"comment":comment,"User":this.data,"ID":id}})
  }


  transfer(){
    this.router.navigate(["/add"],{queryParams:{"User":this.data}})  //传送成功
  }



  // profileForm = new FormGroup({
  //   name : new FormControl("",[Validators.required])
  // })

  onSubmit(){
    //这里我可以不用后端判断，因为这里我已经接收到了这个用户的所有信息了，因此，我可以在这里进行判断，
    //虽然前端主要是用来渲染的，但是可以分担一下后端的负担

    //利用this.list
    for (var item of this.list){
      if(item.name===this.cartoon_name){
        alert("存在这个动漫")
        this.router.navigate(["/search"],{queryParams:{"name":item.name,"author":item.author,"type":item.Type,"episodes":item.episodes,"comment":item.comment}})
        return 
      }
    }
    alert("不存在这部动漫")
  }

  sendname(){
    this.router.navigate(["/mod-user"],{queryParams:{"User":this.data}})
  }



  //这里用来分页显示的
  PageList = [];  //分页后前台显示数据
  pageNo = 1; //当前页码
  preShow = false; //上一页
  nextShow = true; //下一页
  pageSize = 10; //单页显示数
  // totalCount = 0; //总页数
  pageSizes = [0,5, 10, 15]; 
  curPage = 1; //当前页


  //为什么我一开始是空呢?这是因为tablePageList这个一开始是空的因此需要点击一次才能调用这个函数
  getPageList() {
    if (this.list.length >= 1) {
      if (this.list.length % this.pageSize === 0) {
        this.pageNo = Math.floor(this.list.length / this.pageSize);   //用来做四舍五入的
      } else {
        this.pageNo = Math.floor(this.list.length / this.pageSize) + 1;
      }
      if (this.pageNo < this.curPage) {
        this.curPage = this.curPage - 1;
      }
      if (this.pageNo === 1 || this.curPage === this.pageNo) {
        this.preShow = this.curPage !== 1;
        this.nextShow = false;
      } else {
        this.preShow = this.curPage !== 1;
        this.nextShow = true;
      }
    } else {
      this.list.length = 0;
      this.pageNo = 1;
      this.curPage = 1;
    }
    this.PageList = this.list.slice((this.curPage - 1) * this.pageSize, (this.curPage) * this.pageSize);   //切片

  }
  //点击上一页方法
  showPrePage() {
    this.curPage--;
    if (this.curPage >= 1) {
      this.getPageList();
    } else {
      this.curPage = 1;
    }
  }
//点击下一页方法
  showNextPage() {
    this.curPage++;
    if (this.curPage <= this.pageNo) {
      this.getPageList();
    } else {
      this.curPage = this.pageNo;
    }
  }
//自定义跳页方法
  onChangePage(value) {
    if (value > this.pageNo) {
      confirm('超出最大页数');
    } else if (value <= 0) {
      this.curPage = 1;
      this.getPageList();
    } else {
      this.curPage = value;
      this.getPageList();
    }
  }
  //改变每页显示方法
  onChangePageSize(value) {
    this.pageSize = value;
    this.curPage = 1;
    this.getPageList();
  }

}




