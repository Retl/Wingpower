var team = [];

var tableHeaderString = "<tr>\
	\n\t<td>Name</td>\
	\n\t<td>Max Wingpower</td>\
	\n\t<td>Wingpower</td>\
	\n\t<td>Condition</td>\
	\n\t<td>Endurance</td>\
	\n\t<td>Strength</td>\
	\n\t<td>Control</td>\
	\n\t<td>Growth</td>\
	\n\t<td>Recovery</td>\
	\n\t<td>Health</td>\
	\n</tr>\n";
	
var txt_page;
var txt_perPage;
var txt_numPages;
var currentPage;
var maxPage;
var t;
var team;
var theHurricane;
var hurricaneInterval = setInterval(hurricaneIntervalHandler, .15 * 1000);

//For charting
var timestamps = [];
var windpowers = [];
var maxDataPoints = 1600;

var lineChartData;

function addDataPoint(d, ts)
{
	timestamps.push(ts);
	windpowers.push(d);
	
	if (ts.length > maxDataPoints || windpowers.length > maxDataPoints)
	{
		timestamps.splice(0,1);
		windpowers.splice(0,1);
	}
};

function hurricaneIntervalHandler ()
{
	theHurricane.fullRound(team);
	var asdf = new Date();
	var timestamp = new Date().toLocaleTimeString();
	//Utilities.write(timestamp + ' - Current Hurricane Power: ' + Math.floor(theHurricane.power));
	//addDataPoint(Math.floor(theHurricane.power), asdf.getSeconds());
	updateTable();
	if (window.myLine.datasets[0].points.length > 20) {window.myLine.removeData();}
	window.myLine.addData([Math.floor(theHurricane.power)], timestamp);
	//window.myLine.update();
};

function main ()
{
	//Get references to page elements that we need to update or refer to.
	txt_page = document.getElementsByName("page")[0];
	txt_perPage = document.getElementsByName("perPage")[0];
	txt_numPages = document.getElementsByName("numPages")[0];
	
	currentPage = Number.parseInt(txt_page.value);
	
	Utilities.write("Initiating weather team search...");
    team = [];
	Utilities.write("Done.");
    
    Utilities.write("Searching local area for eligable pegasai...");
    Roster.addDefaultPegasai();
    Roster.addGeneratedPegasus(Utilities.randomIntInRange(90, 120));
	team = Roster.getAll();
	//Sort the team by Wingpower, greatest to least.
	team.sort(function (a, b) {return b.maxSpeed - a.maxSpeed;});
	
	
	Utilities.write( team.length + " found eligable.");
	
	Utilities.write("Populating pegasai roster.");
	
    t = document.getElementById("theTable");
	t.innerHTML = generateTable(team, currentPage, Number.parseInt(txt_perPage.value));
	Utilities.write("Done.");
	
	//Update the roster table info stuff.
	maxPage = Math.ceil( team.length / Number.parseInt(txt_perPage.value));
	txt_numPages.value = maxPage;
	
	theHurricane = new hurricane();
	
	/*
	var lineChartData = {};
	lineChartData.labels = timestamps;
	lineChartData.dataSets = [
		{
			label: "My First dataset",
			fillColor : "rgba(220,220,220,0.2)",
			strokeColor : "rgba(220,220,220,1)",
			pointColor : "rgba(220,220,220,1)",
			pointStrokeColor : "#fff",
			pointHighlightFill : "#fff",
			pointHighlightStroke : "rgba(220,220,220,1)",
			data : windpowers
		}
	];
	*/
	lineChartData = {
		labels : timestamps,
		datasets : [
			{
				label: "My First dataset",
				fillColor : "rgba(220,220,220,0.2)",
				strokeColor : "rgba(220,220,220,1)",
				pointColor : "rgba(220,220,220,1)",
				pointStrokeColor : "#fff",
				pointHighlightFill : "#fff",
				pointHighlightStroke : "rgba(220,220,220,1)",
				data : windpowers
			}
		]

	}
	
	
	var ctx = document.getElementById("canvas").getContext("2d");
	window.myLine = new Chart(ctx).Line(lineChartData, {
		bezierCurve : false, datasetFill : false, 
		animationSteps: 10
	});
	
};

function generateTableRow(inputArray)
{
	var tableRow = "<tr>\n"
	if (Utilities.isDefined(inputArray) && Utilities.isArray(inputArray))
	{
		for (var i = 0; i < inputArray.length; i++)
		{
			//Do not display decimals.
			if (Utilities.isNumber(inputArray[i]))
			{
				inputArray[i] = inputArray[i].toFixed(2);
			}
			tableRow += "\t" + Utilities.generateTableData(inputArray[i]) + "\n";
		}
	}
	tableRow += "</tr>";
	return tableRow;
}

function generateTable(inputArray, pageNumber, numRowsToGen)
{
	var offset;
	if (!Utilities.isNumber(numRowsToGen) || numRowsToGen < 1) {numRowsToGen = 50;}
	if (!Utilities.isNumber(pageNumber) || pageNumber < 1) {pageNumber = 1;}
	offset = ((pageNumber - 1) * numRowsToGen);
	if (offset >= inputArray.length)
	{
		var newPage = 1;
		offset = inputArray.length  - numRowsToGen;
		
		if (offset >= 0)
		{
			Math.floor(inputArray / numRowsToGen);
		}
		else
		{
			newPage = 1;
			offset = 0;
			numRowsToGen = inputArray.length;
		}
		Utilities.write("No entries to view. Jumping back to page "+ newPage +".");
	}
	
	//Update the values displayed on the page.
	txt_page.value = 1;
	txt_perPage.value = numRowsToGen;
	maxPage = Math.ceil( team.length / numRowsToGen);
	txt_numPages.value = maxPage;
	
	var table = "<table>\n"
	table += tableHeaderString;
	if (Utilities.isDefined(inputArray) && Utilities.isArray(inputArray))
	{
		//Create a table row for every team member's stats/'
		for (var p = offset; p < offset + numRowsToGen && p < team.length; p++)
		{
			//This is where you put the arguments you want displayed.
			table += generateTableRow([team[p].displayName, team[p].maxSpeed, team[p].wingPower, team[p].condition, team[p].endurance, team[p].strength, team[p].control, team[p].growth, team[p].recovery, team[p].health]);
		}
	}
	table += "</table>";
	return table;
};

function updateTable()
{
	t.innerHTML = generateTable(team, currentPage, Number.parseInt(txt_perPage.value));
	return false;
};


function goToNextPage()
{
	if (currentPage < maxPage)
	{
		currentPage += 1;
		txt_page.value = currentPage;
		t.innerHTML = generateTable(team, currentPage, Number.parseInt(txt_perPage.value));
	}
};

function goToPrevPage()
{
	
	if (currentPage > 1)
	{
		currentPage -= 1;
		txt_page.value = currentPage;
		t.innerHTML = generateTable(team, currentPage, Number.parseInt(txt_perPage.value));
	}
};

function goToPage(newPage)
{
	var result; 
	if (Utilities.isNumber(txt_page.value))
	{
		Number.parseInt(txt_page.value);
	}
	else
	{
		result = 1;
	}
	return result;
}
