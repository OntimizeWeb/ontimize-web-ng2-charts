import { ChartConfiguration } from './ChartConfiguration.class';
import { ChartLegendConfiguration } from './ChartLegendConfiguration.class';
import { ChartMarginConfiguration } from './ChartMarginConfiguration.class';

export class MultiBarHorizontalChartConfiguration extends ChartConfiguration {
  showLegend: boolean = true;
  legend: ChartLegendConfiguration;

  showControls: boolean = true;
  showValues: boolean = true;

  margin: ChartMarginConfiguration;
  valuePadding: number = 60;
  groupSpacing: number = 0.1;
  duration: number = 500;
  stacked: boolean = false;

  showXAxis: boolean = true;
  showYAxis: boolean = false;

  colors: Array<string> = null;

  constructor() {
    super();
    this.legend = new ChartLegendConfiguration();
    this.margin = new ChartMarginConfiguration();
  }
}
