class Graph {
    constructor() {
        this.data = [];
        this.options = {
                chart: {
                    type: 'line'
                },
                title: {
                    text: '人数の遷移'
                },
                xAxis: {
                    categories: ['0','1']
                },
                yAxis: {
                    title: {
                        text: '人数 (人)'
                    }
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true
                        },
                        enableMouseTracking: false
                    }
                },
                legend: {
                    enabled: false
                },
                series: [{
                    data: this.data
                }]
            };
        this.graph = new Highcharts.chart('container', this.options);
    }
    append(n) {
        this.data.push(n);
        this.replot();
    }
    replot() {
        this.graph.destroy();
        this.graph = new Highcharts.chart('container', this.options);
    }
}

var graph = new Graph();
graph.append(10);
graph.append(100);
graph.append(100);
graph.append(1000);
graph.append(10000);
