import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  country = '';
  results = []
  constructor(private apiSvc:ApiService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.country = this.activatedRoute.snapshot.params.country;
    this.apiSvc.apiGetDetail(this.country)
    .then(data => {
      this.results = Object.assign([], data)
      console.info(this.results)
    })
  }

}
