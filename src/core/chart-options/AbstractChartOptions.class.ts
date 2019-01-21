import { ChartConfiguration } from './ChartConfiguration.class';

declare var d3: any;

export class AbstractChartOptions {

  protected chartConf: ChartConfiguration;
  protected type: string;

  constructor(chartConf: ChartConfiguration) {
    this.chartConf = chartConf;
    this.init(chartConf);
  }

  public init(chartConf: ChartConfiguration): void {
    if (!chartConf) {
      console.error('Chart configuration not found!');
      return;
    }
    this.type = chartConf.type;
  }

  public getOptions(): Object {
    return {
      chart: this.getChartOptions(),
    };
  }

  protected getChartOptions(): Object {
    return {
      type: this.getChartType(),
      height: this.getChartHeight(),
      x: this.getXValue(),
      y: this.getYValue(),
      xAxis: this.getXAxisConfiguration(),
      yAxis: this.getYAxisConfiguration()
    };
  }

  protected getChartType(): string {
    return this.type + 'Chart';
  }

  protected getChartHeight(): number {
    return this.chartConf.height ? this.chartConf.height : 450;
  }

  protected getXValue(): Function {
    return d => d.x;
  }

  protected getYValue(): Function {
    return d => d.y;
  }

  protected isArea(): Function {
    return d => d.area;
  }

  protected getXAxisConfiguration(): Object {
    return {
      axisLabel: this.chartConf.xLabel ? this.chartConf.xLabel : ''
    };
  }

  protected getYAxisConfiguration(): Object {
    return {
      axisLabel: this.chartConf.yLabel ? this.chartConf.yLabel : ''
    };
  }

  protected getTickFormatter(type: string): any {
    switch (type) {
      case 'intAgrouped':
        return d => d3.format(',d')(d);
      case 'floatAgrouped':
        return d => d3.format(',.02f')(d);
      case 'int':
        return d => d3.format('d')(d);
      case 'float':
        return d => d3.format('.02f')(d);
      case 'time':
        return d => d3.time.format('%x')(new Date(d));
      case 'timeDay':
        return d => d3.time.format('%H:%M:%S')(new Date(d));
      case 'timeDetail':
        return d => d3.time.format('%x %H:%M:%S')(new Date(d));
      case 'percentage':
        return d => d3.format('.0%')(d);
      default:
        return void 0;
    }
  }

}
