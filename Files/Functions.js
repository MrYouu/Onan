//  The JavaScript code is property to Mr. You (Kristiyan Valchev) and can only be viewed
//  If you want to use part of the code, please first contact me: mr.youdevelopment@gmail.com

var sideMenuState = 0;
function openCloseSideMenu()
{
    var sideMenu = document.getElementById("sideMenu");
    var bigSideBox = document.getElementById("bigSideBox");
    var firstLine = document.getElementById("firstLine");
    var secondLine = document.getElementById("secondLine");

    if (sideMenuState == 0)
    {
        document.getElementById("topBarName").style.color = "#fefefe";
        sideMenu.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
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
        sideMenu.style.clipPath = "polygon(0 0, 100% 0, 100% 0, 0 0)"
        bigSideBox.style.top = 0;
        bigSideBox.style.left = "50%";
        bigSideBox.style.height = "1100px";
        bigSideBox.style.transform = "rotate(-50deg)";
        document.getElementById("sideMenuButton").innerHTML = '<div id = "firstLine"></div><div id = "secondLine"></div>';

        sideMenuState = 0;
    }
}

window.onscroll = function(e)
{  
    var bigSideBox = document.getElementById("bigSideBox");

    document.getElementById("topBarName").style.color = "#111111";
    document.getElementById("sideMenu").style.clipPath = "polygon(0 0, 100% 0, 100% 0, 0 0)"
    bigSideBox.style.top = 0;
    bigSideBox.style.left = "50%";
    bigSideBox.style.height = "1100px";
    bigSideBox.style.transform = "rotate(-50deg)";
    document.getElementById("sideMenuButton").innerHTML = '<div id = "firstLine"></div><div id = "secondLine"></div>';

    sideMenuState = 0;

    closeRightClickMenu();
} 

function setActiveGrade(setActiveGradeBoxID)
{
    var allGradeBoxes = document.getElementsByClassName("listBox");
    for (i = 0; i < allGradeBoxes.length; i++)
        allGradeBoxes[i].className = "listBox";

    allGradeBoxes[allGradeBoxes.length - 1].className += " Last";

    document.getElementById(setActiveGradeBoxID).className += " Active";
    document.getElementById("afterGradeSelectionButton").className = "pageContentSectionButton"
}

function signFormPopUp(signFormID)
{
    document.getElementById(signFormID).style.display = "unset";
}

function signFormHide(signFormID, emailField, passwordField, emailFieldLabel, passwordFieldLabel)
{
    document.getElementById("Error invalidEmail").style.display = "none";
    document.getElementById("Error existingEmail").style.display = "none";
    document.getElementById("Error invalidPassword").style.display = "none";
    document.getElementById("Error wrongPassword").style.display = "none";
    document.getElementById("Error nonExistingUser").style.display = "none";
    document.getElementById("Error toManyRequests").style.display = "none";

    document.getElementById(emailField).value = "";
    document.getElementById(passwordField).value = "";

    document.getElementById(emailField).style.borderBottomColor = "#fefefe";
    document.getElementById(emailFieldLabel).style.color = "#fefefe";
    document.getElementById(passwordField).style.borderBottomColor = "#fefefe";
    document.getElementById(passwordFieldLabel).style.color = "#fefefe";

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

function defaultFunction()
{

}