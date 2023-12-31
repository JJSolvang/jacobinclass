// start by creating data so we don't have to type it in each time
let dataArray = [];

// define a constructor to create  objects
let ReviewObject = function (pName, pCity, pCuisine, pStars, pPoster) {
    this.name = pName;
    this.city = pCity;
    this.cuisine = pCuisine;  // action  comedy  drama  horrow scifi  musical  western
    this.stars = pStars;
    this.poster = pPoster;
}

// cant use reuire here *************************************
//const { WebPubSubServiceClient } = require('@azure/web-pubsub');

document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("getServerData").addEventListener("click", function () {
        createList("all", "");  
    });

    document.getElementById("getCity").addEventListener("click", function () {
        let which = document.getElementById("whichCity").value;
        createList("city",which);  
    });

    document.getElementById("postreview").addEventListener("click", function () {
        postnew();  
    });
    
});


function postnew() {
    let newName = document.getElementById("name").value;
    let newCity = document.getElementById("city").value;
    let newCuisine = document.getElementById("cuisine").value;
    let newStars = parseInt(document.getElementById("stars").value);
    let newPoster = document.getElementById("poster").value;

    let newOne = new ReviewObject(newName, newCity, newCuisine, newStars, newPoster);
    console.log(newOne);

   
    $.ajax({
    	// run locally
        //url : "https://jacobcosmosdatawriter.azurewebsites.net/api/jacobmongowriter",
        
        
        
        // run on azure
        url : "https://jacobcosmosdatawriter.azurewebsites.net/api/jacobmongowriter",
        
        

       
        
        type: "POST",
        data: JSON.stringify(newOne),
        contentType: "application/json; charset=utf-8",  
        //dataType   : "json",
        success: function (result) {
            console.log(result);
            //document.getElementById("name").value = "";
            //document.getElementById("city").value = "";
            //document.getElementById("cuisine").value = ""
            //document.getElementById("stars").value = "";
            //document.getElementById("poster").value = "";
            
          }
        });
}
  
function createList(which, city) {
       
    // if(which == "all"){
	// // run locally
    // let  URL = "http://localhost:7071/api/readfrommongosubset/?name=*";
    // }
    
    // if(which == "city"){
    // // subset
    // // run locally
    // let  URL = "http://localhost:7071/api/readfrommongosubset/?name="+city;
    // }

    // $.get(URL, function(data, status){ 
        
     
	// run local
    //$.get("http://localhost:7071/api/readfrommongo", function(data, status){ 
    
	// run on Azure
    $.get("https://jacobcosmosdatawriter.azurewebsites.net/api/jacobmongowriter", function(data, status){ 
        
    
    dataArray = JSON.parse(data);
    subsetArray = [];
    for(i = 0; i < dataArray.length; i++){
         subsetArray[i] = dataArray[i];
     }
       
                      
      //clear prior data
      let table = document.getElementById("tableResult");        
      table.innerHTML = "";  // remove previous data

        var header = table.createTHead();
        var hRow = header.insertRow(0);
        var hCell1 = hRow.insertCell(0);
        var hCell2 = hRow.insertCell(1);
        var hCell3 = hRow.insertCell(2);
        var hCell4 = hRow.insertCell(3);
        var hCell5 = hRow.insertCell(4);
        hCell1.innerHTML = "<b>Name</b>";
        hCell2.innerHTML = "<b>City</b>";
        hCell3.innerHTML = "<b>Cuisine</b>";
        hCell4.innerHTML = "<b>Stars</b>";
        hCell5.innerHTML = "<b>Poster</b>";
       

        for (let i = 0; i < subsetArray.length; i++) {
            let row = table.insertRow(-1);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);
            let cell5 = row.insertCell(4);
            cell1.innerHTML = subsetArray[i].name;
            cell2.innerHTML = subsetArray[i].city;
            cell3.innerHTML = subsetArray[i].cuisine 
            cell4.innerHTML = subsetArray[i].stars;
            cell5.innerHTML = subsetArray[i].poster;
        }

    });
}

