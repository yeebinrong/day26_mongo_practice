import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  country = []
  
  constructor (private apiSvc:ApiService, private router:Router) {}

  ngOnInit(): void {
    this.apiSvc.apiGetCountry()
    .then(results => {
      this.country = Object.assign([],results)
      console.info(this.country)
      this.country.splice(0, 1)
    })
  }

  gotoCountry(i:string) {
    this.router.navigate(['/country/', i])
  }
}
