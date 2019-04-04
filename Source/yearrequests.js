var app = angular.module("app",[]);

app.controller('MainCtrl',function ($scope,$http) {
    var values;
    $scope.color="green";
    $scope.Type="agency";
    $scope.year=2018;
    $scope.chartType="bar";
    $scope.draw=function(year){
        $scope.year=year;
        drawgraph($scope.year,$scope.Type);
    }
    $scope.drawType=function(year){
        $scope.Type=year;
        drawgraph($scope.year,$scope.Type);
    }
    drawgraph($scope.year,$scope.Type);
    function drawgraph(year,type){
        if(type=="agency"){
            $scope.chartType="bar";
        }
        else
        {
            $scope.chartType="pie";
        }
        $scope.BType=type;
        $scope.BYear=year;
        if(year==2018){
            $scope.color="blue";
        }
        else{
            $scope.color="green";
        }
        var req = {
            method: 'POST',
            url: 'https://api.usaspending.gov/api/v2/spending/',
            data: { "type": ""+type+"",
                "filters": {
                    "fy": ""+year+""
                } }
        }

        $http(req).then(function(value){
            console.log(value);
            values=value;
            //alert('aaa');
            drawChart();

        });
    }




        google.charts.load('current', {packages:['bar','corechart']});
        google.charts.setOnLoadCallback(drawChart);


        function drawChart() {
            var value=values;
            var data = google.visualization.arrayToDataTable([
                ['Department','Amount'],
                [value.data.results[0].name,  value.data.results[0].amount],
                [value.data.results[1].name,  value.data.results[1].amount],
                [value.data.results[2].name,  value.data.results[2].amount],
                [value.data.results[3].name,  value.data.results[3].amount],
                [value.data.results[4].name,  value.data.results[4].amount],
                [value.data.results[5].name,  value.data.results[5].amount],
                [value.data.results[6].name,  value.data.results[6].amount],
                [value.data.results[7].name,  value.data.results[7].amount],
                [value.data.results[8].name,  value.data.results[8].amount],
                [value.data.results[9].name,  value.data.results[9].amount],
                [value.data.results[10].name,  value.data.results[10].amount],
                [value.data.results[11].name,  value.data.results[11].amount],
                [value.data.results[12].name,  value.data.results[12].amount],
                [value.data.results[13].name,  value.data.results[13].amount],
                [value.data.results[14].name,  value.data.results[14].amount]
            ]);

            var options = {
                title: 'US Department Budjet',
                colors:($scope.chartType=="bar")? $scope.color:['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6','blue','red','green','yellow','purple','grey','pink','orange','#0099C6','#DD4477']
            };
            var chart;
            if($scope.chartType=="bar") {
                 chart = new google.charts.Bar(document.getElementById('piechart'));
            }
            else{
                 chart = new google.visualization.PieChart(document.getElementById('piechart'));
            }

            chart.draw(data, options);
        }

});