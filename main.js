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
    1: "A keni temperatur\xEB t\xEB lart\xEB shpesh?",
    2: "A ndjeheni t\xEB lodhur?",
    3: "Sa shpesh kolliteni?",
    4: "A teshtini n\xEB baza normale?",
    5: "A keni dhembje trupore?",
    6: "A keni shkuarje ose bllokim hunde?",
    7: "A keni dhimbje t\xEB fytit?",
    8: "A keni barkqitje?",
    9: "A keni dhimbje koke?",
    10: "A keni v\xEBshtir\xEBsi n\xEB frymarrje?"
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
            resultText = "<h1 class='endTitleText'>Keni simptona n\xEB mes COVID-19, ftohjes dhe gripit.</h1>"
            displayPercentages("CFG", CovidAccuracy, FtofjeAccuracy, GripiAccuracy)
        }else if(diagnosis == CovidAccuracy && diagnosis == FtofjeAccuracy){
            resultText = "<h1 class='endTitleText'>Keni simptona n\xEB mes COVID-19 dhe ftohjes</h1>"
            displayPercentages("CF", CovidAccuracy, FtofjeAccuracy, GripiAccuracy)
        }else if(diagnosis == CovidAccuracy && diagnosis == GripiAccuracy){
            resultText = "<h1 class='endTitleText'>Keni simptona n\xEB mes COVID-19 dhe gripit.</h1>"
            displayPercentages("CG", CovidAccuracy, FtofjeAccuracy, GripiAccuracy)
        }else if(diagnosis == CovidAccuracy){
            resultText = "<h1 class='endTitleText'>Ka mund\xEBsi q\xEB keni COVID-19.</h1>"
            displayPercentages("C", CovidAccuracy, FtofjeAccuracy, GripiAccuracy)
        }else if(diagnosis == FtofjeAccuracy){
            resultText = "<h1 class='endTitleText'>Ka mund\xEBsi q\xEB keni ftohje.</h1>"
            displayPercentages("F", CovidAccuracy, FtofjeAccuracy, GripiAccuracy)
        }else if(diagnosis == GripiAccuracy){
            resultText = "<h1 class='endTitleText'>Ka mund\xEBsi q\xEB keni grip.</h1>"
            displayPercentages("G", CovidAccuracy, FtofjeAccuracy, GripiAccuracy)
        }
    }
}

function displayPercentages(type, val1, val2, val3){
    if(type == "CFG"){
        subResultText = "Jemi " + getPercentage(val1, 23) + "% t\xEB sigurt se keni COVID-19 dhe <br> " + getPercentage(val2, 26) + "% q\xEB keni ftohje <br> kurse kaq" + getPercentage(val3, 27) + " q\xEB keni grip."
    }else if(type == "CF"){
        subResultText = "Jemi " + getPercentage(val1, 23) + "% t\xEB sigurt se keni COVID-19 dhe <br> " + getPercentage(val2, 26) + "% q\xEB keni ftohje."
    }else if(type == "CG"){
        subResultText = "Jemi " + getPercentage(val1, 23) + "% t\xEB sigurt se keni COVID-19 dhe <br> " + getPercentage(val3, 27) + "% q\xEB keni grip."
    }else if(type == "C"){
        subResultText = "Jemi " + getPercentage(val1, 23) + "% t\xEB sigurt se keni COVID-19."
    }else if(type == "F"){
        subResultText = "Jemi " + getPercentage(val2, 26) + "% t\xEB sigurt se keni ftofje."
    }else if(type == "G"){
        subResultText = "Jemi " + getPercentage(val3, 27) + "% t\xEB sigurt se keni grip."
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
    $("body").append("<button class='endButton' onclick='location.reload()'>Përsërit testin</button>")
}