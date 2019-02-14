import { Component, OnInit } from '@angular/core';
import {Cartoons} from '../cartoon';
import { CARTOON } from '../mock-cartoons';
import { CartoonService } from '../cartoon.service';


@Component({
  selector: 'app-cartoons',
  templateUrl: './cartoons.component.html',
  styleUrls: ['./cartoons.component.css']
})
export class CartoonsComponent implements OnInit {

  constructor(private cartoonService:CartoonService) { }  //在这里构建实例

  ngOnInit() {
    this.getCartoon()  //会在适当的时候调用这个函数
  }
  
  //从模拟的服务端拿到数据
  cartoons : Cartoons[];

  getCartoon():void{
    this.cartoonService.getCartoons().subscribe(cartoons=>this.cartoons=cartoons)
    //这里表示的意思为：第一个cartoons表示的函数的参数，第二个cartoons就是函数中对参数的使用，里面有个函数在里面
  }

  
  

  //实现点击然后显示动漫的集体信息，但是不能更改
  selectedct:Cartoons;
  onSelect(ct:Cartoons):void{
    this.selectedct=ct;
  }

}
