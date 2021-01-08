import { AfterViewInit, Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as d3 from 'd3';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { Artist, ArtistRobust } from 'src/app/models/artist.model';
import { Circle } from 'src/app/models/circle.model';
import { ArtistActions } from 'src/state/artist/actions';
import { ArtistState } from 'src/state/artist/artist.reducer';
import { ArtistSelectors } from 'src/state/artist/selectors';
import { head } from 'lodash';

@Component({
  selector: 'app-artist-web',
  templateUrl: './artist-web.component.html',
  styleUrls: ['./artist-web.component.scss']
})
export class ArtistWebComponent implements OnInit,AfterViewInit, OnDestroy {

  public stuff = ['this','that','those']

  public searchFormControl: FormControl = new FormControl('');

  public autoCompleteArtists$: Observable<Artist[]>;
  public selectedArtist$: Observable<ArtistRobust>;
  public relatedArtists$: Observable<ArtistRobust[]>;

  private margin = 0.0;

  private majorRadius = 0.15;
  private minorRadius = 0.1;

  private selectedCircle: Circle = {cx:  0.5, cy:  0.5, r: this.majorRadius}

  private neighborCircles: Circle[] = [
    {cx:  0.15, cy:  0.2, r: this.minorRadius},
    {cx:  0.85, cy:  0.2, r: this.minorRadius},
    {cx:  0.15, cy:  0.8, r: this.minorRadius},
    {cx:  0.85, cy:  0.8, r: this.minorRadius},
  ];

  private svg;
  private defs;
  private width;
  private height;
  private xScale;
  private yScale;
  
  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private viewContainerRef: ViewContainerRef,
    private artistStore: Store<ArtistState>,
  ) { }

  ngOnInit(): void {
    this.setupSVG()
    this.autoCompleteArtists$ = this.artistStore.select(ArtistSelectors.GetAutoCompleteArtists)
    this.searchFormControl.valueChanges.pipe(
      tap((searchInput: any) => {
        if(!!searchInput?.id){
          this.artistStore.dispatch(ArtistActions.SetSelectedArtist({artist: searchInput}));
          this.searchFormControl.patchValue(searchInput.name, {emitEvent: false})
        }else{
          if(!!searchInput){
            this.artistStore.dispatch(ArtistActions.SearchArtist({searchText: searchInput}));
          }
        }
      }),
      takeUntil(this.unsubscribe)
    ).subscribe()
  }

  ngAfterViewInit(){
    this.artistStore.select(ArtistSelectors.GetSelectedArtist).pipe(
      filter(a=>!!a),
      map(a=>a.images),
      map(head),
      map((a:any)=>a.url),
      map(url=>this.drawSelectedArtistImage(url)),
      takeUntil(this.unsubscribe)
    ).subscribe();
    this.artistStore.select(ArtistSelectors.GetRelatedArtists).pipe(
      filter(a=>!!a),
      map((relatedArtists: ArtistRobust[])=>{
        let urls = relatedArtists.map((artist: ArtistRobust)=>head(artist.images).url)
        this.drawNeighborCircles(this.neighborCircles, urls)
      }),
      takeUntil(this.unsubscribe)
    ).subscribe();
    this.drawNeighborCircles(this.neighborCircles);
  }

  ngOnDestroy(){
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private setupSVG(){
    let container = this.viewContainerRef.element.nativeElement.getBoundingClientRect();
    this.width = container.width - (this.margin * container.width * 2);
    this.height = container.height - (this.margin * container.height * 2);
    this.xScale = d3.scaleLinear()
      .range([0, this.width])
      .domain([0,1])
    this.yScale = d3.scaleLinear()
      .domain([0,1])
      .range([this.height, 0]);
    this.createSvg();
  }

  private drawSelectedArtistImage(url: string){
    this.drawClippedImage(this.scaleCircle(this.selectedCircle),url);
  }

  private scaleCircle = (c: Circle): Circle => ({
    cx: this.xScale(c.cx),
    cy: this.yScale(c.cy),
    r: this.xScale(c.r),
  })

  private drawClippedImage = (c: Circle,url: string = 'assets/circles-00.png') => {
    this.svg.append("ellipse")
      .attr("cx", c.cx)
      .attr("cy", c.cy)
      .attr("rx", c.r)
      .attr("ry", c.r)
      .attr('stroke','black')
      .attr('stroke-width','10px')
      .attr("fill",'var(--color-medium-light)')
    this.defs.append('clipPath')
      .attr('id', `selected-circle-clip`)
      .call(s => {
        s.append('circle')
          .attr('cx', c.cx)
          .attr('cy', c.cy)
          .attr('r', c.r)
      })
    this.svg.append('image')
      .attr('xlink:href', url)
      .attr('x', c.cx - c.r)
      .attr('y', c.cy - c.r)
      .attr('width', c.r * 2 + 'px')
      .attr('height', c.r * 2 + 'px')
      .attr('clip-path', `url(#selected-circle-clip)`)
  }

  private createSvg(): void {
    this.svg = d3.select("figure#nodes")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
    this.defs = this.svg.append('defs')
  }

  private drawNeighborCircles(circles: Circle[], urls: string[] = ['assets/circles-00.png']): void {
    circles.map(this.scaleCircle).forEach((d,i)=>{
      this.svg.append("ellipse")
        .attr("cx", d.cx)
        .attr("cy", d.cy)
        .attr("rx", d.r)
        .attr("ry", d.r)
        .attr("fill",'var(--color-medium-light)')
        .attr('stroke','black')
        .attr('stroke-width','20px')
      this.defs.append('clipPath')
        .attr('id', `circle-clip-${i}`)
        .call(s => {
          s.append('circle')
            .attr('cx', d.cx)
            .attr('cy', d.cy)
            .attr('r', d.r)
        })
      this.svg.append('image')
        .attr('xlink:href', urls[i % urls.length])
        .attr('x', d.cx - d.r)
        .attr('y', d.cy - d.r)
        .attr('width', d.r * 2 + 'px')
        .attr('height', d.r * 2 + 'px')
        .attr('clip-path', `url(#circle-clip-${i})`)
    })
  }


}
