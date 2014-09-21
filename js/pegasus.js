function pegasus(dispn, cont, endu, grow, heal, reco, maxs, stre, wil) 
{
    //Inherit from enemy object.
    //enemy.call(this, xpos, ypos);
	//this.moveSpeedScalar = 16;
	
	this.endurance = Utilities.isNumber(endu)? endu : 0;
	this.condition = this.endurance;
	this.control = Utilities.isNumber(cont)? cont : 0;
	this.displayName = Utilities.isDefined(dispn)? dispn : "Pegasus Flier 42";
	this.growth = Utilities.isNumber(grow)? grow : 0;
	this.health = Utilities.isNumber(heal)? heal : 100;
	this.recovery = Utilities.isNumber(reco)? reco : 0;
	this.maxSpeed = Utilities.isNumber(maxs)? maxs : 0;
	this.speed = 0;
	this.strength = Utilities.isNumber(stre)? stre : 0;
	this.will = Utilities.isNumber(wil)? wil : 0;
	this.wingPower = 0;
	
	this.downed = false;
	
	this.generate = function()
	{
		this.endurance = Utilities.randomIntInRange(10, 95);
		this.condition = this.endurance;
		this.control = Utilities.randomIntInRange(5, 95);
		this.displayName = Names.random();
		this.growth = Utilities.randomIntInRange(2, 10);
		this.health = Utilities.randomIntInRange(50, 100);
		this.strength = Utilities.randomIntInRange(10, 80);
		this.recovery = Utilities.randomIntInRange(Utilities.clamp(this.strength - 30, 2, 100), Utilities.clamp(this.strength - 5, 2, 100));
		this.maxSpeed = Utilities.randomIntInRange(this.strength, 80);
		this.speed = 0;
		
		this.will = Utilities.randomIntInRange(1, 100);
		this.wingPower = 0;
	};
	
	this.fly = function()
	{
		var result;
		if (!this.downed)
		{
			//Spend Condition to speed up.
			this.condition = Utilities.clamp(this.condition - this.strength, 0, this.endurance);

			//If you are able to fly, speed up. Consider replacing this.strenth addition with addition of however much strength is available form condition.
			if (this.strength >= this.condition)
			{
				this.wingPower = Utilities.clamp(this.wingPower + Math.min(this.condition, this.strength), 0, this.maxSpeed);
			}
		}
		else
		{
			if (this.condition >= this.endurance) 
			{
				this.downed = false; 
				//Utilities.write(this.displayName + " returns to flight.");
			}
		}
		
		if (this.condition <= 0) 
		{
			this.downed = true; 
			this.wingPower = 0;
			//Utilities.write(this.displayName + " needs to recover.");
		}
		
		//Recover, whether downed or not.
		this.condition = Utilities.clamp(this.condition + this.recovery, this.condition, this.endurance);
		
		result = this.wingPower;
		return result;
	};
	
	this.draw = function()
	{
	/*
		if (this.visible && this.active)
		{
			CanvasDraw.drawPolygon(this.x, this.y, Geometry.circle(this.radius * 2, 8));
		}
		*/
	};
	
	
};

var Roster = {};

Roster.list = [];

Roster.add = function (newPeg)
{
	result = false;
	if (newPeg.constructor == pegasus)
	{
		result = true;
		Roster.list.push(newPeg);
	}
	return result;
};

Roster.addGeneratedPegasus = function (numPegs)
{
	numPegs = Utilities.isNumber(numPegs)? Math.max(numPegs, 1) : 1;
	for (; numPegs > 0; numPegs--)
    {
        var newPeg = new pegasus();
        newPeg.generate();
		Roster.add(newPeg);
    }
};

Roster.addDefaultPegasai = function ()
{
	//Roster.list.push(new pegasus(dispn, cont, endu, grow, heal, reco, maxs, stre, wil));
	Roster.list.push(new pegasus("RDash", 60, 79, 1, 99, 75, 80, 79, 99));
	Roster.list.push(new pegasus("Radiant Star", 55, 69, 8, 96, 65, 70, 80, 60));
};

Roster.getTeam = function (numPegs)
{
	result = [];
	var copy = Roster.list.slice();
	numPegs = Utilities.isNumber(numPegs)? Math.max(numPegs, 1) : 1;
	for (; numPegs > 0 && copy.length > 0; numPegs--)
    {
		//Pick one from the copy at random, push it into the results, and remove it from the copy.
        result.push(copy.splice(Utilities.randomIntInRange(0, copy.length), 1));
    }
	
	return result;
};

Roster.getAll = function (numPegs)
{
	return Roster.list.slice();
};