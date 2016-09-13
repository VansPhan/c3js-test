/*
 * Parse the data and create a graph with the data.
 */
function parseData(createGraph) {
	var van;
	var k3nny;
	Papa.parse("../data/van.csv", {
		download: true,
		complete: function(results) {
			console.log(results.data)
			van = results.data
			Papa.parse("../data/k3nny.csv", {
				download: true,
				complete: function(results) {
					console.log(results.data)
					k3nny = results.data
					createGraph(van, k3nny);
				}
			});
		}
	});
}

function createGraph(data1, data2) {
	var date1 = [];
	var date2 = [];
	var dmg1 = ["Van"];
	var dmg2 = ["K3nny"];

	for (var i = 1; i < data1.length - 1; i++) {
		date1.push(Date(data1[i][7]));
		dmg1.push(data1[i][72]);
	}

	for (var i = 1; i < data2.length - 1; i++) {
		date2.push(Date(data2[i][7]));
		dmg2.push(data2[i][72]);
	}

	var chart = c3.generate({
		bindto: '#chart',
	    data: {
	        columns: [
	        	dmg1,
	        	dmg2
	        ]
	    },
	    axis: {
	        x: {
	            type: 'category',
	            categories: date2,
	            tick: {
	            	multiline: true,
                	culling: {
                    	max: 15
                	}
            	}
	        }
	    },
	    zoom: {
        	enabled: true
    	},
	    legend: {
	        position: 'right'
	    }
	});
}

parseData(createGraph);