import { AfterViewInit, Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';

import * as d3 from 'd3';
import { SpotifyApiService } from 'src/app/services/spotify-api.service';

@Component({
  selector: 'app-artist-web',
  templateUrl: './artist-web.component.html',
  styleUrls: ['./artist-web.component.scss']
})
export class ArtistWebComponent implements OnInit,AfterViewInit {

  public searchFormControl: FormControl = new FormControl('',{
    updateOn: 'blur',
  });

  private margin = 0.0;

  private majorRadius = 0.15;
  private minorRadius = 0.1;

  private circles = [
    {cx:  0.5, cy:  0.5, r: this.majorRadius},
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
  

  constructor(
    private viewContainerRef: ViewContainerRef,
    public spotifyApiService: SpotifyApiService,
  ) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(){
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
    this.drawNodes();
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

  private drawNodes(): void {
    const circles = this.circles.map((d)=>({
      cx: this.xScale(d.cx),
      cy: this.yScale(d.cy),
      r: this.xScale(d.r)
    }))
    circles.forEach((d,i)=>{

    })
    circles.forEach((d,i)=>{
      this.svg.append("ellipse")
        .attr("cx", d.cx).attr("cy", d.cy).attr("rx", d.r).attr("ry", d.r)
        .attr("fill",'var(--color-medium-light)')
      this.maskNode(i,d.cx,d.cy,d.r)
    })
  }

  private appendCircle (selection, cx,cy,r) {
    selection.append('circle')
      .attr('cx', cx)
      .attr('cy', cy)
      .attr('r', r)
  }
  
  private maskNode(i,cx,cy,r) {
    this.defs.append('clipPath')
      .attr('id', `circle-clip-${i}`)
      .call(s => this.appendCircle(s,cx,cy,r))
    this.svg.append('image')
      .attr('xlink:href', 'assets/circles-00.png')
      .attr('x', cx-r)
      .attr('y', cy-r)
      .attr('width', r*2 + 'px')
      .attr('height', r*2 + 'px')
      .attr('clip-path', `url(#circle-clip-${i})`)
  }

}
