import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest, HttpResponse,HttpErrorResponse}from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import {catchError,retry} from 'rxjs/operators';



export interface Config{
  cartoonUrl:string;
}

@Injectable({
  providedIn: 'root',
})

export class ConfigService {

  constructor(private http:HttpClient) { }

  configUrl = "assets/config.json"

  private handleError(error:HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      //发生客户端或网络错误。相应的处理
      console.error("An error occured:" ,error.error.message)
    }else{
      console.error(

        //从后端返回一个不成功的相应代码和反应体可能包含出问题的线索
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened;please try angain later.'
    )
    //该处理器返回一个带有用户友好错误信息的RxJS EorrorObservable对象
  }


  //configService会通过HttpClient的get()方法取得这个文件夹
  getConfig(){
    return this.http.get<Config>(this.configUrl).pipe(
      retry(3),   //重新订阅3次
      catchError(this.handleError)
    )
    //回调函数中获取一个带类型的对象，它易于使用，且消费起来更加的安全
    //这样就会得到数据，但是响应体可能不包含你需要的全部信息。有时候服务器会返回一个特殊的响应头或者状态码，已标记出特定的条件
    //添加通道传给错误的处理器
  }

  getConfigResponse():Observable<HttpResponse<Config>>{
    return this.http.get<Config>(
      this.configUrl,{observe:"response"}
      //得到的数据类型有，Config，和httpResponse
    )
  }

  //请求非json格式的数据
  // getTextFile(filename:string){
  //   return this.http.get(filename,{responseType:'text'})
  //   .pipe(
  //     tap(
  //       data = >this.log(filename,data),
  //       error = >this.logError(filename,error)
  //     )
  //   )
  // }



}