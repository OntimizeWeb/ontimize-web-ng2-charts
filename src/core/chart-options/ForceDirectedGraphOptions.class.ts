import { AbstractChartOptions } from './AbstractChartOptions.class';
import {  ForceDirectedGraphConfiguration } from './ForceDirectedGraphConfiguration.class';

export class ForceDirectedGraphOptions extends AbstractChartOptions {

  public getChartType(): string {
    return 'forceDirectedGraph';
  }

  public getChartOptions(): Object {
    let params = this.chartConf as ForceDirectedGraphConfiguration;

    let chart = {
      type: this.getChartType(),
      height: params.height,
      width: params.width,
      color: this.getColor(),
      margin: params.margin.getMarginOptions(),
      linkStrenght: params.linkStrength,
      friction: params.friction,
      linkDist: params.linkDist,
      charge: params.charge,
      gravity: params.gravity,
      theta: params.theta,
      alpha: params.alpha,
      radius: params.radius
    };
    return chart;
  }

  public getColor() {
    var color = d3.scale.category20();
    return function (d) { return color(d.group); };
  }
}
