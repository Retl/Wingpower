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
		this.growth = Utilities.randomIntInRangeExploding(2, 4);
		this.health = Utilities.randomIntInRange(50, 100);
		this.strength = Utilities.randomIntInRange(1, 7);
		this.recovery = Utilities.randomIntInRange(Utilities.clamp(this.strength - 3, 2, 100), Utilities.clamp(this.strength - 1, 2, 100));
		this.maxSpeed = Utilities.randomIntInRangeExploding(this.strength, this.strength * 2);
		this.speed = 0;
		
		this.will = Utilities.randomIntInRange(1, 100);
		this.wingPower = 0;
	};
	
	this.regain = function (scalar)
	{
		scalar = Utilities.defaultIfNotNumber(scalar, 1);
		this.condition = Utilities.clamp(this.condition + (this.recovery * scalar / 20), this.condition, this.endurance);
	};
	
	this.trait = function()
	{
		return false;
	};
	
	this.traitCondition = function()
	{
		return false;
	};
	
	this.fly = function()
	{
		var result;
		if (!this.downed)
		{
			//Spend Condition to speed up.
			this.condition = Utilities.clamp(this.condition - (this.strength / 20), 0, this.endurance);

			//If you are able to fly, speed up. Consider replacing this.strenth addition with addition of however much strength is available form condition.
			if (this.condition > 0)
			{
				this.wingPower = Utilities.clamp(this.wingPower + Math.min(this.condition, this.strength / 20), 0, this.maxSpeed);
			}
		}
		else
		{
			//this.regain(); //Allows regain only when grounded.
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
		this.regain();
		//this.condition = Utilities.clamp(this.condition + (this.recovery / 100 * this.endurance), this.condition, this.endurance); - Percentile based recovery.
		
		result = this.wingPower;
		return result;
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

Roster.addConvertedFoEPegasus = function (dispn, s, p, e, c, i, a, l)
{
	var s = Roster.specialToWingpower(s, p, e, c, i, a, l);
	var newPeg = new pegasus(dispn, s[0], s[1], s[2], s[3], s[4], s[5], s[6]);
	Roster.add(newPeg);
}

Roster.specialToWingpower = function (s, p, e, c, i, a, l)
{
	var result = [];
	s = Utilities.defaultIfNotNumber(s, 1);
	p = Utilities.defaultIfNotNumber(p, 1);
	e = Utilities.defaultIfNotNumber(e, 1);
	c = Utilities.defaultIfNotNumber(c, 1);
	i = Utilities.defaultIfNotNumber(i, 1);
	a = Utilities.defaultIfNotNumber(a, 1);
	l = Utilities.defaultIfNotNumber(l, 1);
	
	var cont = (s/10 * 90 + 5);
	var endu = (e/10 * 85 + 10);
	var grow = (l);
	var heal = (e/10 * 50 + 50);
	var stre = s/10 * 19 + 1;
	var reco = Utilities.randomIntInRange(Utilities.clamp(stre - 6, 2, 100), Utilities.clamp(stre - 1, 2, 100));
	var maxs = (a/10 * 16.5 + 1);
	var wil = (c * 10);
	
	result.push(cont);
	result.push(endu);
	result.push(grow);
	result.push(heal);
	result.push(reco);
	result.push(maxs);
	result.push(stre);
	result.push(wil);
	return result;
};
Roster.addDefaultPegasai = function ()
{
	//Roster.list.push(new pegasus(dispn, cont, endu, grow, heal, reco, maxs, stre, wil));
	Roster.add(new pegasus("RDash", 60, 79, 1, 99, 20, 16.5, 16.5, 99));
	Roster.add(new pegasus("Phobiashy", 20, 20, 1, 99, 0.5, 0.5, 0.5, 20));
	Roster.add(new pegasus("Thunderlane", 53.69, 50, 3, 60, 4, 9.3, 7, 60));
	
	
	
	Roster.addConvertedFoEPegasus("Radiant Star", 8, 4, 6, 6, 5, 7, 8);
	Roster.addConvertedFoEPegasus("Atom Smasher", 1, 8, 2, 9, 9, 2, 10);
	//Roster.addConvertedFoEPegasus("Calamity", 5, 5, 5, 5, 5, 8, 5); WHAT ARE EVEN YOUR STATS I CAN'T FIND THEM
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

//Record: Fillydelphia at 910wp. Minimum is 800wp.
// 8 were sick.
//TL's rating: 9.3wp, ???: 8.7, 9.2, 9.7, 9.9, Tree:0.5->2.3->Max:3.0->Desperation:16.5
// Shadowy looking guy: 11.0
//Target average: 1.00wp; Meaning if she expects 1000.00wp, she has about 100 pegasai to work with.
