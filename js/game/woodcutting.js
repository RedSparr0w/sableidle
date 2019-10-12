//The base function for loading woodcutting.
function LoadWoodcutting(){
    skills[WOODCUTTING] = new Skill(WOODCUTTING, "Woodcutting");

    LoadTrees();
    RenderWoodcutting();
}

//Render the woodcutting skill. Is called at the start of the game and whenever a tree is cut.
function RenderWoodcutting(){
    var text = "<h1>Woodcutting</h1>";
    text += "<p>level " + skills[WOODCUTTING].level() + " (" + skills[WOODCUTTING].xp + " / " + skills[WOODCUTTING].nextLevelXP() + "xp)<p/>";
    trees.forEach(tree => {
        //If the woodcutting level is not high enough for a tree, don't render it.
        if(skills[WOODCUTTING].level() < tree.level){
            return;
        }

        text += "<button class='uk-button uk-button-default' onclick='ChopTree(" + tree.id + ")'>Chop " + tree.name + "</button>";
    });
    $("#Woodcutting").html(text);
}

//Load the trees into the trees array.
function LoadTrees(){
    trees[0] = new Tree(0, "Fir", 1000, 5, 0);
    trees[1] = new Tree(1, "Douglas Fir", 2500, 10, 1);
}

//Function called by the UI when a chop tree button is clicked.
function ChopTree(id){
    trees[id].chop();
}

//The base object of a tree. Stores helper methods related to woodcutting.
class Tree {
    constructor(id, name, time, xp, level) {
        this.id = id;
        this.name = name;
        this.time = time;
        this.xp = xp;
        this.level = level;
    }

    //Is called by the ChopTree helper method whenever a chop tree button is clicked. Check sif a tree can be chopped and initiates the action.
    chop(){
        if(doingSomething){
            console.log("Can onnly do one action at a time.");
            return;
        }

        if(skills[WOODCUTTING].level() < this.level){
            console.log("Woodcutting level is not high enough to cut " + this.name + ".");
            return;
        }

        console.log("TEST " + this.name);
        doingSomething = true;
        tree = this; //Store the tree being chopped in the tree object for access in the chopDone function.
        setTimeout(this.chopDone, this.time);
    }

    //Is called by the timeout of the chop function. Uses the tree object to check what the tree being chopped is.
    chopDone(){
        console.log("DONE " + tree.name);
        doingSomething = false;
        skills[WOODCUTTING].xp += tree.xp;
        console.log(skills[WOODCUTTING].name + ": " + skills[WOODCUTTING].xp + "xp");
        tree = null;
        RenderWoodcutting();
    }
}