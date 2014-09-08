Wingpower
----------

A pegasus team management sim.
You have two weeks to train all of the pegasai to be the best they can be. At the end of a two-week period, the full roster will attempt to create and maintain a hurricane for the hurricane challenge. 
In the hurricane challenge, the team will have 20 minutes to maintain a hurricane of 800+ cumulative wingpower for at least 2 minutes. The hurricane forms at 200wp

The faster the hurricane, the more control is necesssary to keep it well formed. A poorly formed hurricane will more rapidly drain a pegasus's stamina.

Things & Events:
* Team Roster: Contains all of the pegasi in the team.
	* Team Name: The team's name, if it as one. Default is Crash Crew
	* Editor: Player may choose a set team from the reserve, create a team from their own selections from reserve, get a team randomly picked from reserve, or get a team created entirely at randoms.
	* Flight Order: The order the team enters flight. Influenced by flight speed. Only 6 Pegasai may begin flight at a time.
	
	
* Reserve: A collection of preset and generated Pegasai to use for filling the team roster.
	* Reserve Team: Pre-set teams that the player may choose to use.
	* Add: Allows the player to add a Pegasus they generate to the reserve.
* Pegasus: Stats are not necessarily known at the start. Examining or Training a pegasus will reveal its most up-to-date stats.
	* Condition: Physical condition. Once it drops below 50% of Endurance, other stats decay proportionately (times 2*Condition / Endurance). Once it reaches 0, the pegasai is Grounded(Health) and must recover at least half of Endurance to resume flight. Natural condition cost is current Power divided by twenty (Floor(Power/20)). 
	* Control/Flexibility: Ability to control flight under duress. A stronger hurricane has stronger duress. When duress exceeds control, there is a chance of taking additional Condition damage.
	* Display Name: Displayed name.
	* Endurance: Maximum condition / how much time the pegasus can act at peak condition.
	* Generator: Randomly generates all stats and display name.
	* Growth Aptitude: Ability to grow via training. Total amount of points stats can improve by in one training session. Can also be improved. No matter how high this is, it is possible to get negative growth (down to -2) from a training session.
	* Health: Wellness. Sick, hospitalized, or injured pegasai can not compete or train. Sick pegasai may be forced to train, but may spread to others training at the same time. Injury temporarily reduces recovery.
	* Recovery: Recovery rate. Regains condition and health. A score of 100 means near instantaneous recovery. This will usually be slightly less than a pegasi's strength.
	* Max Speed: The maximum Speed this pegasus can attain at peak condition. It will never exceed this speed.
		* Speed: Contributes directly to Wing Power each turn.
	* Strength: Expends condition to accelerate a pegasus. Higher strength, faster acceleration. (Is this strength still necessary to maintain within an existing hurricane's additional force?)
	* Will: Willingness to participate. Reduces chance of negative health status.
	* Wing Power: Contributes to Hurricane Power
		* Wing Power Record: Highest WP Recorded during training.
	
* Hurricane
	* Control: Cumulative control from Pegasi. If this is too low relative to Power, Duress will increase. 
	* Duress: Varies with Power and Control. Challenges a Pegasus's control and strength. 
	* Momentum: Even if all pegasi forming it stop moving, the hurricane will sustain briefly before decaying.
	* Power: A representation of the current accumulated 
	* State: Describes the state of the hurricane. It forms at 200wp, becomes hazardous at 600wp, is serviceable at 800wp, record-breaking from 1000wp and beyond.
	
	
* Talent: When certain conditions are met, a pegasus's talents become active and affect the current state of their flight or the hurricane. Triggered talents should be announced.


* Training: Improves(how?) stats of participating pegasai via random selection, may spread sickness or cause injury. Reveals current stats of all participants. Costs time in a day. (Cost effective to have many in one session)
	* Targeted Training: Same as before, but working towards improving one or two specific stats the manager chooses.
		* May increase: Condition, Control, Endurance, Growth, Maxspeed, Strength
* Chat: Costs time in a day. May boost Will and Growth.
* Hospital: Costs time in a day. May boost Will and Recovery. Required to cure sickness (1 day min) or injury (3 day min).
	
	
* Competition
	* Recall: Aborts the current hurricane attempt to give all team members a chance to recover. May retry at any time if any are still able to fly.
	* Time Limit: Until victory condition is met, the team has this amount of time to succeed. Once this time is expired, the highest record wingpower is recorded and the game is ended. Default - 10 minutes. Same length as 4 training sessions?
	
	
* Time: Handles everything to do with time.
	* Date: Handles a virtual date. 20 days from start until competition.
	* Only eight hours in a game day may be used for training.
	* Timer: A countdown timer. Defaults to 10 minutes.
	* DT: Time passed between updates.
	
	
* Utilities: Methods and functions to make stuff work.

Traits/Abilities:
Dash has amazing recovery, endurance and Max Speed, but probably low control stat, so she wouldn't be able to do much in terms of stopping the hurricane from going out of control. 

Shy would probably have low stats overall but get a brief jump to just under Dash's stats when she's desperate. (I guess running low on stamina but over some threshold of willpower for some reason.) 
DD would probably have overall above average stats, maybe a bit low on the control scale, but has an occasional chance of becoming actively detrimental. (negative control, I guess?)