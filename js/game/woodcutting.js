//The base function for loading woodcutting.
function LoadWoodcutting(){
    skills[CONSTS.SKILL_WOODCUTTING] = new Skill(CONSTS.SKILL_WOODCUTTING, "Woodcutting");

    LoadTrees();
}

function GetChopButtonIfPossible(treeID){
    if(skills[CONSTS.SKILL_WOODCUTTING].level >= trees[treeID].level){
        return `<button class='uk-button uk-button-default' onclick="ChopTree('${trees[treeID].id}')">Chop ${trees[treeID].name}</button>`;
    }

    return "";
}

//Load the trees into the trees array.
function LoadTrees(){
    trees[CONSTS.TID_FIR] = new Tree(CONSTS.TID_FIR, "Fir", 1000, 5, 0, CONSTS.IID_LOG_FIR);
    trees[CONSTS.TID_DOUGLAS_FIR] = new Tree(CONSTS.TID_DOUGLAS_FIR, "Douglas Fir", 2500, 10, 1, CONSTS.IID_LOG_DOUGLAS_FIR);
}

//Function called by the UI when a chop tree button is clicked.
function ChopTree(id){
    trees[id].chop();
}

//The base object of a tree. Stores helper methods related to woodcutting.
class Tree {
    constructor(id, name, time, xp, level, itemID) {
        this.id = id;
        this.name = name;
        this.time = time;
        this.xp = xp;
        this.level = level;
        this.itemID = itemID;
    }

    //Is called by the ChopTree helper method whenever a chop tree button is clicked. Check sif a tree can be chopped and initiates the action.
    chop(){
        if(doingSomething){
            console.log("Can onnly do one action at a time.");
            return;
        }

        if(skills[CONSTS.SKILL_WOODCUTTING].level < this.level){
            console.log("Woodcutting level is not high enough to cut " + this.name + ".");
            return;
        }

        console.log("TEST " + this.name);
        doingSomething = true;
        tree = this; //Store the tree being chopped in the tree object for access in the chopDone function.
        duration = this.time;
        var now = new Date();
        startedTime = now.getTime();
        setTimeout(this.chopDone, this.time);
        setTimeout(UpdateProgress, 10);
    }

    //Is called by the timeout of the chop function. Uses the tree object to check what the tree being chopped is.
    chopDone(){
        console.log("DONE " + tree.name);
        doingSomething = false;
        skills[CONSTS.SKILL_WOODCUTTING].addXP(tree.xp);
        inventory.addItem(new ItemStack(tree.itemID, 1));
        console.log(skills[CONSTS.SKILL_WOODCUTTING].name + ": " + skills[CONSTS.SKILL_WOODCUTTING].xp + "xp");
        tree = null;
        RenderCurrentLocation();
    }
}
