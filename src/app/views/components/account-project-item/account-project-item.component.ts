import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-account-project-item',
  templateUrl: './account-project-item.component.html',
  styleUrls: ['./account-project-item.component.scss']
})
export class AccountProjectItemComponent implements OnInit {
  @Input() title: string = 'Project Title';
  @Input() description: string = 'Some text to describe the project';
  constructor() { }

  ngOnInit(): void {}
}
