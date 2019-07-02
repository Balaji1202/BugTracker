if(typeof ChartLabel !== "function") {
    class ChartLabel {
        
        constructor(chartInstance) {
            this.devsAndBugs = chartInstance.devAndBugData;
            this.devLabel = chartInstance.devLabel;
            this.bugLabel = chartInstance.bugLabel;
            this.loadNext = chartInstance.loadNext;
            this.loadPrevious = chartInstance.loadPrevious;
            this.chartObj = chartInstance.chartObj;
            this.chart = chartInstance.chart;
            this.typeOfChart = chartInstance.typeOfChart;
            this.label = chartInstance.label;
            this.backgroundColor = chartInstance.backgroundColor;
            this.borderColor = chartInstance.borderColor;
            this.data = chartInstance.data;
            this.colField = chartInstance.colField;
            this.rowField = chartInstance.rowField;
            this.loadIndex = chartInstance.loadIndex;
            this.count = chartInstance.count;
            this.display = chartInstance.display;
        }

        init() {
            if(this.count < this.devsAndBugs.length)
            {
                this.loadNext.addEventListener('click', this.loadNextHandler.bind(this));

                this.loadPrevious.addEventListener('click', this.loadPreviousHandler.bind(this));
            }
                this.chartObj = this.loadLabels();
        }
        
        loadNextHandler() {
            if(this.loadIndex + this.count <= 1000) {
                this.loadIndex += this.count;
                this.refreshBuffer();
                this.chartObj = this.loadLabels();
            }
        }

        loadPreviousHandler() {
            if(this.loadIndex - this.count >= 0) {
                this.loadIndex -= this.count;
                this.refreshBuffer();
                this.chartObj = this.loadLabels();
            }
        }

        refreshBuffer() {
            this.devLabel = [];
            this.bugLabel = [];
            // this.chartObj.destroy();
        }

        loadLabels() {

            for (let i=this.loadIndex; i<this.loadIndex+this.count; i++) {
                this.devLabel.push(this.devsAndBugs[i][this.rowField]);
                this.bugLabel.push(this.devsAndBugs[i][this.colField]);
            }
            var ctx = this.chart.getContext('2d');
            this.chartObj = new Chart(ctx, {
                type: this.typeOfChart,
                data: {
                    labels: this.devLabel,
                    datasets: [{
                        label: this.label,
                        backgroundColor: this.backgroundColor,
                        borderColor: this.borderColor,
                        data: this.bugLabel,
                    }]
                },
                options: {
                    legend:{
                        display: this.display,
                    },
                },
            });
            return this.chartObj;
        }
    };

    var chartInstance = {
        devAndBugData: devAndBugData,
        devLabel: [],
        bugLabel: [],
        loadNext: document.getElementById("loadNext1"), 
        loadPrevious: document.getElementById("loadPrevious1"),
        chartObj: Object,
        chart: document.getElementById('chart1'),
        typeOfChart: 'bar',
        label: 'Number of bugs assigned',
        backgroundColor: ['mediumpurple','#D4E6F1','#17A589','#F7DC6F','#EF5350', '#2980B9'],
        borderColor: 'black',
        colField: 'NumberOfBugs',
        rowField: 'Name',
        loadIndex: 0,
        count: 7,
        display: false,
    }
    ChartLabelObj = new ChartLabel(chartInstance);
    ChartLabelObj.init();

    var chartInstance = {
        devAndBugData: devAndBugData,
        devLabel: [],
        bugLabel: [],
        loadNext: document.getElementById("loadNext2"), 
        loadPrevious: document.getElementById("loadPrevious2"),
        chartObj: Object,
        chart: document.getElementById('chart2'),
        typeOfChart: 'line',
        label: 'Number of bugs closed by Dev',
        backgroundColor: 'mediumpurple',
        borderColor: 'black',
        colField: 'NumberOfBugs',
        rowField: 'Name',
        loadIndex: 0,
        count: 7,
        display: false,
    }
    ChartLabelObj = new ChartLabel(chartInstance);
    ChartLabelObj.init();

    var chartInstance = {
        devAndBugData: devAndBugData,
        devLabel: [],
        bugLabel: [],
        loadNext: document.getElementById("loadNext3"), 
        loadPrevious: document.getElementById("loadPrevious3"),
        chartObj: Object,
        chart: document.getElementById('chart3'),
        typeOfChart: 'line',
        label: 'Number of bugs still open',
        backgroundColor: 'mediumpurple',
        borderColor: 'black',
        colField: 'NumberOfBugs',
        rowField: 'Name',
        loadIndex: 0,
        count: 7,
        display: false,
    }
    ChartLabelObj = new ChartLabel(chartInstance);
    ChartLabelObj.init();

    var chartInstance = {
        devAndBugData: seriousOfBug,
        devLabel: [],
        bugLabel: [],
        loadNext: document.getElementById("loadNext4"), 
        loadPrevious: document.getElementById("loadPrevious4"),
        chartObj: Object,
        chart: document.getElementById('chart4'),
        typeOfChart: 'pie',
        label: 'Bugs Seriousness',
        backgroundColor: ['mediumpurple','#D4E6F1','#17A589','#F7DC6F','#EF5350', '#2980B9'],
        borderColor: 'black',
        colField: 'NumberOfBugs',
        rowField: 'Name',
        loadIndex: 0,
        count: 4,
        display: true,
    }
    ChartLabelObj = new ChartLabel(chartInstance);
    ChartLabelObj.init();

    var chartInstance = {
        devAndBugData: statusOfBug,
        devLabel: [],
        bugLabel: [],
        loadNext: document.getElementById("loadNext5"), 
        loadPrevious: document.getElementById("loadPrevious5"),
        chartObj: Object,
        chart: document.getElementById('chart5'),
        typeOfChart: 'polarArea',
        label: 'Bugs Status',
        backgroundColor: ['mediumpurple','#D4E6F1','#17A589','#F7DC6F','#EF5350', '#2980B9'],
        borderColor: 'black',
        colField: 'NumberOfBugs',
        rowField: 'Name',
        loadIndex: 0,
        count: 5,
        display: true,
    }
    ChartLabelObj = new ChartLabel(chartInstance);
    ChartLabelObj.init();

}