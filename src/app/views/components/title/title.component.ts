import { Component, OnInit, Input } from '@angular/core';
import { NavigationManagerService } from 'src/app/services/navigation-manager.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {
  @Input() title: string = '';
  constructor(
    private nav: NavigationManagerService
  ) { }

  ngOnInit(): void {}

  ngAfterViewInit() : void {
    this.nav.setPageTitle( this.title );
  }
}
