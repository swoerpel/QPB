import { AfterViewInit, Component, OnInit, ViewContainerRef } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-artist-web',
  templateUrl: './artist-web.component.html',
  styleUrls: ['./artist-web.component.scss']
})
export class ArtistWebComponent implements OnInit,AfterViewInit {

  private margin = 0.0;

  private majorRadius = 0.15;
  private minorRadius = 0.1;

  private circles = [
    {cx:  0.5, cy:  0.5, r: this.majorRadius, img: '../../../assets/circles-00.png'},
    {cx:  0.15, cy:  0.2, r: this.minorRadius},
    {cx:  0.85, cy:  0.2, r: this.minorRadius},
    {cx:  0.15, cy:  0.8, r: this.minorRadius},
    {cx:  0.85, cy:  0.8, r: this.minorRadius},
  ];

  private svg;
  private width;
  private height;
  private xScale;
  private yScale;

  constructor(
    private viewContainerRef: ViewContainerRef,
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
  }

  private drawNodes(): void {
    this.circles.forEach((d,i)=>{

      let r = this.xScale(d.r);
      this.svg.append("ellipse")
        .attr("fill",'var(--color-medium-light)')
        .attr("cx", this.xScale(d.cx))
        .attr("cy", this.yScale(d.cy))
        .attr("rx", r)
        .attr("ry", r)
      let cx = this.xScale(d.cx);// - this.xScale(r/2);
      console.log("r",r)

      // this.svg.append('image')
      //   .attr('xlink:href', 'assets/circles-00.png')
      //   .attr("clip-path",`circle(${this.xScale(d.r/2)})`)
      //   .attr('width', this.xScale(this.minorRadius*2))
      //   .attr('height', this.xScale(this.minorRadius*2))
      //   // .attr("transform", `translate(${cx},${cx})`);
      })
  }

}
