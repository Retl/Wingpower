var Utilities = function ()
{
	;
};

//Dealing with displaying text into a 'terminal' div.
Utilities.scrollToBottom = function (elementId) 
{
	theDiv = document.getElementById(elementId);
	theDiv.scrollTop = theDiv.scrollHeight;
};

Utilities.appendToDiv = function (elementId, newContent) 
{
	theDiv = document.getElementById(elementId);
	theDiv.innerHTML += newContent;
};

//Dealing with Random Numbers
Utilities.randomIntInRange = function(min, max)
{
	//This is an inclusive range. - Moore.
	var range = Math.abs(max - min) + 1;
	return Math.floor((Math.random() * range) + min);
};

Utilities.randomInArray = function(a)
{
	return Utilities.RandomIntInRange(0, a.length - 1);
};


Utilities.writeNoLine = function (newContent) 
{
	if (typeof newContent == "undefined")
	{
		newContent = "";
	}
	Utilities.appendToDiv('main', newContent);
	Utilities.scrollToBottom('main');
};

Utilities.write = function (newContent) 
{
	if (typeof newContent == "undefined")
	{
		newContent = "";
	}
	Utilities.writeNoLine(newContent + '<br />');
};

// Why is this in the Utilities library?

Utilities.rotationalSpin = function (current, max, rateScale)
{
	if (!Utilities.isNumber(current))
	{
		current = 0;
	}
	
	if (!Utilities.isNumber(max))
	{
		max = 10;
	}
	
	if (!Utilities.isNumber(rateScale))
	{
		rateScale = 1;
	}
	
	current += dt * rateScale + 0.05;
	while (current > max) {current -= max;}
	
	return current;
};

//Variable checking.

Utilities.isNumber = function (input)
{
	//Check the input to see if AT LEAST the first character is a digit. If it is, true. If this isn't a number, return false.
	return !isNaN( parseFloat(input) );
};

Utilities.isArray = function (input)
{
	//Delegate to the Array's way of handling this.
	return Array.isArray(input);
};

Utilities.isFunction = function (input)
{
	//Check the input to see if the type is a function. If it is, true. Else, false.
	return (typeof input == 'function');
};

Utilities.isDefined = function (input)
{
	//Check the input to see if the type is defined. If it is, true. Else, false.
	var result = false;
	if (typeof input != "undefined") {result = true;}
	return result;
};

Utilities.defaultIfNotNumber = function (inValue, defaultValue)
{
	Utilities.isNumber(defaultValue)? defaultValue : 0;
	return Utilities.isNumber(inValue)? inValue : defaultValue;
}


Utilities.clamp = function (val, min, max)
{
	val = Math.max(min, val);
	val = Math.min(max, val);
	return val;
};

//Dealing with vectors and lines.
Utilities.distance = function (x1, y1, x2, y2)
{
	var result = 0;
	var xdist = x2 - x1;
	var ydist = y2 - y1;
	result = Math.sqrt(Math.pow(xdist, 2) + Math.pow(ydist, 2)); //Working back from Pythagorean Theorum. 
	return result;
};

Utilities.magnitude = function (inputVector)
{
	if (Utilities.isNumber(inputVector.x) && Utilities.isNumber(inputVector.y))
	{
		return Math.sqrt(Math.pow(inputVector.x,2) + Math.pow(inputVector.y,2));
	}
}

Utilities.normalize = function (inputVector)
{
	if (Utilities.isNumber(inputVector.x) && Utilities.isNumber(inputVector.y))
	{
		var mag = Utilities.magnitude(inputVector);
		inputVector.x /= mag;
		inputVector.y /= mag;
	}
	
	return inputVector; //This is a reference, not a copy. Faster, but be careful.
};

Utilities.lerp = function (x1, y1, x2, y2, ratio)
{
	var x = -1;
	var y = -1;
	if (Utilities.isNumber(ratio) && ratio == 0) {x = x1; y = y1;}
	
	if (Utilities.isNumber(x1) && Utilities.isNumber(y1) && Utilities.isNumber(x2) && Utilities.isNumber(y2) && Utilities.isNumber(ratio))
	{
		if (ratio == 0)
		{
			x = x1;
			y = y1;
		}
		else
		{
			x = x1 + ((x2 - x1) * ratio); //Originpoint + (length / portion)
			y = y1 + ((y2 - y1) * ratio);
		}
	}
	
	var result = {};
	result.x = x;
	result.y = y;
	
	return result;
};

//Generating HTML.

Utilities.generateTableData = function (value)
{
	var result = "<td>";
	if (Utilities.isDefined(value))
	{
		result += value;
	}
	result += "</td>";
	return result; 
};