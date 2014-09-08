var team = [];

var tableHeaderString = "<tr>\
	\n\t<td>Name</td>\
	\n\t<td>Max Wingpower</td>\
	\n\t<td>Condition</td>\
	\n\t<td>Emdurance</td>\
	\n\t<td>Strength</td>\
	\n\t<td>Control</td>\
	\n\t<td>Growth</td>\
	\n\t<td>Recovery</td>\
	\n\t<td>Health</td>\
	\n</tr>\n";

function main ()
{
	Utilities.write("Initiating weather team search...");
    team = [];
	Utilities.write("Done.");
    
    Utilities.write("Searching local area for eligable pegasai...");
    for (var i = Utilities.randomIntInRange(90, 120); i >= 0; i--)
    {
        team[i] = new pegasus();
        team[i].generate();
    }
	Utilities.write( team.length + " found eligable.");
	
	Utilities.write("Populating pegasai roster.");
	
    t = document.getElementById("theTable");
	t.innerHTML = generateTable(team);
	Utilities.write("Done.");
};

function generateTableRow(inputArray)
{
	var tableRow = "<tr>\n"
	if (Utilities.isDefined(inputArray) && Utilities.isArray(inputArray))
	{
		for (var i = 0; i < inputArray.length; i++)
		{
			tableRow += "\t" + Utilities.generateTableData(inputArray[i]) + "\n";
		}
	}
	tableRow += "</tr>";
	return tableRow;
}

function generateTable(inputArray)
{
	var table = "<table>\n"
	table += tableHeaderString;
	if (Utilities.isDefined(inputArray) && Utilities.isArray(inputArray))
	{
		//Create a table row for every team member's stats/'
		for (var p = 0; p < team.length; p++)
		{
			table += generateTableRow([team[p].displayName, team[p].maxSpeed, team[p].condition, team[p].endurance, team[p].strength, team[p].control, team[p].growth, team[p].recovery, team[p].health]);
		}
	}
	table += "</table>";
	return table;
};

function updateTable()
{
	
};