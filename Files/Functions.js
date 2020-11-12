//  The JavaScript code is property to Mr. You (Kristiyan Valchev) and can only be viewed
//  If you want to use part of the code, please first contact me: mr.youdevelopment@gmail.com

var sideMenuState = 0;
function openCloseSideMenu()
{
    var sideMenu = document.getElementById("sideMenu");
    var bigSideBox = document.getElementById("bigSideBox");
    var firstLine = document.getElementById("firstLine");
    var secondLine = document.getElementById("secondLine");

    var dropdownList01 = document.getElementById("урочноСъдържаниеList");
    var dropdownList02 = document.getElementById("изпитванеList");

    if (sideMenuState == 0)
    {
        document.getElementById("topBarName").style.color = "#fefefe";
        sideMenu.style.transform = "translateY(8px)"
        bigSideBox.style.top = 92;
        bigSideBox.style.left = 0;
        bigSideBox.style.height = "3000px";
        bigSideBox.style.transform = "rotate(-90deg)";
        secondLine.style.width = "100%";
        firstLine.style.transform = "rotate(45deg)";
        secondLine.style.transform = "rotate(-45deg)";
        firstLine.style.top = "calc(50% - 2px)";
        secondLine.style.top = "calc(50% - 2px)";
        secondLine.style.bottom = "auto";

        sideMenuState = 1;
    }
    else if (sideMenuState == 1)
    {
        document.getElementById("topBarName").style.color = "#111111";
        sideMenu.style.transform = "translateY(calc(-100% - 92px))"
        bigSideBox.style.top = 0;
        bigSideBox.style.left = "50%";
        bigSideBox.style.height = "1100px";
        bigSideBox.style.transform = "rotate(-50deg)";
        document.getElementById("sideMenuButton").innerHTML = '<div id = "firstLine"></div><div id = "secondLine"></div>';

        dropdownList01.style.display = "none";
        dropdownList02.style.display = "none";

        sideMenuState = 0;
    }
}

function openCloseSideMenuDropdown(sideMenuDropdownID)
{
    if (document.getElementById(sideMenuDropdownID).getAttribute("style") == "display: inline-block;")
        document.getElementById(sideMenuDropdownID).style.display = "none";
    else if (document.getElementById(sideMenuDropdownID).getAttribute("style") == "display: none;" || document.getElementById(sideMenuDropdownID).getAttribute("style") == null)
        document.getElementById(sideMenuDropdownID).style.display = "inline-block";
}

window.onscroll = function(e)
{  
    var bigSideBox = document.getElementById("bigSideBox");

    document.getElementById("topBarName").style.color = "#111111";
    document.getElementById("sideMenu").style.transform = "translateY(calc(-100% - 92px))"
    bigSideBox.style.top = 0;
    bigSideBox.style.left = "50%";
    bigSideBox.style.height = "1100px";
    bigSideBox.style.transform = "rotate(-50deg)";
    document.getElementById("sideMenuButton").innerHTML = '<div id = "firstLine"></div><div id = "secondLine"></div>';

    document.getElementById("урочноСъдържаниеList").style.display = "none";
    document.getElementById("изпитванеList").style.display = "none";

    sideMenuState = 0;

    closeRightClickMenu();
} 

function setActiveGrade(setActiveGradeBoxID)
{
    var gradePath = "schoolProgram/" + setActiveGradeBoxID.toString() + ".html";
    console.log(gradePath);
    
    var allGradeBoxes = document.getElementsByClassName("listBox");
    for (i = 0; i < allGradeBoxes.length; i++)
        allGradeBoxes[i].className = "listBox";

    allGradeBoxes[allGradeBoxes.length - 1].className += " Last";

    document.getElementById(setActiveGradeBoxID).className += " Active";
    document.getElementById("afterGradeSelectionButton").setAttribute("href", gradePath);
    document.getElementById("afterGradeSelectionButton").className = "pageContentSectionButton";
}

function signFormPopUp(signFormID)
{
    document.getElementById(signFormID).style.display = "unset";
}

function signFormHide(signFormID, emailField, passwordField, emailFieldLabel, passwordFieldLabel, FNField, IDCodeField, FNFieldLabel, IDCodeFieldLabel)
{
    document.getElementById("Error invalidFN").style.display = "none";
    document.getElementById("Error invalidEmail").style.display = "none";
    document.getElementById("Error existingEmail").style.display = "none";
    document.getElementById("Error invalidPassword").style.display = "none";
    document.getElementById("Error wrongPassword").style.display = "none";
    document.getElementById("Error nonExistingUser").style.display = "none";
    document.getElementById("Error toManyRequests").style.display = "none";

    try
    {
        document.getElementById(FNField).value = "";
        document.getElementById(IDCodeField).value = "";
    } catch {}

    document.getElementById(emailField).value = "";
    document.getElementById(passwordField).value = "";

    try
    {
        document.getElementById(FNField).style.borderBottomColor = "#fefefe";
        document.getElementById(FNFieldLabel).style.color = "#fefefe80";
        document.getElementById(IDCodeField).style.borderBottomColor = "#fefefe";
        document.getElementById(IDCodeFieldLabel).style.color = "#fefefe80";
    } catch {}

    document.getElementById(emailField).style.borderBottomColor = "#fefefe";
    document.getElementById(emailFieldLabel).style.color = "#fefefe80";
    document.getElementById(passwordField).style.borderBottomColor = "#fefefe";
    document.getElementById(passwordFieldLabel).style.color = "#fefefe80";

    document.getElementById(signFormID).style.display = "none";
}

function desableElement(elementID, timerSeconds)
{
    window.setTimeout(function()
    {
        var label = document.getElementById(elementID);
        if (label != null)
        {
            label.style.display = "none";
        }
    }, timerSeconds * 1000);
}

function closeRightClickMenu()
{
    document.getElementById("rightClickMenu").style.display = "none";
}

var canCoppyText = false;
var rangeObject = window.getSelection()
var range = rangeObject.toString();
function checkIfSelectedText()
{
    canCoppyText = false;
    rangeObject = window.getSelection()
    range = rangeObject.toString();
    if (range)
    {
        canCoppyText = true;
        document.getElementById("rightClickMenuCopyTextButton").className = "";
    }
    else document.getElementById("rightClickMenuCopyTextButton").className = "Unactive";
}

function copySelectedText()
{
    if (canCoppyText)
    {
        var dummy = document.createElement("input");
        document.body.appendChild(dummy);
        dummy.setAttribute("id", "dummy_id");
        document.getElementById("dummy_id").value = range;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
    }
    else document.getElementById("rightClickMenuCopyTextButton").className = "Unactive";
}

function checkTimerCheckBox()
{
    if (document.getElementById("timerBoolCheckBox").checked)
    {
        document.getElementById("questionsTimeInputField").className = "inputField";
        document.getElementById("questionsTimeInputFieldText").removeAttribute("disabled");
    }
    else
    {
        document.getElementById("questionsTimeInputField").className = "inputField Unavailable";
        document.getElementById("questionsTimeInputFieldText").setAttribute("disabled", "D");
    }
}

var maxBLQuestionsNumber = 22;
var maxLQuestionsNumber5 = 1;
var maxLQuestionsNumber6 = 1;
var maxLQuestionsNumber7 = 1;
var maxLQuestionsNumber8 = 1;
var maxLQuestionsNumber9 = 1;
var maxLQuestionsNumber10 = 1;
var maxLQuestionsNumber11 = 1;
var maxLQuestionsNumber12 = 1;
function startBGTest(questionTimerBoolID, questionTimeID, questionNumberID, endTestTitle)
{
    var questionTime = document.getElementById(questionTimeID).value;
    var questionNumber = document.getElementById(questionNumberID).value;
    
    if (questionTime < 30) sessionStorage.setItem("questionTime", 30);
    else if (questionTime > 180) sessionStorage.setItem("questionTime", 180);
    else sessionStorage.setItem("questionTime", questionTime);

    if (questionNumber < 5) sessionStorage.setItem("questionNumber", 5);
    else if (questionNumber > 30) sessionStorage.setItem("questionNumber", 30);
    else sessionStorage.setItem("questionNumber", questionNumber);

    if (document.getElementById(questionTimerBoolID).checked) sessionStorage.setItem("haveQuestionTimer", 1);
    else sessionStorage.setItem("haveQuestionTimer", 0);
    sessionStorage.setItem("currentQuestions", 0);
    sessionStorage.setItem("testType", "BL");
    sessionStorage.setItem("endTestTitle", endTestTitle);

    location.replace("../Test/Test.html");
}

function startLTest(questionTimerBoolID, questionTimeID, gradeID, questionNumberID, endTestTitle)
{
    var questionTime = document.getElementById(questionTimeID).value;
    var Grade = document.getElementById(gradeID).value;
    var questionNumber = document.getElementById(questionNumberID).value;
    
    if (questionTime < 30) sessionStorage.setItem("questionTime", 30);
    else if (questionTime > 180) sessionStorage.setItem("questionTime", 180);
    else sessionStorage.setItem("questionTime", questionTime);

    if (Grade < 5) sessionStorage.setItem("Grade", 5);
    else if (Grade > 12) sessionStorage.setItem("Grade", 12);
    else sessionStorage.setItem("Grade", Grade);

    if (questionNumber == null) sessionStorage.setItem("questionNumber", 5);
    else if (questionNumber < 5) sessionStorage.setItem("questionNumber", 5);
    else if (questionNumber > 30) sessionStorage.setItem("questionNumber", 30);
    else sessionStorage.setItem("questionNumber", questionNumber);

    if (document.getElementById(questionTimerBoolID).checked) sessionStorage.setItem("haveQuestionTimer", 1);
    else sessionStorage.setItem("haveQuestionTimer", 0);
    sessionStorage.setItem("currentQuestions", 0);
    sessionStorage.setItem("testType", "L");
    sessionStorage.setItem("endTestTitle", endTestTitle);

    location.replace("../Test/Test.html");
}

function startCTest(questionTimerBoolID, questionTimeID, gradeID, questionNumberID, endTestTitle)
{
    var questionTime = document.getElementById(questionTimeID).value;
    var Grade = document.getElementById(gradeID).value;
    var questionNumber = document.getElementById(questionNumberID).value;
    
    if (questionTime < 30) sessionStorage.setItem("questionTime", 30);
    else if (questionTime > 180) sessionStorage.setItem("questionTime", 180);
    else sessionStorage.setItem("questionTime", questionTime);

    if (Grade < 5) sessionStorage.setItem("Grade", 5);
    else if (Grade > 12) sessionStorage.setItem("Grade", 12);
    else sessionStorage.setItem("Grade", Grade);

    if (questionNumber == null) sessionStorage.setItem("questionNumber", 5);
    else if (questionNumber < 5) sessionStorage.setItem("questionNumber", 5);
    else if (questionNumber > 30) sessionStorage.setItem("questionNumber", 30);
    else sessionStorage.setItem("questionNumber", questionNumber);

    if (document.getElementById(questionTimerBoolID).checked) sessionStorage.setItem("haveQuestionTimer", 1);
    else sessionStorage.setItem("haveQuestionTimer", 0);
    sessionStorage.setItem("currentQuestions", 0);
    sessionStorage.setItem("testType", "C");
    sessionStorage.setItem("endTestTitle", endTestTitle);

    location.replace("../Test/Test.html");
}

function loadTestData()
{
    var testType = sessionStorage.getItem("testType");
    var haveQuestionTimer = sessionStorage.getItem("haveQuestionTimer");
    var questionTime = sessionStorage.getItem("questionTime");
    var Grade = sessionStorage.getItem("Grade");
    var questionNumber = sessionStorage.getItem("questionNumber");
    var currentQuestions = sessionStorage.getItem("currentQuestions");
    
    if (questionNumber != null && currentQuestions == 0)
    {
        var Data, questionID;

        currentQuestions++;
        
        if (testType == "BL")
        {
            Data = BLdataList;
            questionID = Math.floor((Math.random() * maxBLQuestionsNumber) + 1);
        }
        else if (testType == "L")
        {
            Data = eval("LdataList" + Grade.toString());
            questionID = Math.floor((Math.random() * eval("maxLQuestionsNumber" + Grade.toString())) + 1);
        }
        else if (testType == "C")
        {
            var BLorL = Math.floor((Math.random() * 2) + 1);
            if (BLorL == 1)
            {
                Data = eval("LdataList" + Grade.toString());
                questionID = Math.floor((Math.random() * eval("maxLQuestionsNumber" + Grade.toString())) + 1);
            }
            else
            {
                Data = BLdataList;
                questionID = Math.floor((Math.random() * maxBLQuestionsNumber) + 1);
            }
        }

        document.getElementById("Question").innerHTML = Data[questionID - 1]["Question"];
        document.getElementById("AnswerA").innerHTML = Data[questionID - 1]["AnswerA"];
        document.getElementById("AnswerB").innerHTML = Data[questionID - 1]["AnswerB"];
        document.getElementById("AnswerC").innerHTML = Data[questionID - 1]["AnswerC"];
        document.getElementById("AnswerD").innerHTML = Data[questionID - 1]["AnswerD"];
        sessionStorage.setItem("rightAnswer", Data[questionID - 1]["rightAnswer"]);

        document.getElementById("testQuestionNumberTextInd").innerHTML = currentQuestions;
        document.getElementById("maximumTestQuestionsTextInd").innerHTML = questionNumber;

        sessionStorage.setItem("currentQuestions", currentQuestions);
        sessionStorage.setItem("rightAnswersCounter", 0);

        if (haveQuestionTimer == 0)
            document.getElementById("waveHolder").style.display = "none";
        else
        {
            document.getElementById("Wave").style.animation = "wave 15s infinite linear, timerAnimation " + questionTime.toString() + "s infinite linear";
            Timer = setTimeout(function()
            {
                nextQuestion();
            }, questionTime * 1000);
        }
    }
    else
    {
        clearTestData();
        location.replace("../Task/bulgarianLanguage.html");
    }
}

var Timer;
function nextQuestion()
{
    var testType = sessionStorage.getItem("testType");
    var haveQuestionTimer = sessionStorage.getItem("haveQuestionTimer");
    var questionTime = sessionStorage.getItem("questionTime");
    var Grade = sessionStorage.getItem("Grade");
    var questionNumber = sessionStorage.getItem("questionNumber");
    var currentQuestions = sessionStorage.getItem("currentQuestions");
    var rightAnswer = sessionStorage.getItem("rightAnswer");
    var rightAnswersCounter = sessionStorage.getItem("rightAnswersCounter");

    clearTimeout(Timer);

    if (currentQuestions == questionNumber)
    {
        if (document.getElementById("AnswerAInput").checked && rightAnswer == "AnswerA") rightAnswersCounter++;
        else if (document.getElementById("AnswerBInput").checked && rightAnswer == "AnswerB") rightAnswersCounter++;
        else if (document.getElementById("AnswerCInput").checked && rightAnswer == "AnswerC") rightAnswersCounter++;
        else if (document.getElementById("AnswerDInput").checked && rightAnswer == "AnswerD") rightAnswersCounter++;
        sessionStorage.setItem("rightAnswersCounter", rightAnswersCounter);

        if (sessionStorage.getItem("canTestEnd") == 1)
            location.replace("../Test/testResult.html");
    }
    else
    {
        if (haveQuestionTimer == 1)
        {
            document.getElementById("Wave").style.animation = "none";
            setTimeout(function()
            {
                document.getElementById("Wave").style.animation = "wave 15s infinite linear, timerAnimation " + questionTime.toString() + "s infinite linear";
            }, 100);

            Timer = setTimeout(function()
            {
                nextQuestion();
            }, questionTime * 1000);
        }

        if (document.getElementById("AnswerAInput").checked && rightAnswer == "AnswerA") rightAnswersCounter++;
        else if (document.getElementById("AnswerBInput").checked && rightAnswer == "AnswerB") rightAnswersCounter++;
        else if (document.getElementById("AnswerCInput").checked && rightAnswer == "AnswerC") rightAnswersCounter++;
        else if (document.getElementById("AnswerDInput").checked && rightAnswer == "AnswerD") rightAnswersCounter++;

        document.getElementById("AnswerAInput").checked = false;
        document.getElementById("AnswerBInput").checked = false;
        document.getElementById("AnswerCInput").checked = false;
        document.getElementById("AnswerDInput").checked = false;

        var Data, questionID;

        currentQuestions++;
        
        if (testType == "BL")
        {
            Data = BLdataList;
            questionID = Math.floor((Math.random() * maxBLQuestionsNumber) + 1);
        }
        else if (testType == "L")
        {
            Data = eval("LdataList" + Grade.toString());
            questionID = Math.floor((Math.random() * eval("maxLQuestionsNumber" + Grade.toString())) + 1);
        }
        else if (testType == "C")
        {
            var BLorL = Math.floor((Math.random() * 2) + 1);
            if (BLorL == 1)
            {
                Data = eval("LdataList" + Grade.toString());
                questionID = Math.floor((Math.random() * eval("maxLQuestionsNumber" + Grade.toString())) + 1);
            }
            else
            {
                Data = BLdataList;
                questionID = Math.floor((Math.random() * maxBLQuestionsNumber) + 1);
            }
        }

        document.getElementById("Question").innerHTML = Data[questionID - 1]["Question"];
        document.getElementById("AnswerA").innerHTML = Data[questionID - 1]["AnswerA"];
        document.getElementById("AnswerB").innerHTML = Data[questionID - 1]["AnswerB"];
        document.getElementById("AnswerC").innerHTML = Data[questionID - 1]["AnswerC"];
        document.getElementById("AnswerD").innerHTML = Data[questionID - 1]["AnswerD"];
        sessionStorage.setItem("rightAnswer", Data[questionID - 1]["rightAnswer"]);

        document.getElementById("testQuestionNumberTextInd").innerHTML = currentQuestions;

        sessionStorage.setItem("currentQuestions", currentQuestions);
        sessionStorage.setItem("rightAnswersCounter", rightAnswersCounter);

        if (currentQuestions == questionNumber) sessionStorage.setItem("canTestEnd", 1);
    }
}

function clearTestData()
{
    sessionStorage.removeItem("haveQuestionTimer");
    sessionStorage.removeItem("questionTime");
    sessionStorage.removeItem("Grade");
    sessionStorage.removeItem("questionNumber");
    sessionStorage.removeItem("currentQuestions");
    sessionStorage.removeItem("testType");
    sessionStorage.removeItem("rightAnswer");
    sessionStorage.removeItem("rightAnswersCounter");
    sessionStorage.removeItem("endTestTitle");
    sessionStorage.removeItem("canTestEnd");
    sessionStorage.removeItem("hasSavedRightWrongAnswers");
}

function defaultFunction()
{

}