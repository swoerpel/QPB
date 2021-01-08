import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Track } from 'src/app/models/track.model';
import { PlaylistState } from 'src/state/playlist/Playlist.reducer';
import { PlaylistSelectors } from 'src/state/playlist/selectors';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {


  public selectedArtistTracks$: Observable<Track>;

  constructor(
    private playlistStore: Store<PlaylistState>
  ) { }

  ngOnInit(): void {
    this.selectedArtistTracks$ = this.playlistStore.select(PlaylistSelectors.GetSelectedArtistTracks)
  }

}
