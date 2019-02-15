import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-my-cartoon-detail',
  templateUrl: './my-cartoon-detail.component.html',
  styleUrls: ['./my-cartoon-detail.component.css']
})
export class MyCartoonDetailComponent implements OnInit {

  constructor( 
    public activatedRoute:ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getData()
  }

  name:string
  author:string
  type:string
  epiosdes:string
  comment:string

  getData(){
    this.activatedRoute.queryParams.subscribe(params => {
      this.name = params['name'];
      this.author = params['author'];
      this.type = params['type'];
      this.epiosdes = params['episodes'];
      this.comment = params['comment'];
    })
    console.log(this.name,this.author,this.type,this.epiosdes,this.comment)
  }



  goBack(): void {
    this.location.back();
  }

}
