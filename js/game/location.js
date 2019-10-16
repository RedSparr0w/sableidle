const LID_STARTERIA = "starteria";
const LID_STARTOPOLIS = "startopolis";

//Loads the locationsinto the array.
function LoadLocations(){
    locations[LID_STARTERIA] = new Location(LID_STARTERIA, "Starteria");
    locations[LID_STARTERIA].addConnection(LID_STARTOPOLIS);
    locations[LID_STARTERIA].addTree(TID_FIR);
    locations[LID_STARTERIA].addTree(TID_DOUGLAS_FIR);

    locations[LID_STARTOPOLIS] = new Location(LID_STARTOPOLIS, "Startopolis");
    locations[LID_STARTOPOLIS].addConnection(LID_STARTERIA);

    currentLocation = LID_STARTERIA;
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