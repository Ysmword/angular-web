import { Injectable } from '@angular/core';
import {Cartoons} from './cartoon'
import { CARTOON } from './mock-cartoons';
import {Observable,of} from 'rxjs';    //可以理解我们得到的数据，不可能是同步得到的，因为这里我们使用异步的方法进行加载数据

@Injectable({
  providedIn: 'root'
})
export class CartoonService {

  constructor() { }

  //现在这里创建单个数据,因为我觉的会在后期用到
  ct:Cartoons;
  //这个提供给其他的组件访问数据,这里放回的是一个可观察的对象，到后面真正用到服务端的时候，我们就不用这样写了
  getCartoons():Observable<Cartoons[]>{
    return of(CARTOON)
  }

  //因为我们要显示一个动漫的信息，但是跳转传值传出来的值是该动漫的序号，因此我们要通过这个序号来找到具体的动漫
  getCartoon(num:number):Observable<Cartoons>{
    return of(CARTOON.find(Cartoons=>Cartoons.num===num))  //这里是为了查找于这个序号相匹配的动漫
  }
}
