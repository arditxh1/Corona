let dataset = {
    "COVID" : {
        "Fever": 3,
        "Fatigue": 2,
        "Cough": 3,
        "Sneezing": 0,
        "Aches & Pains": 2,
        "Runny or stuffy nose": 1,
        "Sore throat": 2,
        "Diarrhea": 1,
        "Headache": 2,
        "Shortness of breath": 2
    },
    "Ftofje" : {
        "Fever": 1,
        "Fatigue": 2,
        "Cough": 2,
        "Sneezing": 3,
        "Aches & Pains": 3,
        "Runny or stuffy nose": 3,
        "Sore throat": 3,
        "Diarrhea": 0,
        "Headache": 1,
        "Shortness of breath": 0
    },
    "Gripi": {
        "Fever": 3,
        "Fatigue": 3,
        "Cough": 3,
        "Sneezing": 0,
        "Aches & Pains": 3,
        "Runny or stuffy nose": 2,
        "Sore throat": 2,
        "Diarrhea": 2,
        "Headache": 3,
        "Shortness of breath": 0
    }
}

let questions = {
    1: "Do you have signs of fever?",
    2: "Do you feel fatigue?",
    3: "Do you cough?",
    4: "A teshtini n\xEB baza normale?",
    5: "Do you feeel aches & pains?",
    6: "Do you have a runny or stuffy nose?",
    7: "Do you have a sore throat?",
    8: "Do you have diarrhea?",
    9: "Do you have headaches?",
    10: "Do you experince shortness of breath?"
}

let userData = [];
let iteration = 1;
let CovidAccuracy = 0;
let FtofjeAccuracy = 0;
let GripiAccuracy = 0;
let resultText = "";
let subResultText = "";

function setTitleQeustion(i, button){
    $("#TitleQuestion").fadeOut(500);
    setTimeout(changeTitle, 500, questions[i], button)
    $("#TitleQuestion").fadeIn(500);
    $("#circleProgres").removeClass("progress-" + (i - 1));
    $("#circleProgres").addClass("progress-" + (i));
    $(".overlay").text(i);
}

function changeTitle(title, button){
    $("#TitleQuestion").text(title);
    $(button).css("transform", "translateY(0)")
    $(button).css("opacity", "1")
}

function NextQuestion(button){
    iteration++;
    if(iteration <= 10){
        userData.push(button.value);
        setTitleQeustion(iteration, button);
        $(button).css("transform", "translateY(10rem)")
        $(button).css("opacity", "0")
    }else{
        ending();
        userData.push(button.value);

        let arr2 = Object.values(dataset['COVID']);
        var covidValues = userData.map((a, i) => a - arr2[i]);
        for (let index = 0; index < covidValues.length; index++) {
            CovidAccuracy += Math.abs(covidValues[index]);
        }
        console.log(covidValues);
        arr2 = Object.values(dataset['Ftofje']);
        var FtofjeValues = userData.map((a, i) => a - arr2[i]);
        for (let index = 0; index < FtofjeValues.length; index++) {
            FtofjeAccuracy += Math.abs(FtofjeValues[index]);
        }
        arr2 = Object.values(dataset['Gripi']);
        var GripiValues = userData.map((a, i) => a - arr2[i]);
        for (let index = 0; index < GripiValues.length; index++) {
            GripiAccuracy += Math.abs(GripiValues[index]);
        }
        diagnosis = Math.min(CovidAccuracy, FtofjeAccuracy, GripiAccuracy);
        console.log(CovidAccuracy, FtofjeAccuracy, GripiAccuracy);
        console.log(diagnosis);
        console.log(FtofjeAccuracy);
        if(diagnosis == CovidAccuracy && diagnosis == FtofjeAccuracy && diagnosis == GripiAccuracy){
            resultText = "<h1 class='endTitleText'>You have symptoms between COVID-19, a cold and the flu.</h1>"
            displayPercentages("CFG", CovidAccuracy, FtofjeAccuracy, GripiAccuracy)
        }else if(diagnosis == CovidAccuracy && diagnosis == FtofjeAccuracy){
            resultText = "<h1 class='endTitleText'>You have symptoms between COVID-19 and a cold</h1>"
            displayPercentages("CF", CovidAccuracy, FtofjeAccuracy, GripiAccuracy)
        }else if(diagnosis == CovidAccuracy && diagnosis == GripiAccuracy){
            resultText = "<h1 class='endTitleText'>You have symptoms between COVID-19 and the flu.</h1>"
            displayPercentages("CG", CovidAccuracy, FtofjeAccuracy, GripiAccuracy)
        }else if(diagnosis == CovidAccuracy){
            resultText = "<h1 class='endTitleText'>There's a chance that u have COVID-19.</h1>"
            displayPercentages("C", CovidAccuracy, FtofjeAccuracy, GripiAccuracy)
        }else if(diagnosis == FtofjeAccuracy){
            resultText = "<h1 class='endTitleText'>There's a chance that u have a cold.</h1>"
            displayPercentages("F", CovidAccuracy, FtofjeAccuracy, GripiAccuracy)
        }else if(diagnosis == GripiAccuracy){
            resultText = "<h1 class='endTitleText'>There's a chance that u have the flu.</h1>"
            displayPercentages("G", CovidAccuracy, FtofjeAccuracy, GripiAccuracy)
        }
    }
}

function displayPercentages(type, val1, val2, val3){
    if(type == "CFG"){
        subResultText = "We are " + getPercentage(val1, 23) + "% that you have COVID-19 and <br> " + getPercentage(val2, 26) + "% that u have a cold <br> but also" + getPercentage(val3, 27) + " sure that you have the flu."
    }else if(type == "CF"){
        subResultText = "We are " + getPercentage(val1, 23) + "% that you have COVID-19 and <br> " + getPercentage(val2, 26) + "% sure that u have a cold"
    }else if(type == "CG"){
        subResultText = "We are " + getPercentage(val1, 23) + "% that you have COVID-19 and <br> " + getPercentage(val3, 27) + "% sure that u have the flu."
    }else if(type == "C"){
        subResultText = "We are " + getPercentage(val1, 23) + "% that you have COVID-19."
    }else if(type == "F"){
        subResultText = "We are " + getPercentage(val2, 26) + "% that you have a cold."
    }else if(type == "G"){
        subResultText = "We are " + getPercentage(val3, 27) + "% that you have the flu."
    }
}

function getPercentage(val, num){
    console.log()
    console.log(val, num)
    console.log(Math.floor(((num - val) / num) * 100))
    return Math.floor(((num - val) / num) * 100)
}

$('html').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
	if (keycode == '13') {
		hideEntry();
	}
});

function hideEntry(){
	$('#entry').fadeOut(2000);
	$('#mainImg').css('transform', 'translate(-730px, 0px)');
    $('#textEntry').css('transform', 'translate(920px, 0px)');
    setTimeout(fadeInSurvey, 2000);
}

function fadeInSurvey(){
    $("#circleProgres").css("display", "flex");
    $("#buttons").css({"transform": "translateY(0rem)", "transition": ".3 ease"});
    $("#main").css({"transform": "translateY(0rem)", "transition": ".3 ease"});
    $("#circleProgres").css({"transform": "translateY(0rem)", "transition": ".3 ease"});
}

function ending(){
    $("#circleProgres").css("transform", "translateY(10rem)")
    $("#circleProgres").css("opacity", "0")
    $("#main").css("transform", "translateY(10rem)")
    $("#main").css("opacity", "0")
    $("#buttons").css("transform", "translateY(10rem)")
    $("#buttons").css("opacity", "0")
    setTimeout(endingDel, 500,)
}

function endingDel(){
    $("#buttons").remove();
    $("#main").remove();
    $("#circleProgres").remove();
    $("body").append(resultText)
    $("body").append("<h4 class='endPercentageText'>" + subResultText + "</h4>")
    $("body").append("<button class='endButton' onclick='location.reload()'>Retake the test</button>")
}