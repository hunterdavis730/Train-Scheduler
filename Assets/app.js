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
        $('<td>').text(trainName).addClass('train-col'),
        $('<td>').text(destination).addClass('dest-col'),
        $('<td>').text(trainFrequency + ' minutes').addClass('freq-col'),
        $('<td>').text(nextTrain.format("h:mm a")).addClass('next-col'),
        $('<td>').text(`${minutesUntilTrain} minutes`),

    );

    newRow.addClass('row-edit')

    $("#train-schedule > tbody").append(newRow);
})





// $(document).on('click', '.fa-edit', function () {
//     var value = $('.row-edit').attr('contenteditable');

//     if (value == 'false') {
//         $('.row-edit').attr('contenteditable', 'true');
//     } else {
//         $('.row-edit').attr('contenteditable', 'false')
//     }

//     var trainFrequency = parseInt($('.freq-col').val())

//     var diffTime = moment().diff(moment(convertedFirstTrainSchedule), "minutes");
//     console.log(diffTime)

//     var timeRemaining = diffTime % trainFrequency;

//     var minutesUntilTrain = trainFrequency - timeRemaining;



//     var nextTrain = moment().add(minutesUntilTrain, "minutes");

// })


// $("#mylabel").click(function () {
//     var value = $('#editablediv').attr('contenteditable');

//     if (value == 'false') {
//         $('#editablediv').attr('contenteditable', 'true');
//     }
//     else {
//         $('#editablediv').attr('contenteditable', 'false');
//     }
// });





$(document).ready(function () {




    $('#search').click(function () {
        event.preventDefault();
        if ($('#train-name').val() !== '' && $('#destination').val() !== '' &&
            $('#first-train').val() !== '' && $('#frequency').val() !== '') {
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

            $('#train-name').val('');
            $('#destination').val('');
            $('#first-train').val('');
            $('#frequency').val('');
        }
    })


})

// $(document).on('click', '#submit', function () {

//     var station = $('#station-name').val().trim();
//     var destination = $('#destination-uk').val().trim();

//     // queryUrl = `http://transportapi.com/v3/uk/train/station/tiplock:${station}/live.json?app_id=${apiId}&app_key=${apiKey}&darwin=false&destination=tiploc${destination}&train_status=passenger`;
//     queryUrl = "https://transportapi.com/v3/uk/train/station/tiploc:watrloo/live.json?app_id=e48b0eb8&app_key=67997f00fbc415dd5ef417058e3e48ed&darwin=false&destination=tiploc:KNGX&train_status=passenger"
//     $.ajax({
//         url: queryUrl,
//         method: "GET"
//     }).then(function (response) {
//         console.log(response)

//     })
// })