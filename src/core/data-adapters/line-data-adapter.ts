import { ChartSeries, ChartDataAdapter } from '../../interfaces';
import {
  ChartConfiguration
} from '../../core';
import { LineChartConfiguration } from '../chart-options/LineChartConfiguration.class';

export class LineDataAdapter implements ChartDataAdapter {

  protected chartConf: ChartConfiguration;
  protected xAxis: string;
  protected yAxis: Array<String>;

  constructor(chartConf: ChartConfiguration) {
    if (chartConf) {
      this.chartConf = chartConf;
      this.xAxis = this.chartConf.xAxis ? this.chartConf.xAxis : '';
      let yAxis = this.chartConf.yAxis;
      this.yAxis = yAxis && yAxis.length ? yAxis : [];
    }
  }
  adaptResult(data: Array<any>): Array<ChartSeries> {
    let result: Array<ChartSeries> = [];
    let config = (this.chartConf as LineChartConfiguration);
    if (data && data.length) {
      let seriesValues = this.processSeriesValues(data);
      this.yAxis.forEach((axis: string, _index: number) => {
        let serie: ChartSeries = {
          'key': axis,
          values: []
        };
        if (config.isArea && config.isArea[_index]) {
          serie['area'] = config.isArea[_index];
        }
        if (config.colors && config.colors[_index]) {
          serie['color'] = config.colors[_index];
        }
        if (config.strokeWidth && config.strokeWidth[_index]) {
          serie['strokeWidth'] = config.strokeWidth[_index];
        }
        if (config.classed && config.classed[_index]) {
          serie['classed'] = config.classed[_index];
        }
        let key = axis;
        if (config.translateService) {
          key = config.translateService.get(key);
        }
        serie['key'] = key;

        seriesValues[axis].sort((a, b) => (a.x > b.x) ? 1 : (b.x > a.x) ? -1 : 0);

        serie['values'] = seriesValues[axis];
        result.push(serie);
      });
    }
    return result;
  }

  processSeriesValues(data: Array<any>): Object {
    let seriesValues = {};
    var self = this;
    data.forEach((item: any, _index: number) => {
      self.yAxis.forEach((axis: string, _indexAxis: number) => {
        if (seriesValues[axis] === undefined) {
          seriesValues[axis] = [];
        }
        if (item[axis] === undefined)
          return;
        let val = {
          'x': item[self.xAxis],
          'y': item[axis]
        };
        seriesValues[axis].push(val);
      });
    });
    return seriesValues;
  }
}