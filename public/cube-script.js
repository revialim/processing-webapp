//cube initial setup
window.CubeContainer = {
    alias: "genericCubeAlias",
    boxX : 100,
    boxY : 100,
    cubeSize : 90,
    rotX : 0.5,
    rotY : 0.5
};

/*
class Cube {
    constructor(x,y,size,rotx,roty){
        this.xcoord = x;
        this.ycoord = y;
        this.size = size;
        this.rotx = rotx;
        this.roty = roty;
    }
}
*/


var cube1 = CubeContainer;
window.CubeArray = [cube1];

//list of all cubes
var allCubes;

//set slider function, so that sliders show (updated) CubeContainer values
function setSliders() {
    document.getElementById("boxPosX").value = CubeContainer.boxX;
    document.getElementById("boxPosY").value = CubeContainer.boxY;
    document.getElementById("cubeSize").value = CubeContainer.cubeSize;
    document.getElementById("rotationX").value = CubeContainer.rotX;
    document.getElementById("rotationY").value = CubeContainer.rotY;
}

//set cube properties according to sliders
function setValue(elem, i) {
    if(elem.id === "boxPosX") {
        CubeContainer.boxX = i;
    } else if(elem.id === "boxPosY") {
        CubeContainer.boxY = i;
    } else if (elem.id === "cubeSize") {
        CubeContainer.cubeSize = i;
    } else if (elem.id === "rotationX") {
        CubeContainer.rotX = i;
    } else if (elem.id === "rotationY") {
        CubeContainer.rotY = i;
    }
}

//add cube to cubeArray and fix it
function addCubeToCubeArray() {
    var cube = {
        alias : CubeContainer.alias,
        boxX : CubeContainer.boxX,
        boxY : CubeContainer.boxY,
        cubeSize : CubeContainer.cubeSize,
        rotX : CubeContainer.rotX,
        rotY: CubeContainer.rotY
    };
    CubeArray.push(cube);
}

function allCubesIntoHTML(cubes) {
    var cubeHTML = "";
    var num = 1;

    cubes.forEach(function(cube) {
            cubeHTML = cubeHTML + "<div>"+ num +"</div>"+
                "<button onclick=\"showCube('"+ cube._id +"')\"> Show </button>"+
                "<ul><li>" + cube._id +"</li>"+
                "<li> Alias: "+ cube.alias +"</li>"+
                "<li> x-coordinate: "+ cube.boxX +"</li>"+
                "<li> y-coordinate: "+ cube.boxY +"</li>"+
                "<li> cube size: "+ cube.cubeSize +"</li>"+
                "<li> rotation x: "+ cube.rotX + "</li>"+
                "<li> rotation y: "+ cube.rotY +"</li></ul>";
            num = num + 1;
        });

    document.getElementById('saved-cubes-list').innerHTML = cubeHTML;
}

//get alias from input field
function updateAlias() {
    if( document.getElementById('cubeAlias').value != ""){
        CubeContainer.alias = document.getElementById('cubeAlias').value;
    }
    document.getElementById("cube-alias-input").innerHTML = "Current cube alias: "+ CubeContainer.alias;
}

//show cube, when button clicked
function showCube(id) {
    //search for cube with correct id in allCubes list
    //search field "_id"
    allCubes.forEach(function(cube){
        if(cube._id === id){
            CubeContainer.alias = cube.alias;
            CubeContainer.boxX = cube.boxX;
            CubeContainer.boxY = cube.boxY;
            CubeContainer.cubeSize = cube.cubeSize;
            CubeContainer.rotX = cube.rotX;
            CubeContainer.rotY = cube.rotY;
        }
    });
    setSliders();
    updateAlias();
}

//update cube list, find all cubes in DB
function updateCubeList() {
    console.log("getting list of cubes");

    var request = $.ajax({
        type: "GET",
        url: "/cubes",
        contentType: "text"
    });
    request.done(function(response){
        //console.log("allcubes: "+response);
        allCubes = response;
        // add updated information to DOM
        allCubesIntoHTML(response);
    });
}

//post button values
function postValues() {
    console.log("posting values");
    $.ajax({
        type: "POST",
     // method: "POST",
        url: "/cubes",
        processData: false,
        contentType: "application/json",
        data: JSON.stringify(CubeContainer)
     // dataType: "json"   
    }).done(function() {
        console.log("Cube Data was saved.");
        updateCubeList();
    });
}

window.onload = updateCubeList;