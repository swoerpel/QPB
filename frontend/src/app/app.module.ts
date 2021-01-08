import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { ArtistEffects } from 'src/state/artist/artist.effects';
import { artistReducer } from 'src/state/artist/artist.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { PlaylistEffects } from 'src/state/playlist/playlist.effects';
import { playlistReducer } from 'src/state/playlist/Playlist.reducer';
import { PlaylistBuilderComponent } from './views/playlist-builder.component';
import { ArtistComponent } from './views/artist/artist.component';
import { ArtistInfoComponent } from './views/artist/artist-info/artist-info.component';
import { ArtistWebComponent } from './views/artist/artist-web/artist-web.component';
import { PlaylistComponent } from './views/playlist/playlist.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { MaterialModule } from './material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TrackListItemComponent } from './components/track-list-item/track-list-item.component';
import { PopularityIndicatorComponent } from './components/popularity-indicator/popularity-indicator.component';
@NgModule({
  declarations: [
    AppComponent,
    PlaylistBuilderComponent,
    ArtistComponent,
    ArtistInfoComponent,
    ArtistWebComponent,
    PlaylistComponent,
    TrackListItemComponent,
    PopularityIndicatorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    StoreModule.forRoot({
      artist: artistReducer,
      playlist: playlistReducer,
      router: routerReducer
    }, {}),
    EffectsModule.forRoot([
      ArtistEffects,
      PlaylistEffects,
    ]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      name: 'ATTC',
      maxAge: 25,
    }),
    NoopAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
