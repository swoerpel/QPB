import { Component, Input, OnInit } from '@angular/core';
import { Track } from 'src/app/models/track.model';
import { last } from 'lodash';
import { msToMin } from 'src/app/shared/helpers';
@Component({
  selector: 'track-list-item',
  templateUrl: './track-list-item.component.html',
  styleUrls: ['./track-list-item.component.scss']
})
export class TrackListItemComponent implements OnInit {

  @Input() track: Track;

  public albumImageUrl: string;
  public msToMin = msToMin;

  constructor() { }

  ngOnInit(): void {
    this.albumImageUrl = last(this.track.albumImages)?.url
  }

}
