class Graph {
    constructor() {
        this.data = [1000,10000];
        this.options = {
            chart: {
                type: 'line'
            },
            title: {
                text: '人数の遷移'
            },
            xAxis: {
                categories: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '110']
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
    }
    plot() {
        this.graph.destroy();
        this.graph = new Highcharts.chart('container', this.options);
    }
}

graph = new Graph();

graph.append(10);
graph.append(100);
graph.plot();
