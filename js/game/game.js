//Contains all the constants of the game
const CONSTS = {
    SKILL_WOODCUTTING : 0,

    LID_STARTERIA : "starteria",
    LID_STARTOPOLIS : "startopolis",

    TID_FIR : "fir",
    TID_DOUGLAS_FIR : "douglas_fir",

    IID_LOG_FIR : "log_fir",
    IID_LOG_DOUGLAS_FIR : "log_douglas_fir"
};

var skills = [];                        //Array of all the skills in the game. Are loaded in LoadSkills.
var trees = [];                         //Array of all the trees that can be chopped with woodcutting. Loaded in LoadTrees.
var items = [];                         //Array of all the items in the game. Loaded in LoadItems.
var locations = [];                     //Array of all the locations in the game. Loaded in LoadLocations.

var inventory;

var currentLocation;

var doingSomething = false;             //Is set to true if an action is being performed. Used to check if an action can be performed.
var startedTime = 0;                    //The starting time of the current action.
var duration = 0;                       //The duration of the current action in millis.
var tree;                               //If the current action is woodcutting, this stores the tree being chopped.

//The startpoint of the JS of the game.
$(document).ready(function() {
    LoadSkills();
    LoadLocations();
    inventory = new Inventory(10);
    RenderCurrentLocation();
})

//Loads all the skills. Calls helper methods for each skill.
function LoadSkills(){
    LoadWoodcutting();
    LoadItems();
}

function UpdateProgress(){
    var now = new Date();
    var progress = now.getTime() - startedTime;

    if(progress > duration || !doingSomething){
        return;
    }

    $(".progressBar").html("<progress class='uk-progress' value='" + progress + "' max='" + duration + "'>");
    setTimeout(UpdateProgress, 10);
}

//Render the skills list.
function RenderSkills(){
    let skillsText = "<h2>Skills</h2><ul>";

    skills.forEach(skill => {
        skillsText += `<li>${skill.name} Level ${skill.level}/${skill.levelCap} (${skill.xp}/${skill.nextLevelXP})</li>`;
    });

    skillsText += "</ul>";
    $("#skills").html(skillsText);
}

//The base object of a skill. Stores basic helper methods for skills.
class Skill{
    constructor(id, name, xp = 0, levelCap = 10){
        this.id = id;
        this.name = name;
        this.xp = xp;
        this.levelCap = levelCap;

        // The amount of xp of the level cap.
        this.maxXP = this.xpAtLevel(this.levelCap);
        // Current level
        this._level = this.level;
    }

    //Add the given amount of xp to the skill.
    addXP(xp){
        this.xp = Math.min(this.maxXP, this.xp + xp);
        if (this._level < this.level) this.levelUp();
    }

    //Calculates the amount of xp for a given level.
    xpAtLevel(level){
        return level * 100;
    }

    //Calculate the xp of the next level.
    get nextLevelXP(){
        return this.xpAtLevel(this.level + 1);
    }

    //Calculate the current level based on the xp of the skill.
    get level(){
        return Math.floor(this.xp / 100);
    }

    levelUp(){
      this._level = this.level;
      alert(`${this.name} leveled up to ${this.level}`);
    }
}
