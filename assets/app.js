$(document).ready(function(){
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyA0B8XdG79voAFgK23mx5l2aY65w1TNl3k",
        authDomain: "traintimes-alpha.firebaseapp.com",
        databaseURL: "https://traintimes-alpha.firebaseio.com",
        projectId: "traintimes-alpha",
        storageBucket: "",
        messagingSenderId: "112684415383"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    $("#submit").on("click", function(e){
        e.preventDefault();
        var name = $("#train-name").val().trim();
        var dest = $("#train-destination").val().trim();
        var date = $("#train-start").val();
        var rate = $("#frequency").val();

        var startMonth = parseInt(date.slice(0, 2));
        var startYear = parseInt(date.slice(6));
        console.log(startMonth);
        console.log(startYear);
        var currentMonth = 11;
        var currentYear = 2018;

        var nextArival = (currentMonth - startMonth) + ((currentYear - startYear) * 12);
        console.log(nextArival);
        var minsRemaining = monthsWorked * rate;
        console.log(minsRemaining);

        database.ref().push({
            name: name,
            dest: dest,
            startDate: date,
            frequency: rate,
            monthsWorked: monthsWorked,
            totalBilled: totalBilled,
            
        });

    });

    database.ref().on("child_added", function(snapshot) {
        var name = snapshot.val().name;
        var role = snapshot.val().role;
        var rate = snapshot.val().monthlyRate;
        var startDate = snapshot.val().startDate;
        var monthsWorked = snapshot.val().monthsWorked;
        var totalBilled = snapshot.val().totalBilled;
        console.log(name);
        console.log(role);
        console.log(rate);
        console.log(startDate);
        console.log(monthsWorked);
        console.log(totalBilled);

        var newRow = $("<tr>");

        var nameCol = $("<td>");
        $(nameCol).attr("scope", "col");
        $(nameCol).text(name);
        var rateCol = $("<td>");
        $(rateCol).attr("scope", "col");
        $(rateCol).text(rate);
        var roleCol = $("<td>");
        $(roleCol).attr("scope", "col");
        $(roleCol).text(role);
        var startCol = $("<td>");
        $(startCol).attr("scope", "col");
        $(startCol).text(startDate);
        var monthsCol = $("<td>");
        $(monthsCol).attr("scope", "col");
        $(monthsCol).text(monthsWorked);
        var totalBilledCol = $("<td>");
        $(totalBilledCol).attr("scope", "col");
        $(totalBilledCol).text(totalBilled);

        $(newRow).append(nameCol);
        $(newRow).append(roleCol);
        $(newRow).append(startCol);
        $(newRow).append(monthsCol);
        $(newRow).append(rateCol);
        $(newRow).append(totalBilledCol);

        $("#employee-table").append(newRow);
    });

});