//  The JavaScript code is property to Mr. You (Kristiyan Valchev) and can only be viewed
//  If you want to use part of the code, please first contact me: mr.youdevelopment@gmail.com

var sideMenuState = 0;
function openCloseSideMenu()
{
    var sideMenu = document.getElementById("sideMenu");
    var bigSideBox = document.getElementById("bigSideBox");
    var firstLine = document.getElementById("firstLine");
    var secondLine = document.getElementById("secondLine");

    var dropdownList01 = document.getElementById("началоList");
    var dropdownList02 = document.getElementById("урочноСъдържаниеList");
    var dropdownList03 = document.getElementById("изпитванеList");

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
        dropdownList03.style.display = "none";

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

    document.getElementById("началоList").style.display = "none";
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
    sessionStorage.removeItem("hasBoughtCode");
}

function removeThis(elementID)
{
    document.getElementById(elementID).style.display = "none";
}

function buyCode()
{
    sessionStorage.setItem("hasBoughtCode", "true");
    location.replace("https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=DQANHJDYZ3R88");
}

function makeRandomString(Length)
{
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;

    for ( var i = 0; i < Length; i++ )
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    
    return result;
}

function getDropDownMenuData()
{
    if (document.getElementById("Title").innerHTML == "Онан - Купи")
    {
        var dropDownMenu = document.getElementById("dropDownMenu");
    
        if (dropDownMenu.innerHTML != "Избери предмет")
        {
            document.getElementById("doneButton").className = "pageContentSectionButton";
            document.getElementById("doneButton").setAttribute("onclick", "printAllAnnouncements()");
            sessionStorage.setItem("subjectSellSearch", dropDownMenu.innerHTML);
        }
    }
    else if (document.getElementById("Title").innerHTML == "Онан - Продай")
    {

    }
}

function printAllAnnouncements()
{
    document.getElementById("whatWillBuySection").style.display = "none";

    var announcementsSection = document.getElementById("announcementsSection");
    announcementsSection.style.display = "block";
    var pageContentSectionGridHolder = document.getElementById("pageContentSectionGridHolder");
    var gradeSellSearch = document.getElementById("gradeInputFieldText").value;
    var subjectSellSearch = sessionStorage.getItem("subjectSellSearch");
    sessionStorage.removeItem("subjectSellSearch");
    
    cloudData.doc("Announcements/" + subjectSellSearch).get().then(function(doc)
    {
        var Size;
        if (doc && doc.exists)
        {
            const userData = doc.data();
            Size = userData.Size;

            for (let index = 1; index < Size + 1; index++)
            {
                cloudData.doc("Announcements/" + subjectSellSearch + ("/announcement" + index) + "/Data").get().then(function(doc)
                {
                    var announcementType, announcementGrade, announcementInfo, announcementImage, announcementPrice, announcementSellerPhone, announcementStatus;
                    if (doc && doc.exists)
                    {
                        const userData = doc.data();
                        announcementType = userData.Type;
                        announcementGrade = userData.Grade;
                        announcementInfo = userData.Info;
                        announcementPrice = userData.Price;
                        announcementSellerPhone = userData.phoneNumber;
                        announcementStatus = userData.Status;

                        var pathReference = databaseStorage.ref("/Announcements/" + subjectSellSearch + "/announcement" + index.toString() + ".jpg");
                        pathReference.getDownloadURL().then(function(url)
                        {
                            announcementImage = url;

                            if (announcementGrade == parseInt(gradeSellSearch) && announcementStatus == "Online")
                            {
                                document.getElementById("noAnnouncementsYet").style.display = "none";
                                var newAnnouncement = "";
                                newAnnouncement += '<div class = "gridItem"><h1>';
                                newAnnouncement += announcementType + ", " + subjectSellSearch + ", " + announcementGrade + ". клас";
                                newAnnouncement += '</h1><img src = "';
                                newAnnouncement += announcementImage + '" alt = "Students or Note book"><p>';
                                newAnnouncement += announcementInfo;
                                newAnnouncement += '</p><p style = "margin-bottom: 40px;">';
                                newAnnouncement += "Цена: " + parseFloat(announcementPrice).toFixed(2) + " лв.";
                                newAnnouncement += '</p><a href = "#">Купи</a></div>';

                                pageContentSectionGridHolder.innerHTML += newAnnouncement;
                            }
                        });
                    }
                });
            }
        }
    });
}

function newSearch()
{
    document.getElementById("whatWillBuySection").style.display = "block";

    document.getElementById("noAnnouncementsYet").style.display = "block";
    document.getElementById("pageContentSectionGridHolder").innerHTML = "";

    document.getElementById("announcementsSection").style.display = "none";

    sessionStorage.setItem("subjectSellSearch", document.getElementById("dropDownMenu").innerHTML);
}

var Type, Subject, Grade, Price, Info, Imagee;
var validType = false;
var validSubject = false;
var validGrade = false;
var validPrice = false;
var validInfo = false;
var validPhone = false;
var validImage = false;
function updatePriview(elementType)
{
    if (elementType == "Type")
    {
        document.getElementById("Type").innerHTML = document.getElementsByClassName("droppDownMenuSelect")[0].innerHTML;
        document.getElementsByClassName("droppDownMenuSelect")[0].style.borderBottomColor = "#111111";
        document.getElementsByClassName("droppDownMenuSelect")[0].style.color = "#111111";
        document.getElementById("Error invalidType").style.display = "none";
        validType = true;
        Type = document.getElementById("Type").innerHTML;
    }
    else if (elementType == "Subject")
    {
        document.getElementById("Subject").innerHTML = document.getElementsByClassName("droppDownMenuSelect")[1].innerHTML;
        document.getElementsByClassName("droppDownMenuSelect")[1].style.borderBottomColor = "#111111";
        document.getElementsByClassName("droppDownMenuSelect")[1].style.color = "#111111";
        document.getElementById("Error invalidSubject").style.display = "none";
        validSubject = true;
        Subject = document.getElementById("Subject").innerHTML;
    }
    else if (elementType == "Grade")
    {
        document.getElementById("Grade").innerHTML = document.getElementById("gradeInputFieldText").value;
        Grade = document.getElementById("Grade").innerHTML;
    }
    else if (elementType == "Price")
    {
        document.getElementById("Price").innerHTML = document.getElementById("priceInputFieldText").value;
        Price = document.getElementById("Price").innerHTML;
    }
    else if (elementType == "Info")
    {
        document.getElementById("Info").innerHTML = document.getElementById("infoInputFieldText").value;
        Info = document.getElementById("Info").innerHTML;
    }
    else if (elementType == "Image")
    {
        document.getElementById("Image").src = URL.createObjectURL(document.getElementById("announcementImageUploadButton").files[0]);
        Imagee = document.getElementById("Image").src;
    }
}

function uploadAnnouncement()
{
    //#region Errors
    if (Type == null)
    {
        document.getElementsByClassName("droppDownMenuSelect")[0].style.borderBottomColor = "red";
        document.getElementsByClassName("droppDownMenuSelect")[0].style.color = "red";
        document.getElementById("Error invalidType").style.display = "block";
        validType = false;
    }
    if (Subject == null)
    {
        document.getElementsByClassName("droppDownMenuSelect")[1].style.borderBottomColor = "red";
        document.getElementsByClassName("droppDownMenuSelect")[1].style.color = "red";
        document.getElementById("Error invalidSubject").style.display = "block";
        validSubject = false;
    }
    if (Grade == null || Grade < 1 || Grade > 12)
    {
        document.getElementById("gradeInputFieldText").style.borderBottomColor = "red";
        document.getElementById("gradeInputFieldLabel").style.color = "red";
        document.getElementById("Error invalidGrade").style.display = "block";
        validGrade = false;
    }
    else
    {
        document.getElementById("gradeInputFieldText").style.borderBottomColor = "#111111";
        document.getElementById("gradeInputFieldLabel").style.color = "#11111180";
        document.getElementById("Error invalidGrade").style.display = "none";
        validGrade = true;
    }
    if (Price == null || Price < 0 || Price > 35)
    {
        document.getElementById("priceInputFieldText").style.borderBottomColor = "red";
        document.getElementById("priceInputFieldLabel").style.color = "red";
        document.getElementById("Error invalidPrice").style.display = "block";
        validPrice = false;
    }
    else
    {
        document.getElementById("priceInputFieldText").style.borderBottomColor = "#111111";
        document.getElementById("priceInputFieldLabel").style.color = "#11111180";
        document.getElementById("Error invalidPrice").style.display = "none";
        validPrice = true;
    }
    if (Info == null)
    {
        document.getElementById("infoInputFieldText").style.borderBottomColor = "red";
        document.getElementById("infoInputFieldLabel").style.color = "red";
        document.getElementById("Error invalidInfo").style.display = "block";
        validInfo = false;
    }
    else
    {
        document.getElementById("infoInputFieldText").style.borderBottomColor = "#111111";
        document.getElementById("infoInputFieldLabel").style.color = "#11111180";
        document.getElementById("Error invalidInfo").style.display = "none";
        validInfo = true;
    }
    if (document.getElementById("phoneInputFieldText").value == null ||
        document.getElementById("phoneInputFieldText").value < 359000000000 ||
        document.getElementById("phoneInputFieldText").value > 359999999999)
    {
        document.getElementById("phoneInputFieldText").style.borderBottomColor = "red";
        document.getElementById("phoneInputFieldLabel").style.color = "red";
        document.getElementById("Error invalidPhone").style.display = "block";
        validPhone = false;
    }
    else
    {
        document.getElementById("phoneInputFieldText").style.borderBottomColor = "#111111";
        document.getElementById("phoneInputFieldLabel").style.color = "#11111180";
        document.getElementById("Error invalidPhone").style.display = "none";
        validPhone = true;
    }
    if (Imagee == null)
    {
        document.getElementById("chosenFileLabel").style.color = "red";
        document.getElementById("Error invalidImage").style.display = "block";
        validImage = false;
    }
    else
    {
        document.getElementById("chosenFileLabel").style.color = "#11111180";
        document.getElementById("Error invalidImage").style.display = "none";
        validImage = true;
    }
    //#endregion Errors

    if (validType && validSubject && validGrade && validPrice && validInfo && validPhone && validImage)
    {
        cloudData.doc("Announcements/" + Subject).get().then(function(doc)
        {
            var Size;
            if (doc && doc.exists)
            {
                const userData = doc.data();
                Size = userData.Size;

                cloudData.doc("Announcements/" + Subject + ("/announcement" + (Size + 1)) + "/Data").set(
                {
                    Grade: parseInt(Grade),
                    Info: Info,
                    Price: parseFloat(Price),
                    Type: Type,
                    phoneNumber: parseInt(document.getElementById("phoneInputFieldText").value),
                    Status: "Online"
                }).catch(function(error)
                {
                    console.log("Got an Error: " + error);
                });

                var storageRef = databaseStorage.ref("/Announcements/" + Subject + "/announcement" + (Size + 1).toString() + ".jpg");
                var uploadTask = storageRef.put(document.getElementById("announcementImageUploadButton").files[0]);

                cloudData.doc("Announcements/" + Subject).update(
                {
                    Size: parseInt(parseInt(Size) + 1)
                }).catch(function(error)
                {
                    console.log("Got an Error: " + error);
                });

                cloudData.doc("users/" + Auth.currentUser.uid).get().then(function(doc)
                {
                    var announcementsOldArray;
                    if (doc && doc.exists)
                    {
                        const userData = doc.data();
                        announcementsOldArray = userData.Announcements;

                        var announcementsName = "Announcements/" + Subject + ("/announcement" + (parseInt(Size) + 1)) + "/Data"
                        announcementsOldArray[announcementsOldArray.length] = announcementsName;
                        cloudData.doc("users/" + Auth.currentUser.uid).update(
                        {
                            Announcements: announcementsOldArray
                        }).catch(function(error)
                        {
                            console.log("Got an Error: " + error);
                        });
                    }
                }).catch(function(error)
                {
                    console.log("Got an Error: " +  error);
                })
            }
        });

        document.getElementById("correctness announcementUploaded").style.display = "block";
        desableElement("correctness announcementUploaded", 2.5);
        document.getElementById("doneButton").removeAttribute("onclick");
        document.getElementById("doneButton").classList += " Unavailable";
        document.getElementById("myAnnounsmentsButton").style.display = "block";
    }
}

function removeAnnouncement(announcementIndex)
{
    var announcementsList;
    cloudData.doc("users/" + Auth.currentUser.uid).get().then(function(doc)
    {
        var Subject;
        if (doc && doc.exists)
        {
            const userData = doc.data();
            announcementsList = userData.Announcements;
            Subject = announcementsList[announcementIndex].split("/")[1];

            cloudData.doc(announcementsList[announcementIndex]).update(
            {
                Status: "Offline"
            }).catch(function(error)
            {
                console.error("Error removing document: ", error);
            });

            for (let index = 0; index < announcementsList.length; index++)
                if ( announcementsList[index] === announcementsList[announcementIndex])
                    announcementsList.splice(index, 1);
            cloudData.doc("users/" + Auth.currentUser.uid).update(
            {
                Announcements: announcementsList
            }).catch(function(error)
            {
                console.error("Error removing document: ", error);
            });

            document.getElementById("deleatAnnouncementButton" + announcementIndex).removeAttribute("onclick");
            setTimeout(function()
            {
                history.go(0);
            }, 750);
        }
    });
}

function adminCodeGenerator()
{
    cloudData.collection("activationCodes").get().then(snap =>
    {
        var codeName = "Code" + (snap.size + 1);
        var code = makeRandomString(6);

        cloudData.doc("activationCodes/" + codeName).set(
        {
            Value: code
        }).catch(function(error)
        {
            console.log("Got an Error: " + error);
        });

        document.getElementById("activationCode").innerHTML = code.toString();
    });
}