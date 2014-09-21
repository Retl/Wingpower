function hurricane(control, duress, momentum, power, state)
{
	this.control = Utilities.isNumber(control)? control : 0;
    this.duress = Utilities.isNumber(duress)? duress : 0;
    this.momentum = Utilities.isNumber(momentum)? momentum : 0;
    this.power = Utilities.isNumber(power)? power : 0;
    this.state = Utilities.isDefined(state)? state : "OMG I am a Hurricane.";
    
    this.buildUp = function(char)
	{
        this.power += char.fly();
	};
    
    this.decay = function()
	{
        this.power /= team.length;
		//this.power -= team.length * 5;
		this.power = Math.max(this.power, 0);
	};
    
    this.fullRound = function(theTeam)
    {
        this.decay();
        for (var i = 0; i < theTeam.length; i++)
        {
          this.buildUp(theTeam[i]);
        }
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