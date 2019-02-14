import { Component, OnInit,Input } from '@angular/core';
import {Cartoons} from '../cartoon'
import { CartoonService } from '../cartoon.service';   //因为我要调用查找的方法，因此我需要调用一个模板
import { ActivatedRoute } from '@angular/router';      //获取动态传值的方法的调用
import { Location } from '@angular/common';            //因为我想要跳转会到首页，因此我需要这个当前的地址

@Component({
  selector: 'app-cartoon-detail',
  templateUrl: './cartoon-detail.component.html',
  styleUrls: ['./cartoon-detail.component.css']
})
export class CartoonDetailComponent implements OnInit {

  constructor( private route: ActivatedRoute,
    private cartoonService: CartoonService,
    private location: Location) { }

  ngOnInit() {
    this.getCartoon()
  }

  @Input()ct:Cartoons;  //使用Input将上个组件的属性传到另一个组件

  ct1:Cartoons;

  getCartoon(): void {
    const num = +this.route.snapshot.paramMap.get('id');
    console.log(num)
    this.cartoonService.getCartoon(num)
      .subscribe(Cartoons => this.ct1=Cartoons);
      // Cartoons => this.ct1 = Cartoons  我已经得到了数据
  }

  //这里需要设置一个按钮，从而实现这个功能
  goBack(): void {
    this.location.back();
  }

}
