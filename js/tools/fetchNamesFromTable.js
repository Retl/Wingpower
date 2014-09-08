//Purpose: When used on a List of Ponies page, collects all of the pony names listed and creates an array containing them.

var table = document.getElementsByTagName("table")[1]; //Select the table containing all of the ponies in the ponylist.
var tablerows = table.getElementsByTagName("tr"); //Get an array containing just the table ROWS from that selected table.
var allPegs = new Array(); //Create an array to store all of the names.
for (var i = 1; i < tablerows.length; i++)
{
	allPegs.push(tablerows[i].getElementsByTagName("td")[0].innerText); //Put all the names in the array.
}

allPegs = allPegs.slice(0,allPegs.length + 1); //Slice it down, if you want.
var result = JSON.stringify(allPegs); //This is the string to recreate the object containing all the names.
console.log(result);