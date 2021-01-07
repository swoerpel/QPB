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
    {cx:  0.5, cy:  0.5, r: this.majorRadius},
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
    this.drawNodes(this.circles);
  }

  private createSvg(): void {
    this.svg = d3.select("figure#nodes")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawNodes(data: any[]): void {
    this.svg.selectAll("nodes")
      .data(data)
      .enter()
      .append("ellipse")
      .attr("fill",'var(--color-medium-light)')
      .attr("cx", d => this.xScale(d.cx))
      .attr("cy", d => this.yScale(d.cy))
      .attr("rx", d => this.xScale(d.r))
      .attr("ry", d => this.xScale(d.r));
  }

}
