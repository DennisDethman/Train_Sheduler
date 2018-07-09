    //test momnet.js.
    //current time
var myMoment = moment();
    var resultFormat = myMoment.format("LLLL");
    console.log(resultFormat);

$("#time").append("Current Time:" + "<br>" + resultFormat)

//****************************************************************************************************
//****************************************************************************************************


    //firebase config.. copy and paste from website..  change the rules to true
$(document).ready (function () {
    var config = {
        apiKey: "AIzaSyBOmopfhAJV7OgeLptT2lNS8ptD2lt21rA",
        authDomain: "testing4321-93901.firebaseapp.com",
        databaseURL: "https://testing4321-93901.firebaseio.com",
        projectId: "testing4321-93901",
        storageBucket: "testing4321-93901.appspot.com",
        messagingSenderId: "235088109037"
      };
firebase.initializeApp(config);

   
//****************************************************************************************************
//****************************************************************************************************
    
    // Assign the reference to the database to a variable named 'database'  
var database = firebase.database();

    //reference var        ("name of folder)
var trainRef = database.ref("train_data");

    //onclick event to store values in form 
$("#submitButton").on("click", function (){
	var name = $("#train-name-input").val().trim();
	var destination = $("#destination-input").val().trim();
	var firstTrain = $("#firstTrain-input").val().trim();
	var frequency = $("#frequency-input").val().trim();

    //push values to Firebase using reference var
	trainRef.push({
		name:name,
		destination:destination,
		firstTrain:firstTrain,
		frequency:frequency

	});

	return false;
});
    
    
$("#clearButton").on("click", function (){
	
    //remove and reset
	trainRef.remove().set();

	return false;
});
    
    
    
 
    //clear Firebase on exit 
//database.ref('train_data').onDisconnect().remove();
    

//****************************************************************************************************
//****************************************************************************************************

    
    //function for what to do when a new child is added, use this to create vars for moment.js calcs.
trainRef.on("child_added", function(anything) {
	
	var trainName = anything.val().name;
	var trainDest = anything.val().destination;
	var trainFirst = anything.val().firstTrain;
	var trainFreq = anything.val().frequency;

    //subtract 1 year for start time
	var startTimeConverted = moment(trainFirst, "hh:mm").subtract(1, "year");
    console.log(startTimeConverted);

    //calc .diff of startTime and current time, this calcs how many minutes since start time plus a year
    var dTime = moment().diff(moment(startTimeConverted), "minute");
    console.log("DIFFERENCE IN TIME: " + dTime);
    
    //calc remainder time between frequency user input(20m) and difference %
    var tRemain = dTime % trainFreq;
    console.log("REMAINDER: " + tRemain);

    //Minutes Until Train. frequency - remainder
    var tMinutesTillTrain = trainFreq - tRemain;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    //Next Train. current time + minutes to train. 
    var nextTrain = moment().add(tMinutesTillTrain, "minute");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    
    //output var for nextTrain
    var formatNextTrain = moment(nextTrain).format("hh:mm");
    console.log(formatNextTrain);
    
    //current time
    var currentTime = moment();

    //append to HTML in bootstrap
	$("tbody").append("<tr>" + "<td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq 
		+ "</td><td>" + formatNextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");

});

});



//remove(onComplete) 






