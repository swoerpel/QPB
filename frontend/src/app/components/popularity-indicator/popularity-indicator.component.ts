import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import * as d3 from 'd3';
import { Point, Rect } from 'src/app/models/geometry.model';

@Component({
  selector: 'popularity-indicator',
  templateUrl: './popularity-indicator.component.html',
  styleUrls: ['./popularity-indicator.component.scss']
})
export class PopularityIndicatorComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() popularity: number = 0;

  private margin: number = 0;

  private barCount: number = 8;
  private barWidth: number = 2;
  private barHeight: number = 8;

  private svg;
  private width;
  private height;


  constructor(
    private viewContainerRef: ViewContainerRef,
  ) { }

  ngOnInit(): void { }
  ngOnDestroy(){
    // d3.selectAll('rect').remove()
  }
  ngAfterViewInit(){
    this.setupSvg();
    this.drawBars();
  }

  private setupSvg(){
    let container = this.viewContainerRef.element.nativeElement.getBoundingClientRect();
    this.width = container.width - (this.margin * container.width * 2);
    this.height = container.height - (this.margin * container.height * 2);
    this.svg = d3.select("figure#indicator")
      .enter()
      .append("svg")
      .attr('x',container.x)
      .attr('y',container.y)
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawBars(){
    let xOffset = (this.width - this.barCount * (this.barWidth * 2)) / 2
    let bars: Rect[] = new Array(this.barCount).fill(0).map((_,i)=>({
      x: this.barWidth * 2 * i + xOffset,//xStep * i + (xStep / 4),
      y: 0,
      width: this.barWidth,
      height: this.barHeight,
    }))
    let fillIndex = Math.floor((this.popularity / 100) * this.barCount)
    bars.forEach((b:Rect,i)=>{
        this.svg.append("rect")
          .attr("x", `${b.x}px`)
          .attr("y", `${b.y + (this.height - b.height) / 2}px`)
          .attr("width", `${b.width}px`)
          .attr("height", `${b.height}px`)
          .attr("fill",i < fillIndex ? 'var(--color-light)':'var(--color-medium)') 
    })
  }

}
