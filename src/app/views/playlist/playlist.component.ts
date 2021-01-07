import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/models/song.model';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  public artistSongs: Song[] = [
    {
      name: 'song a',
      artist: 'chet',
    },
    {
      name: 'song b',
      artist: 'dreyfus',
    },
    {
      name: 'song c',
      artist: 'tomas',
    },
  ]

  public userSongs: Song[] = [
    {
      name: 'song 1',
      artist: 'chet',
    },
    {
      name: 'song 2',
      artist: 'dreyfus',
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
