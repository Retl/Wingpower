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
		//Spend Condition to speed up.
		this.condition = Utilities.clamp(this.condition - this.strength, 0, this.endurance);
		
		//If you are able to fly, speed up. Consider replacing this.strenth addition with addition of however much strength is available form condition.
		if (this.strength >= this.condition)
		{
			this.wingPower = Utilities.clamp(this.wingPower + this.strength, 0, this.maxSpeed);
		}
		
		
		this.condition += this.recovery;
		
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