//Loads the locationsinto the array.
function LoadLocations(){
    locations[CONSTS.LID_STARTERIA] = new Location(CONSTS.LID_STARTERIA, "Starteria");
    locations[CONSTS.LID_STARTERIA].addConnection(CONSTS.LID_STARTOPOLIS);
    locations[CONSTS.LID_STARTERIA].addTree(CONSTS.TID_FIR);
    locations[CONSTS.LID_STARTERIA].addTree(CONSTS.TID_DOUGLAS_FIR);

    locations[CONSTS.LID_STARTOPOLIS] = new Location(CONSTS.LID_STARTOPOLIS, "Startopolis");
    locations[CONSTS.LID_STARTOPOLIS].addConnection(CONSTS.LID_STARTERIA);

    currentLocation = CONSTS.LID_STARTERIA;
}

//Renders the home page with the current location.
function RenderCurrentLocation(){
    $("#currentLocationName").html(locations[currentLocation].name);
    $(".progressBar").html("<progress class='uk-progress' value='0' max='100'>");

    let connectionsText = "<h4>Connections</h4>";
    locations[currentLocation].connections.forEach(connection => {
        connectionsText += `<button class='uk-button uk-button-default' onclick="TravelTo('${connection}')">${locations[connection].name}</button>`;
    });
    $("#possibleConnections").html(connectionsText);

    let treesText = "<h4>Trees</h4>";
    locations[currentLocation].trees.forEach(treeID => {
        treesText += GetChopButtonIfPossible(treeID);
    });
    $("#possibleTrees").html(treesText);
}

//Change location to hte given locationID
function TravelTo(locationID){
    if(locations[locationID] == null){
        console.log("Invalid location id: " + locationID);
        return;
    }

    currentLocation = locationID;
    RenderCurrentLocation();
}

//The class for Locations. Contains data and helper functions.
class Location{
    constructor(id, name){
        this.id = id;
        this.name = name;
        this.connections = [];
        this.trees = [];
    }

    addConnection(locationID){
        this.connections.push(locationID);
    }

    addTree(treeID){
        this.trees.push(treeID);
    }
}