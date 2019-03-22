var config = {
    apiKey: "AIzaSyBGaJq-NV883jlv43xV1My3mZIjT4z1M8Q",
    authDomain: "trainscheduler-10739.firebaseapp.com",
    databaseURL: "https://trainscheduler-10739.firebaseio.com",
    projectId: "trainscheduler-10739",
    storageBucket: "trainscheduler-10739.appspot.com",
    messagingSenderId: "295947901852"
};
firebase.initializeApp(config);

database = firebase.database();

const apiKey = "67997f00fbc415dd5ef417058e3e48ed";

const apiId = 'e48b0eb8';

var queryUrl = `http://transportapi.com/v3/uk/places.json?query=euston&type=train_station&app_id=${apiId}&app_key=${apiKey}`




var trainName = '';

var destination = '';

var firstTrain = '';

var trainFrequency = 0;






database.ref().on('child_added', function (childSnap) {
    console.log(childSnap.val())
    var ref = childSnap.val();

    var trainName = ref.trainName;
    var destination = ref.destination;
    var firstTrain = ref.firstTrain;
    console.log(firstTrain.length)


    if (firstTrain.length < 5) {
        firstTrain = "0" + firstTrain;
    }
    var trainFrequency = parseInt(ref.trainFrequency);



    var scheduleFormat = "hh:mm";

    var convertedFirstTrainSchedule = moment(firstTrain, scheduleFormat).subtract(1, "years");

    console.log(convertedFirstTrainSchedule)

    var currentTime = moment().format("hh:mm");

    var diffTime = moment().diff(moment(convertedFirstTrainSchedule), "minutes");
    console.log(diffTime)

    var timeRemaining = diffTime % trainFrequency;

    var minutesUntilTrain = trainFrequency - timeRemaining;



    var nextTrain = moment().add(minutesUntilTrain, "minutes");



    console.log(nextTrain)




    var newRow = $("<tr>").append(
        $('<td>').text(trainName),
        $('<td>').text(destination),
        $('<td>').text(trainFrequency + ' minutes'),
        $('<td>').text(nextTrain.format("h:mm a")),
        $('<td>').text(`${minutesUntilTrain} minutes`)
    );

    $("#train-schedule > tbody").append(newRow);
})














$(document).ready(function () {


    $('#search').click(function () {
        trainName = $('#train-name').val().trim();
        destination = $('#destination').val().trim();
        firstTrain = $('#first-train').val().trim();
        trainFrequency = $('#frequency').val().trim();

        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            trainFrequency: trainFrequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        })

        $('#train-name').val(' ');
        $('#destination').val(' ');
        $('#first-train').val(' ');
        $('#frequency').val(' ');

    })

})