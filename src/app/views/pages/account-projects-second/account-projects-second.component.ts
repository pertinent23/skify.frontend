import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-projects-second',
  templateUrl: './account-projects-second.component.html',
  styleUrls: ['./account-projects-second.component.scss']
})
export class AccountProjectsSecondComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {}

  next(): void {
    this.router.navigate( [ '../third' ], {
      relativeTo: this.route
    } );
  }

}
