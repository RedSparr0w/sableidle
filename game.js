var skills = [];

var trees = [];

var doingSomething = false;
var tree;

const WOODCUTTING = 0;

$(document).ready(function() {
    LoadSkills();
})

function LoadSkills(){
    LoadWoodcutting();
}

function LoadWoodcutting(){
    skills[WOODCUTTING] = new Skill(WOODCUTTING, "Woodcutting");

    LoadTrees();

    var text = "";
    trees.forEach(tree => {
        text += "<button class='uk-button uk-button-default' onclick='ChopTree(" + tree.id + ")'>Chop " + tree.name + "</button>";
    });
    $("#Woodcutting").html(text);
}

function LoadTrees(){
    trees[0] = new Tree(0, "Fir", 1000, 5);
}

function ChopTree(id){
    trees[id].chop();
}

class Skill{
    constructor(id, name){
        this.id = id;
        this.name = name;
        this.xp = 0;
    }
}

class Tree {
    constructor(id, name, time, xp) {
        this.id = id;
        this.name = name;
        this.time = time;
        this.xp = xp;
    }

    chop(){
        if(!doingSomething){
            console.log("TEST " + this.name);
            doingSomething = true;
            tree = this;
            setTimeout(this.chopDone, this.time);
        }
    }

    chopDone(){
        console.log("DONE " + tree.name);
        doingSomething = false;
        skills[WOODCUTTING].xp += tree.xp;
        console.log(skills[WOODCUTTING].name + ": " + skills[WOODCUTTING].xp + "xp");
        tree = null;
    }
}