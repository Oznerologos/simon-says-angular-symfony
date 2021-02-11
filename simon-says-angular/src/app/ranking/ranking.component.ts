import { Component, ElementRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  ranks:any;

  constructor(private http: HttpClient, private elementRef : ElementRef) { }

  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#242424'
    this.http.get<any>('https://localhost:8000/score').subscribe(data => {
      this.ranks = data
      console.log(this.ranks)
    })
  }

}
