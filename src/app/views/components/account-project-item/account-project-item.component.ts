import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-project-item',
  templateUrl: './account-project-item.component.html',
  styleUrls: ['./account-project-item.component.scss']
})
export class AccountProjectItemComponent implements OnInit {
  @Input() title: string = 'Project Title';
  @Input() data: Record<string, any> = {};
  @Input() id?: number;
  @Input() description: string = 'Some text to describe the project';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {}

  navigate() : void {
    this.router.navigate( [ `../first/${this.id}` ], {
      relativeTo: this.route
    } );
  }
}
