import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ArtistRobust } from 'src/app/models/artist.model';
import { ArtistState } from 'src/state/artist/artist.reducer';
import { ArtistSelectors } from 'src/state/artist/selectors';

@Component({
  selector: 'app-artist-info',
  templateUrl: './artist-info.component.html',
  styleUrls: ['./artist-info.component.scss']
})
export class ArtistInfoComponent implements OnInit {

  public artist$: Observable<ArtistRobust>;

  constructor(
    private artistStore: Store<ArtistState>,
  ) { }

  ngOnInit(): void {
    this.artist$ = this.artistStore.select(ArtistSelectors.GetSelectedArtist)
  }

}
