var team = [];

function main ()
{
    team = [];
    
    for (var i = 99; i >= 0; i--)
    {
        team[i] = new pegasus();
        team[i].generate();
    }
	
    t = document.getElementById("theTable");
	
	//Write the table stuffs.
    for (var p in team) 
    {
        tableRow = "<tr>";
        tableRow += "<td>" + team[p].displayName + "</td>";
        tableRow += "<td>" + team[p].maxSpeed + "</td>";
        tableRow += "<td>" + team[p].condition + "</td>";
        tableRow += "<td>" + team[p].endurance + "</td>";
        tableRow += "<td>" + team[p].strength + "</td>";
        tableRow += "<td>" + team[p].control + "</td>";
        tableRow += "<td>" + team[p].growth + "</td>";
        tableRow += "<td>" + team[p].recovery + "</td>";
        tableRow += "<td>" + team[p].health + "</td>";
        tableRow += "</tr>";
		
		t.innerHTML += tableRow;
		
    }
};