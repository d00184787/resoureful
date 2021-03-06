//////////////Define Objects and see if it working////////////////
console.log("It works!");

Input1 = document.querySelector("#Input1");
console.log("Input1 ", Input1);

Input2 = document.querySelector("#Input2");
console.log("Input2 ", Input2);

Input3 = document.querySelector("#Input3");
console.log("Input3 ", Input3);

Input4 = document.querySelector("#Input4");
console.log("Input4 ", Input4);

Input5 = document.querySelector("#Input5");
console.log("Input5 ", Input5);



var opsList = document.querySelector('#opsList');


var list_of_ops;
var list_of_

var opsClientInfo;


//////////////Create the Operartors Display Box////////////////

var pinOpsPaper = function(opsClientInfo) { //(Must be done through GET) <- SHOULD NOT BE DONE THROUGH GET
	
	var displayContainer = document.querySelector("#displayContainer")

	var opsContainer = document.createElement("div");

	var OpsHeaderContainer = document.createElement("div");
	var icon = document.createElement("img"); //UNQUIE
	var name = document.createElement("h3"); //UNQUIE

	var info1 = document.createElement("div");
	var info2 = document.createElement("div");
	var info3 = document.createElement("div");

	var country = document.createElement("span"); //UNQUIE
	var side = document.createElement("span"); //UNQUIE
	var weapon = document.createElement("span"); //UNQUIE

	var smallerIcon1 = document.createElement("img"); //UNQUIE
	var smallerIcon2 = document.createElement("img"); //UNQUIE
	var smallerIcon3 = document.createElement("img"); //UNQUIE

	opsContainer.className = "opsContainer";
	OpsHeaderContainer.className = "OpsHeaderContainer";
	icon.className = "icon"
	name.className = "name"

	info1.className = "info"
	info2.className = "info"
	info3.className = "info"

	country.className = "country"
	side.className = "side"
	weapon.className = "weapon"

	smallerIcon1.className = "smallerIcon"
	smallerIcon2.className = "smallerIcon"
	smallerIcon3.className = "smallerIcon"

	displayContainer.appendChild(opsContainer)

	opsContainer.appendChild(OpsHeaderContainer)
	OpsHeaderContainer.appendChild(icon)

	OpsHeaderContainer.appendChild(name)
	name.innerHTML = opsClientInfo['name'].charAt(0).toUpperCase() + opsClientInfo['name'].substr(1)

	opsContainer.appendChild(info1)
	info1.appendChild(country)
	country.innerHTML = opsClientInfo['country'].charAt(0).toUpperCase() + opsClientInfo['country'].substr(1)
	info1.appendChild(smallerIcon1)

	opsContainer.appendChild(info2)
	info2.appendChild(side)
	side.innerHTML = opsClientInfo['side'].charAt(0).toUpperCase() + opsClientInfo['side'].substr(1)
	info2.appendChild(smallerIcon2)

	opsContainer.appendChild(info3)
	info3.appendChild(weapon)
	weapon.innerHTML = opsClientInfo['weapon'].charAt(0).toUpperCase() + opsClientInfo['weapon'].substr(1)
	info3.appendChild(smallerIcon3)

	//IMPORTANT: THIS IS HOW MAKE EACH LIST HAVE BUTTON THAT SPECIFIC FOR THAT LIST.
	var deleteButton = document.createElement("button")
	var editButton = document.createElement("button")

	editButton.innerHTML = "EDIT"
	opsContainer.appendChild(editButton)

	deleteButton.innerHTML = "DELETE"
	opsContainer.appendChild(deleteButton)

	deleteButton.onclick = function () {
		deleteOps(opsClientInfo) //Send in the entire INFO, but at Delete Function you grab the ID
	}

	editButton.onclick = function() {
		overrideOps(opsClientInfo)
	}

	filepath1 = checkForOpsPics(opsClientInfo['name'])
	icon.src = filepath1

	filepath2 = checkForCountryPics(opsClientInfo['country'])
	smallerIcon1.src = filepath2

	filepath3 = checkForSidePics(opsClientInfo['side'])
	smallerIcon2.src = filepath3

	filepath4 = checkForWeaponPics(opsClientInfo['weapon'])
	smallerIcon3.src = filepath4
};


//////////////Read the Inputs and Creates////////////////


getInput = function(){
	opsClientInfo = {
	"name": Input1.value,
	"country": Input2.value,
	"side": Input3.value,
	"weapon": Input4.value,
	"age": Input5.value
	}
	console.log("All the Ops Info: ", opsClientInfo)
}


resetInput = function(){

	Input1.innerHTML = ""
	Input2.innerHTML = ""
	Input3.innerHTML = ""
	Input4.innerHTML = ""
	Input5.innerHTML = ""
}


Create.onclick = function(){
	getInput()
	createOps(opsClientInfo)
	resetInput()
}

//////////////FETCH GET//////////////////

var getOps = function(opsClientInfo){
fetch("http://localhost:8080/operators").then(function (response) {
	response.json().then(function(theData){
	  	list_of_ops = theData;

		//UPDATE THE PAGE
		refreshPage(list_of_ops)
  	});
});
};

//////////////Create the Operartors Display Box////////////////

var createOps = function(opsClientInfo) {

	var Data = 'name=' + encodeURIComponent(opsClientInfo['name']) +
		'&country=' + encodeURIComponent(opsClientInfo['country']) +
		'&side=' + encodeURIComponent(opsClientInfo['side']) +
		'&weapon=' + encodeURIComponent(opsClientInfo['weapon']) +
		'&age=' + encodeURIComponent(opsClientInfo['age']);

	fetch("http://localhost:8080/operators",{
		method: "POST",
		body: Data,
		headers: {"content-type":"application/x-www-form-urlencoded"}
	}).then(function (response) {
		console.log("Cool, you were able create something:", Data)
		//Refresh The page
		getOps() //get all current info so once it refresh it up to date
		refreshPage(list_of_ops)
  	});
};

//////////////FETCH DELETE////////////////

var deleteOps = function(opsClientInfo) {
	if (confirm("You sure you want to delete " + opsClientInfo['name'] + "?")){
		console.log("Deleting Ops with ID", opsClientInfo.id);
		fetch(`http://localhost:8080/operators/${opsClientInfo.id}`
			,{
			method: "DELETE"
		}).then(function () {
			console.log("Cool, you were able delete the operartor")

			//Refresh The page
			getOps() //get all current info so once it refresh it up to date
			refreshPage(list_of_ops)
  		});
		}
	};

//////////////////MODIFY & PUT///////////////////////////////

//Before sending to editsOps, check current form to see the updated 
var overrideOps = function(opsClientInfo) {
	if (Input1.value != ""){
		opsClientInfo['name'] = Input1.value}
	if (Input2.value != ""){
		opsClientInfo['country'] = Input2.value}
	if (Input3.value != ""){
		opsClientInfo['side'] = Input3.value}
	if (Input4.value != ""){
		opsClientInfo['weapon'] = Input4.value}
	if (Input5.value != ""){
		opsClientInfo['age'] = Input5.value}

	editOps(opsClientInfo)
}

var editOps = function(opsClientInfo) {

	var Data = 'name=' + encodeURIComponent(opsClientInfo['name']) +
		'&country=' + encodeURIComponent(opsClientInfo['country']) +
		'&side=' + encodeURIComponent(opsClientInfo['side']) +
		'&weapon=' + encodeURIComponent(opsClientInfo['weapon']) +
		'&age=' + encodeURIComponent(opsClientInfo['age']);

	console.log("You are modify OPs with ID", opsClientInfo.id)

	fetch(`http://localhost:8080/operators/${opsClientInfo.id}`
		,{
		method: "PUT",
		body: Data,
		headers: {"content-type":"application/x-www-form-urlencoded"}
	}).then(function (response) {
		console.log("Cool, you were able modify something:", Data)

		//Refresh The page
		getOps() //get all current info so once it refresh it up to date
		refreshPage(list_of_ops)
  	});
}


/////////////////REFRESH THE PAGE//////////////////////////////
var refreshPage = function(list_of_ops){
	deleteDisplay()
	createDisplay(list_of_ops)
}

var createDisplay = function(list_of_ops){
	//Create the entire list
	
	for (i=0; i < list_of_ops.length; i++){
		console.log(list_of_ops[i])
		pinOpsPaper(list_of_ops[i])
		console.log(list_of_ops)
		console.log("building ", list_of_ops[i])
	}
	
	console.log('All the entrys has been created')
}

var deleteDisplay = function(){
	//Empty the entire list
	var opsList = document.querySelector("#displayContainer")
	while (opsList.firstChild){
		opsList.removeChild(opsList.firstChild)
	}
	console.log('All the entrys has been deleted')
}

///////////////////////CHECK FOR PICTURES/////////////////////////

ops_pic = [
	{name:"ash", filepath:"./ops_pic/ash.png"},
	{name:"capitao", filepath:"./ops_pic/capitao.png"},
	{name:"echo", filepath:"./ops_pic/echo.png"},
	{name:"IQ", filepath:"./ops_pic/IQ.png"},
	{name:"montage", filepath:"./ops_pic/montage.png"},
	{name:"smoke", filepath:"./ops_pic/smoke.png"},
	{name:"valkyrie", filepath:"./ops_pic/valkyrie.png"},
	{name:"bandit", filepath:"./ops_pic/bandit.png"},
	{name:"castle", filepath:"./ops_pic/castle.png"},
	{name:"frost", filepath:"./ops_pic/frost.png"},
	{name:"jager", filepath:"./ops_pic/jager.png"},
	{name:"mute", filepath:"./ops_pic/mute.png"},
	{name:"tachaka", filepath:"./ops_pic/tachaka.png"},
	{name:"vigil", filepath:"./ops_pic/vigil.png"},
	{name:"blackbeard", filepath:"./ops_pic/blackbeard.png"},
	{name:"caveira", filepath:"./ops_pic/caveira.png"},
	{name:"fuze", filepath:"./ops_pic/fuze.png"},
	{name:"kapkan", filepath:"./ops_pic/kapkan.png"},
	{name:"pulse", filepath:"./ops_pic/pulse.png"},
	{name:"thatcher", filepath:"./ops_pic/thatcher.png"},
	{name:"blitz", filepath:"./ops_pic/blitz.png"},
	{name:"glaz", filepath:"./ops_pic/glaz.png"},
	{name:"lesion", filepath:"./ops_pic/lesion.png"},
	{name:"rook", filepath:"./ops_pic/rook.png"},
	{name:"thermite", filepath:"./ops_pic/thermite.png"},
	{name:"buck", filepath:"./ops_pic/buck.png"},
	{name:"doc", filepath:"./ops_pic/doc.png"},
	{name:"hibana", filepath:"./ops_pic/hibana.png"},
	{name:"mira", filepath:"./ops_pic/mira.png"},
	{name:"sledge", filepath:"./ops_pic/sledge.png"},
	{name:"twitch", filepath:"./ops_pic/twitch.png"}
]

country_pic = [
	{name:"america", filepath:"./country_pic/america.png"},
	{name:"britan", filepath:"./country_pic/britan.png"},
	{name:"china", filepath:"./country_pic/china.png"},
	{name:"france", filepath:"./country_pic/france.png"},
	{name:"italy", filepath:"./country_pic/italy.png"},
	{name:"korea", filepath:"./country_pic/korea.png"},
	{name:"russia", filepath:"./country_pic/russia.png"},
	{name:"brazil", filepath:"./country_pic/brazil.png"},
	{name:"canada", filepath:"./country_pic/canada.png"},
	{name:"germany", filepath:"./country_pic/germany.png"},
	{name:"japan", filepath:"./country_pic/japan.png"},
	{name:"poland", filepath:"./country_pic/poland.png"},
	{name:"spain", filepath:"./country_pic/spain.png"}
]

side_pic = [
	{name:"attacking", filepath:"./side_pic/attacking.png"},
	{name:"defending", filepath:"./side_pic/defending.png"}
]


weapon_pic = [
	{name:"sniper", filepath:"./weapon_pic/sniper.png"},
	{name:"rifle", filepath:"./weapon_pic/rifle.png"},
	{name:"pistol", filepath:"./weapon_pic/pistol.png"}
]

var checkForOpsPics = function(name){
	filepath = "./ops_pic/default.png"
	name = name.toLowerCase()

	for (x=0; x < ops_pic.length; x++){
		console.log("I made loop this amount of time: ", x)
		if (name == ops_pic[x]['name']){
			filepath = ops_pic[x]['filepath']
		}
	}
	return filepath
}

var checkForCountryPics = function(country){
	filepath = "./country_pic/default.png"
	country = country.toLowerCase()

	for (w=0; w < country_pic.length; w++){
		if (country == country_pic[w]['name']){
			filepath = country_pic[w]['filepath']}
	}

	return filepath
}

var checkForSidePics = function(side){
	filepath = "./side_pic/default.png"
	side = side.toLowerCase()

	for (q=0; q < side_pic.length; q++){
		if (side == side_pic[q]['name']){
			filepath = side_pic[q]['filepath']}
	}
	return filepath
}

var checkForWeaponPics = function(weapon){
	filepath = "./weapon_pic/default.png"
	weapon = weapon.toLowerCase()
	for (a=0; a < weapon_pic.length; a++){
		if (weapon == weapon_pic[a]['name']){
			filepath = weapon_pic[a]['filepath']}
	}

	return filepath
}

////////RUN ON PAGE LOAD////////////

getOps()

