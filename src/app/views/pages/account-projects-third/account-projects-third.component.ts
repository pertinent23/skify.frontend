import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-projects-third',
  templateUrl: './account-projects-third.component.html',
  styleUrls: ['./account-projects-third.component.scss']
})
export class AccountProjectsThirdComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {}

  prev(): void {
    this.router.navigate( [ '../second' ], {
      relativeTo: this.route
    } );
  }

}
