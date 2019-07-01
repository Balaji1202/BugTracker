// class ChartLabel {
    
//     constructor() {
//         devsAndBugs = this.devAndBugData;
//         devLabel = this.devLabel;
//         bugLabel = [],
//         loadNext,
//         loadPrevious,
//         loadIndex:0,
//         chartObj: Object,
//         chart, typeOfChart, label, backgroundColor, borderColor, data,
//     },

//     init() {
//         this.settings.loadNext.addEventListener('click', function() {
//             if(this.settings.loadIndex+7 <= 1000) {
//                 this.settings.loadIndex += 7;
//                 this.refreshBuffer();
//                 this.settings.chartObj = this.loadLabels(this.settings.chart, this.settings.typeOfChart);
//             }
                
//         });

//         this.settings.loadPrevious.addEventListener('click', function() {
//             if(this.settings.loadIndex-7 >= 0) {
//                 this.settings.loadIndex -= 7;
//                 this.refreshBuffer();
//                 this.settings.chartObj = this.loadLabels(this.settings.chart, 'bar');
//             }
//         });

//         this.settings.chartObj = this.loadLabels(this, 'bar');
//     },
    
//     refreshBuffer: function() {
//         this.settings.devLabel = [];
//         this.settings.bugLabel = [];
//         // this.settings.chartObj1.destroy();
//     },

//     loadLabels: function() {

//         for (let i=this.settings.loadIndex; i<this.settings.loadIndex+7; i++) {
//             this.settings.devLabel.push(this.settings.devsAndBugs[i].Name);
//             this.settings.bugLabel.push(this.settings.devsAndBugs[i].NumberOfBugs);
//         }
//         ctx = chart.getContext('2d');
//         chartObj = new Chart(ctx, {
//             type: typeOfChart,
//             data: {
//                 labels: this.settings.devLabel,
//                 datasets: [{
//                     label: 'Number of Bugs assigned',
//                     backgroundColor: 'mediumpurple',
//                     borderColor: 'black',
//                     data: this.settings.bugLabel,
//                 }]
//             },
//             options: {}
//         });
//         return chartObj;
//     }
// };




// ChartLabel.init();

// ChartLabe1 = Object.create('this');
// var chart1 = document.getElementById('chart1');
// var chart2 = document.getElementById('chart2');
// var chart3 = document.getElementById('chart3');
// var chart4 = document.getElementById('chart4');
// var chart5 = document.getElementById('chart5');

// document.getElementById("loadNext");document.getElementById("loadPrevious");