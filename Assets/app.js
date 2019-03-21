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

    var convertedSchedule = moment(firstTrain, scheduleFormat);

    console.log(convertedSchedule)


    console.log(typeof trainFrequency)




    var newRow = $("<tr>").append(
        $('<td>').text(trainName),
        $('<td>').text(destination),
        $('<td>').text(trainFrequency + ' minutes'),
        $('<td>').text('N/A'),
        $('<td>').text('N/A')
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