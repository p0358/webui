import 'style-loader!./lineChart.scss';

import {Component, Input, OnInit, ViewChild, ElementRef} from '@angular/core';
import * as ChartistLegend from 'chartist-plugin-legend';
import filesize from 'filesize';

import {LineChartService, HandleDataFunc, LineChartData} from './lineChart.service';

@Component({selector : 'line-chart', templateUrl : './lineChart.html'})
export class LineChartComponent implements OnInit, HandleDataFunc {

  @ViewChild('chartListControl') 
  chartListControlElementRef:ElementRef;
  
  erd: any = null;
  
  @Input() dataList: any[];
  @Input() series: any;
  @Input() legends: any[];
  @Input() type: string;

  data: LineChartData = {
    labels : [],
    series : [],
  };

  controlIsInitialized = false;
  
  options: any = {
    showPoint : false,
    axisX : {
      labelInterpolationFnc : function(value, index) {
        const pad =
            (num, size) => {
              let s = num + "";
              while (s.length < size) {
                s = "0" + s;
              }
              return s;
            };
        
        // let date = String(value.getYear() + 1900) + '-' + value.getMonth() +
        // '-' + value.getDay() + ' ' + value.getHours() + ':' +
        // value.getMinutes() + ':' + value.getSeconds();
        const date = pad(value.getHours(), 2) + ':' + pad(value.getMinutes(), 2) +
                   ':' + pad(value.getSeconds(), 2);
        return index % 40 === 0 ? date : null;
      },
    },
    axisY : {},
    plugins : []
  };
  responsiveOptions = {};

  constructor(private _lineChartService: LineChartService) {}

  handleDataFunc(linechartData: LineChartData) {
      
      this.data.labels.splice(0, this.data.labels.length); 
      this.data.series.splice(0, this.data.series.length);
      
      linechartData.labels.forEach( (label) => {this.data.labels.push(label)});
      linechartData.series.forEach( (dataSeriesArray) => {this.data.series.push(dataSeriesArray)});
      
      
      if (this.series) {
        this.series.forEach((i) => { this.data.series.push(i); });
      }
    
     this.controlIsInitialized = true;
    
    setTimeout(()=>{
      this.erd.listenTo((<any>this.chartListControlElementRef).element, (element) => {
        
        setTimeout(()=>{        
            (<any>window).dispatchEvent(new Event('resize'));
          }, -1 );
      });
    }, -1);
    
      
  }
  
  
  ngOnInit() {
    
    if (window.hasOwnProperty('elementResizeDetectorMaker')) {
          this.erd = window['elementResizeDetectorMaker'].call();
    }
    
    if (this.type === 'Pie') {
      delete this.options.axisX;
      delete this.options.axisY;
      this.options.labelInterpolationFnc = function(value, index) {
        // FIXME, workaround to work with just size pie
        return filesize(value, {standard : "iec"});
      }
      
      if (this.series) {
        this.series.forEach((i) => { this.data.series.push(i); });
      }
    
     this.controlIsInitialized = true;
      
    } 
    
    if (this.legends && this.type !== 'Pie') {
      this.options.plugins.push(ChartistLegend({
        classNames : Array(this.legends.length)
                         .fill(0)
                         .map((x, i) => {return 'ct-series-' +
                                                String.fromCharCode(97 + i)}),
        legendNames : this.legends,
      }));
      
       if (this.dataList.length > 0) {
          this._lineChartService.getData(this, this.dataList);
       }
    }
   
    
  }
  
}
