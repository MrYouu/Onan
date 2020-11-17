//  The JavaScript code is property to Mr. You (Kristiyan Valchev) and can only be viewed
//  If you want to use part of the code, please first contact me: mr.youdevelopment@gmail.com

var firebaseConfig = {
    apiKey: "AIzaSyCNux6RQsBoBtTZDhcAATFheKhE1rzucTs",
    authDomain: "onandatabase-d299a.firebaseapp.com",
    databaseURL: "https://onandatabase-d299a.firebaseio.com",
    projectId: "onandatabase-d299a",
    storageBucket: "onandatabase-d299a.appspot.com",
    messagingSenderId: "520248651623",
    appId: "1:520248651623:web:e75393524166a74bb349c2"
};

firebase.initializeApp(firebaseConfig);
const Auth = firebase.auth();
const cloudData = firebase.firestore();
const databaseStorage = firebase.storage();

function signUp()
{
    var canSignUp;
    var firstName = document.getElementById("signUpFNInputFieldText");
    var Email = document.getElementById("signUpEmailInputFieldText");
    var Password = document.getElementById("signUpPasswordInputFieldText");

    firstNameText = firstName.value;

    if (firstName.value && firstNameText.length >= 2 && firstNameText.indexOf(' ') <= 0)
    {
        document.getElementById("signUpFNInputFieldText").style.borderBottomColor = "#fefefe";
        document.getElementById("signUpFNInputFieldLabel").style.color = "#fefefe80";
        document.getElementById("Error invalidFN").style.display = "none";
        canSignUp = true;
    }
    else
    {
        document.getElementById("signUpFNInputFieldText").style.borderBottomColor = "red";
        document.getElementById("signUpFNInputFieldLabel").style.color = "red";
        document.getElementById("Error invalidFN").style.display = "block";
        canSignUp = false;
    }

    if (canSignUp)
    {
        firebase.auth().createUserWithEmailAndPassword(Email.value, Password.value).then(function()
        {
            cloudData.doc("users/" + Auth.currentUser.uid).set(
            {
                firstName: firstName.value,
                lastName: "",
                Grade: "",
                Email: Email.value,
                accountPlan: Basic,
                rightAnswers: 1,
                wrongAnswers: 1,
                Announcements: ["None"]
            }).catch(function(error)
            {
                console.log("Got an Error: " + error);
            })

            document.getElementById("signUpFNInputFieldText").style.borderBottomColor = "#fefefe";
            document.getElementById("signUpFNInputFieldLabel").style.color = "#fefefe80";
            document.getElementById("signUpEmailInputFieldText").style.borderBottomColor = "#fefefe";
            document.getElementById("signUpEmailInputFieldLabel").style.color = "#fefefe80";
            document.getElementById("signUpPasswordInputFieldText").style.borderBottomColor = "#fefefe";
            document.getElementById("signUpPasswordInputFieldLabel").style.color = "#fefefe80";
            errorDefault();
        
            document.getElementById("correctness userSighedUp").style.display = "block";
            desableElement("correctness userSighedUp", 2.5);
            signFormHide('signUpForm', 'signUpEmailInputFieldText', 'signUpPasswordInputFieldText', 'signUpEmailInputFieldLabel', 'signUpPasswordInputFieldLabel', 'signUpFNInputFieldText', 'signUpCodeInputFieldText', 'signUpFNInputFieldLabel', 'signUpCodeInputFieldLabel')
        }).catch(function(error)
        {
            if (error)
            {
                var errorCode = error.code;

                if (errorCode == 'auth/invalid-email')
                {
                    document.getElementById("signUpEmailInputFieldText").style.borderBottomColor = "red";
                    document.getElementById("signUpEmailInputFieldLabel").style.color = "red";
                    document.getElementById("Error invalidEmail").style.display = "block";
                }
                else if (errorCode == 'auth/email-already-in-use')
                {
                    document.getElementById("signUpEmailInputFieldText").style.borderBottomColor = "red";
                    document.getElementById("signUpEmailInputFieldLabel").style.color = "red";
                    document.getElementById("Error existingEmail").style.display = "block";
                }
                else if (errorCode != 'auth/invalid-email')
                {
                    document.getElementById("signUpEmailInputFieldText").style.borderBottomColor = "#fefefe";
                    document.getElementById("signUpEmailInputFieldLabel").style.color = "#fefefe80";
                    document.getElementById("Error invalidEmail").style.display = "none";
                    document.getElementById("Error existingEmail").style.display = "none";
                }
        
                if (errorCode == 'auth/weak-password')
                {
                    document.getElementById("signUpPasswordInputFieldText").style.borderBottomColor = "red";
                    document.getElementById("signUpPasswordInputFieldLabel").style.color = "red";
                    document.getElementById("Error invalidPassword").style.display = "block";
                }
                else if (errorCode != 'auth/weak-password')
                {
                    document.getElementById("signUpPasswordInputFieldText").style.borderBottomColor = "#fefefe";
                    document.getElementById("signUpPasswordInputFieldLabel").style.color = "#fefefe80";
                    document.getElementById("Error invalidPassword").style.display = "none";
                }
        
                console.log(error);
            }
            else
                throw error;
        });
    }
}

function signIn()
{
    var Email = document.getElementById("signInEmailInputFieldText");
    var Password = document.getElementById("signInPasswordInputFieldText");

    firebase.auth().signInWithEmailAndPassword(Email.value, Password.value).then(function()
    {
        document.getElementById("signInEmailInputFieldText").style.borderBottomColor = "#fefefe";
        document.getElementById("signInEmailInputFieldLabel").style.color = "#fefefe80";
        document.getElementById("signInPasswordInputFieldText").style.borderBottomColor = "#fefefe";
        document.getElementById("signInPasswordInputFieldLabel").style.color = "#fefefe80";
        errorDefault();
    
        document.getElementById("correctness userSighedIn").style.display = "block";
        desableElement("correctness userSighedIn", 2.5);
        signFormHide('signInForm', 'signInEmailInputFieldText', 'signInPasswordInputFieldText', 'signInEmailInputFieldLabel', 'signInPasswordInputFieldLabel')
        location.replace("../indexAccount.html")
    }).catch(function(error)
    {
        if (error)
        {
            var errorCode = error.code;

            if (errorCode == 'auth/invalid-email')
            {
                document.getElementById("signInEmailInputFieldText").style.borderBottomColor = "red";
                document.getElementById("signInEmailInputFieldLabel").style.color = "red";
                document.getElementById("Error invalidEmail").style.display = "block";
            }
            else if (errorCode == 'auth/email-already-in-use')
            {
                document.getElementById("signInEmailInputFieldText").style.borderBottomColor = "red";
                document.getElementById("signInEmailInputFieldLabel").style.color = "red";
                document.getElementById("Error existingEmail").style.display = "block";
            }
            else if (errorCode != 'auth/invalid-email')
            {
                document.getElementById("signInEmailInputFieldText").style.borderBottomColor = "#fefefe";
                document.getElementById("signInEmailInputFieldLabel").style.color = "#fefefe80";
                document.getElementById("Error invalidEmail").style.display = "none";
            }

            if (errorCode == 'auth/wrong-password')
            {
                document.getElementById("signInPasswordInputFieldText").style.borderBottomColor = "red";
                document.getElementById("signInPasswordInputFieldLabel").style.color = "red";
                document.getElementById("Error wrongPassword").style.display = "block";
            }
            else if (errorCode == 'auth/user-not-found')
            {
                document.getElementById("signInEmailInputFieldText").style.borderBottomColor = "#fefefe";
                document.getElementById("signInEmailInputFieldLabel").style.color = "#fefefe80";
                document.getElementById("signInPasswordInputFieldText").style.borderBottomColor = "#fefefe";
                document.getElementById("signInPasswordInputFieldLabel").style.color = "#fefefe80";
                document.getElementById("Error nonExistingUser").style.display = "block";
            }
            else if (errorCode != 'auth/wrong-password' && errorCode != 'auth/user-not-found')
            {
                document.getElementById("signInPasswordInputFieldText").style.borderBottomColor = "#fefefe";
                document.getElementById("signInPasswordInputFieldLabel").style.color = "#fefefe80";
                document.getElementById("Error nonExistingUser").style.display = "none";
                document.getElementById("Error wrongPassword").style.display = "none";
            }

            if (errorCode == 'auth/too-many-requests')
            {
                document.getElementById("signInEmailInputFieldText").style.borderBottomColor = "#fefefe";
                document.getElementById("signInEmailInputFieldLabel").style.color = "#fefefe80";
                document.getElementById("signInPasswordInputFieldText").style.borderBottomColor = "#fefefe";
                document.getElementById("signInPasswordInputFieldLabel").style.color = "#fefefe80";
                document.getElementById("Error nonExistingUser").style.display = "none";
                document.getElementById("Error invalidEmail").style.display = "none";
                document.getElementById("Error wrongPassword").style.display = "none";
                document.getElementById("Error toManyRequests").style.display = "block";
                console.log("too-many-requests");
            }
    
            console.log(error);
        }
        else
            throw error;
    });
}

function signOut()
{
    firebase.auth().signOut().then(function()
    {
        document.getElementById("correctness userSighedOut").style.display = "block";
        desableElement("correctness userSighedOut", 2.5);
        location.replace("../index.html")
    });
}

function sendEmailVerification()
{
    firebase.auth().currentUser.sendEmailVerification().then(function()
    {
        alert('Email Verification Sent!');
    });
}

function errorDefault()
{
    document.getElementById("Error invalidFN").style.display = "none";
    document.getElementById("Error invalidEmail").style.display = "none";
    document.getElementById("Error existingEmail").style.display = "none";
    document.getElementById("Error invalidPassword").style.display = "none";
    document.getElementById("Error wrongPassword").style.display = "none";
    document.getElementById("Error nonExistingUser").style.display = "none";
    document.getElementById("Error toManyRequests").style.display = "none";
    document.getElementById("Error FNEmailFieladEmpty").style.display = "none";
}

function loadUserData()
{
    firebase.auth().onAuthStateChanged(function(user)
    {
        if (document.getElementById("Title").innerHTML == "Онан - Продай")
        {
            if (user)
            {
                document.getElementById("getAccountSection").style.display = "none";
            }
            else
            {
                document.getElementById("whatWillSellSection").style.display = "none";
            }
        }
        else if (user)
        {
            var userFN, userLN, userGrade, userEmail, accountPlan, announcementsList;
            if (document.getElementById("Title").innerHTML == "Онан - Акаунт")
            {
                cloudData.doc("users/" + user.uid).get().then(function(doc)
                {
                    if (doc && doc.exists)
                    {
                        const userData = doc.data();
                        userFN = userData.firstName;
                        userLN = userData.lastName;
                        userGrade = userData.Grade;
                        userEmail = userData.Email;
                        accountPlan = userData.accountPlan;
                        announcementsList = userData.Announcements;

                        if (accountPlan == "Basic")
                        {
                            document.getElementById("accountButton").style.backgroundColor = "#ffcb2b";
                            document.getElementById("accountButton").innerHTML = '<img src = "Images/particlesBasic.png">';

                            document.getElementById("statisticsSection").style.display = "none";
                        }
                        else if (accountPlan == "Pro")
                        {
                            document.getElementById("accountButton").style.backgroundColor = "#10cdff";
                            document.getElementById("accountButton").innerHTML = '<img src = "Images/particlesPro.png">';
                        }

                        document.getElementById("accountButton").innerHTML += accountPlan;
                        document.getElementById("mainTitleUserName").innerHTML = userFN;
                        document.getElementById("informationFNInputFieldText").value = userFN;
                        document.getElementById("informationLNInputFieldText").value = userLN;
                        document.getElementById("informationGradeInputFieldText").value = userGrade;
                        document.getElementById("informationEmailInputFieldText").value = userEmail;

                        sessionStorage.setItem("rightAnswers", userData.rightAnswers);
                        sessionStorage.setItem("wrongAnswers", userData.wrongAnswers);

                        if (announcementsList.length == 1)
                        {
                            document.getElementById("pageContentSectionGridHolder").style.display = "none";
                        }
                        else
                        {
                            document.getElementById("onAnnouncementsYetText").style.display = "none";
                            document.getElementById("onAnnouncementsYetButton").style.display = "none";

                            for (let index = 1; index < announcementsList.length; index++)
                            {
                                cloudData.doc(announcementsList[index]).get().then(function(doc)
                                {
                                    var announcementsString = "";
                                    var Grade, Info, Price, Type, phoneNumber, Status;
                                    var Subject = announcementsList[index].split("/")[1];
                                    if (doc && doc.exists)
                                    {
                                        const userData = doc.data();
                                        Grade = userData.Grade;
                                        Info = userData.Info;
                                        Price = userData.Price;
                                        Type = userData.Type;
                                        phoneNumber = userData.phoneNumber;
                                        Status = userData.Status;

                                        var pathReference = databaseStorage.ref("/Announcements/" + Subject + "/" + announcementsList[index].split('/')[2].toString() + ".jpg");
                                        pathReference.getDownloadURL().then(function(url)
                                        {
                                            announcementImage = url;
                                            if (Status == "Online")
                                            {
                                                announcementsString += '<div class = "gridItem"><h1><text id = "Type">';
                                                announcementsString += Type;
                                                announcementsString +='</text>, <text id = "Subject">';
                                                announcementsString += Subject;
                                                announcementsString += '</text>, <text id = "Grade"></text>';
                                                announcementsString += Grade;
                                                announcementsString += '. клас</h1><img src = "';
                                                announcementsString += announcementImage + '" alt = "Снимка" id = "Image"><p id = "Info">';
                                                announcementsString += Info;
                                                announcementsString += '</p><p style = "margin-bottom: 40px;">Цена: <text id = "Price">'
                                                announcementsString += parseFloat(Price).toFixed(2);
                                                announcementsString += '</text>лв.</p><a>Купи</a><i onclick = "removeAnnouncement(';
                                                announcementsString += "'" + index + "'" + ')" class = "fas fa-trash-alt" id = "';
                                                announcementsString += "deleatAnnouncementButton" + index + '" title = "Премахни обявата"></i></div>';

                                                document.getElementById("pageContentSectionGridHolder").innerHTML += announcementsString;
                                            }
                                        });
                                    }
                                });
                            }

                            document.getElementById("youAnnouncementsSection").innerHTML += '<a href = "Shop/Sell.html" class = "pageContentSectionButton" id = "makeAnnouncementsButton">Направи обява</a>';
                        }
                    }
                }).catch(function(error)
                {
                    console.log("Got an Error: " +  error);
                });
            }
            else if (document.getElementById("Title").innerHTML == "Онан - Начало")
            {
                cloudData.doc("users/" + user.uid).get().then(function(doc)
                {
                    if (doc && doc.exists)
                    {
                        const userData = doc.data();
                        userFN = userData.firstName;
                        userLN = userData.lastName;
                        userGrade = userData.Grade;
                        userEmail = userData.Email;
                        accountPlan = userData.accountPlan;

                        if (accountPlan == "Basic")
                        {
                            document.getElementById("statisticsSection").style.display = "none";
                        }
                        else if (accountPlan == "Pro")
                        {
                            document.getElementById("upgradeSection").style.display = "none";
                        }
                        
                        document.getElementById("accountButton").innerHTML = userFN;

                        if (userGrade != "")
                            document.getElementById("gradeList").style.display = "none";
                    }
                }).catch(function(error)
                {
                    console.log("Got an Error: " +  error);
                })
            }
            else if (document.getElementById("Title").innerHTML == "Тест")
            {
                cloudData.doc("users/" + user.uid).get().then(function(doc)
                {
                    if (doc && doc.exists)
                    {
                        const userData = doc.data();
                        accountPlan = userData.accountPlan;

                        if (accountPlan == "Basic")
                        {
                            location.replace("../accountPlans.html");
                        }
                    }
                }).catch(function(error)
                {
                    console.log("Got an Error: " +  error);
                })
            }
            else if (document.getElementById("Title").innerHTML == "Тест Резултат")
            {
                if (sessionStorage.getItem("hasSavedRightWrongAnswers") != "true" || !sessionStorage.getItem("hasSavedRightWrongAnswers"))
                {
                    cloudData.doc("users/" + user.uid).get().then(function(doc)
                    {
                        var allAnswers = sessionStorage.getItem("questionNumber");
                        var rightAnswers = sessionStorage.getItem("rightAnswersCounter");
                        var wrongAnswers = allAnswers - rightAnswers;
    
                        if (doc && doc.exists)
                        {
                            const userData = doc.data();
    
                            cloudData.doc("users/" + Auth.currentUser.uid).update(
                            {
                                rightAnswers: userData.rightAnswers + rightAnswers,
                                wrongAnswers: userData.wrongAnswers + wrongAnswers
                            }).catch(function(error)
                            {
                                console.log("Got an Error: " + error);
                            });
    
                            sessionStorage.setItem("hasSavedRightWrongAnswers", "true");
                        }
                    }).catch(function(error)
                    {
                        console.log("Got an Error: " +  error);
                    })
                }
            }
            else if (document.getElementById("Title").innerHTML == "Планове за акаунт")
            {
                cloudData.doc("users/" + user.uid).get().then(function(doc)
                {
                    var accountPlan;
                    if (doc && doc.exists)
                    {
                        const userData = doc.data();
                        accountPlan = userData.accountPlan;
                        
                        if (accountPlan == "Basic")
                        {
                            document.getElementById("alreadyProSection").style.display = "none";
                        }
                        else if (accountPlan == "Pro")
                        {
                            document.getElementById("getProButton").style.display = "none";
                            document.getElementById("activateProSection").style.display = "none";
                        }
                    }
                }).catch(function(error)
                {
                    console.log("Got an Error: " +  error);
                })
            }
            else if (document.getElementById("Title").innerHTML == "Success")
            {
                if (sessionStorage.getItem("hasBoughtCode") == "true" || sessionStorage.getItem("hasBoughtCode"))
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
                        sessionStorage.removeItem("hasBoughtCode");
                    });
                }
                else
                {
                    location.replace("../accountPlans.html");
                }
            }
            else if (document.getElementById("Title").innerHTML == "Onan Admin")
            {
                if (Auth.currentUser.uid == "hMO6QPfUOAVpL3BQCfo1MLnkcXi1")
                {
                    cloudData.collection("users").get().then(snap =>
                    {
                        var usersNumber = snap.size;
                        document.getElementById("allUsersText").innerHTML = usersNumber.toString();

                        cloudData.collection("users").get().then((data) =>
                        {
                            var allProusersNumber = 0;
                            const response = data.forEach((doc) =>
                            {
                                const userData = doc.data();
                                if (userData.accountPlan == "Pro") allProusersNumber++;
                            })
                            document.getElementById("proUsersText").innerHTML = allProusersNumber.toString();
                            document.getElementById("profitText").innerHTML = "$" + (allProusersNumber * 2 - 2).toFixed(2);
                        }).catch(function(error)
                        {
                            console.log("Got an Error: " +  error);
                        });
                    });
                }
                else
                {
                    location.replace("../indexAccount.html");
                }
            }
        }
        else
        {
            location.replace("../index.html");
        }
    });
}

function loadLiteratureGrade()
{
    firebase.auth().onAuthStateChanged(function(user)
    {
        if (user)
        {
            var userGrade;
            cloudData.doc("users/" + user.uid).get().then(function(doc)
            {
                if (doc && doc.exists)
                {
                    const userData = doc.data();
                    userGrade = userData.Grade;

                    document.getElementById("gradeInputFieldText").value = userGrade;
                }
            }).catch(function(error)
            {
                console.log("Got an Error: " +  error);
            })
        }
    });
}

function saveChangedUserData()
{
    var FNInputFieldText = document.getElementById("informationFNInputFieldText");
    var LNInputFieldText = document.getElementById("informationLNInputFieldText");
    var gradeInputFieldText = document.getElementById("informationGradeInputFieldText");
    var emailInputFieldText = document.getElementById("informationEmailInputFieldText");
    
    if (FNInputFieldText.value && FNInputFieldText.value.length <= 15 && emailInputFieldText.value && LNInputFieldText.value.length <= 15)
    {
        if (gradeInputFieldText.value < 5 || gradeInputFieldText.value > 12)
        {
            gradeInputFieldText.value = "";
        }

        cloudData.doc("users/" + Auth.currentUser.uid).update(
        {
            firstName: FNInputFieldText.value,
            lastName: LNInputFieldText.value,
            Grade: gradeInputFieldText.value,
        }).catch(function(error)
        {
            console.log("Got an Error: " + error);
        });

        document.getElementById("informationFNInputFieldText").style.borderBottomColor = "#111111";
        document.getElementById("informationFNInputFieldLabel").style.color = "#11111180";
        document.getElementById("informationEmailInputFieldText").style.borderBottomColor = "#111111";
        document.getElementById("informationEmailInputFieldLabel").style.color = "#11111180";
        document.getElementById("Error FNEmailFieladEmpty").style.display = "none";

        document.getElementById("correctness userDataSaved").style.display = "block";
        desableElement("correctness userDataSaved", 2.5);
    }
    else
    {
        document.getElementById("informationFNInputFieldText").style.borderBottomColor = "red";
        document.getElementById("informationFNInputFieldLabel").style.color = "red";
        document.getElementById("informationEmailInputFieldText").style.borderBottomColor = "red";
        document.getElementById("informationEmailInputFieldLabel").style.color = "red";
        document.getElementById("Error FNEmailFieladEmpty").style.display = "block";
    }
}

function activateProAccount()
{
    var activationCode = document.getElementById("activationCodeInputFieldText").value;

    cloudData.collection("activationCodes").get().then(snap =>
    {
        var isDone = false;
        for (let index = 1; index < snap.size + 1; index++)
        {
            var codeName = "Code" + index;
            var checkCode;

            cloudData.doc("activationCodes/" + codeName).get().then(function(doc)
            {
                if (doc && doc.exists)
                {
                    const userData = doc.data();
                    checkCode = userData.value;

                    if (checkCode.length == 6 && checkCode == activationCode)
                    {
                        cloudData.doc("activationCodes/" + codeName).update(
                        {
                            value: "used"
                        }).catch(function(error)
                        {
                            console.log("Got an Error: " + error);
                        });

                        cloudData.doc("users/" + Auth.currentUser.uid).update(
                        {
                            accountPlan: "Pro"
                        }).catch(function(error)
                        {
                            console.log("Got an Error: " + error);
                        });

                        document.getElementById("activationCodeInputFieldText").style.borderBottomColor = "#111111";
                        document.getElementById("activationCodeInputFieldLabel").style.color = "#11111180";
                        document.getElementById("Error invalidCode").style.display = "none";
                        document.getElementById("correctness upgradedToPro").style.display = "block";
                        desableElement("correctness upgradedToPro", 2.5);
                        document.getElementById("activationCodeInputFieldText").value = "";

                        window.setTimeout(function()
                        {
                            history.go(0);
                        }, 1000);

                        isDone = true;
                    }
                }
            }).catch(function(error)
            {
                console.log("Got an Error: " +  error);
            })
        }

        if (!isDone)
        {
            document.getElementById("activationCodeInputFieldText").style.borderBottomColor = "red";
            document.getElementById("activationCodeInputFieldLabel").style.color = "red";
            document.getElementById("Error invalidCode").style.display = "block";
        }
    });
}