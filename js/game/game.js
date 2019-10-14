var skills = [];                        //Array of all the skills in the game. Are loaded in LoadSkills.
var trees = [];                         //Array of all the trees that can be chopped with woodcutting. Loaded in LoadTrees.

var doingSomething = false;             //Is set to true if an action is being performed. Used to check if an action can be performed.
var startedTime = 0;                    //The starting time of the current action.
var duration = 0;                       //The duration of the current action in millis.
var tree;                               //If the current action is woodcutting, this stores the tree being chopped.

const WOODCUTTING = 0;                  //The ID of the woodcutting skill.

//The startpoint of the JS of the game.
$(document).ready(function() {
    LoadSkills();
})

//Loads all the skills. Calls helper methods for each skill.
function LoadSkills(){
    LoadWoodcutting();
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

//The base object of a skill. Stores basic helper methods for skills.
class Skill{
    constructor(id, name){
        this.id = id;
        this.name = name;
        this.xp = 0;
    }

    //Calculate the xp of the next level.
    nextLevelXP(){
        return (this.level() + 1) * 100;
    }

    //Calculate the current level based on the xp of the skill.
    level(){
        return Math.floor(this.xp / 100);
    }
}