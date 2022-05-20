import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-projects-first',
  templateUrl: './account-projects-first.component.html',
  styleUrls: ['./account-projects-first.component.scss']
})
export class AccountProjectsFirstComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {}

  next(): void {
    this.router.navigate( [ '../second' ], {
      relativeTo: this.route
    } );
  }
}
