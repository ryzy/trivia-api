import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-image-api',
  templateUrl: './image-api.view.html',
  styleUrls: ['./image-api.view.scss'],
})
export class ImageApiView implements OnInit {
  @Input()
  public query: string;

  // public constructor(service: )

  public ngOnInit(): void {
    console.log('ImageApiView', this);
  }
}
