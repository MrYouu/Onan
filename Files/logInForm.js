//  The JavaScript code is property to Mr. You (Kristiyan Valchev) and can only be viewed
//  If you want to use part of the code, please first contact me: mr.youdevelopment@gmail.com

var firebaseConfig = {
    apiKey: "AIzaSyBYtkXpEAmzNejy2EBc4j1BhuI2oi6Uu50",
    authDomain: "onandatabase.firebaseapp.com",
    databaseURL: "https://onandatabase.firebaseio.com",
    projectId: "onandatabase",
    storageBucket: "onandatabase.appspot.com",
    messagingSenderId: "318461296930",
    appId: "1:318461296930:web:08e54916aeef9fb933e57b"
};

firebase.initializeApp(firebaseConfig);
const Auth = firebase.auth();
const cloudData = firebase.firestore();

function signUp()
{
    var canSignUp;
    var firstName = document.getElementById("signUpFNInputFieldText");
    var IDCode = document.getElementById("signUpCodeInputFieldText");
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
                Email: Email.value
            }).catch(function(error)
            {
                console.log("Got an Error: " + error);
            })

            document.getElementById("signUpFNInputFieldText").style.borderBottomColor = "#fefefe";
            document.getElementById("signUpFNInputFieldLabel").style.color = "#fefefe80";
            document.getElementById("signUpCodeInputFieldText").style.borderBottomColor = "#fefefe";
            document.getElementById("signUpCodeInputFieldLabel").style.color = "#fefefe80";
            document.getElementById("signUpEmailInputFieldText").style.borderBottomColor = "#fefefe";
            document.getElementById("signUpEmailInputFieldLabel").style.color = "#fefefe80";
            document.getElementById("signUpPasswordInputFieldText").style.borderBottomColor = "#fefefe";
            document.getElementById("signUpPasswordInputFieldLabel").style.color = "#fefefe80";
            errorDefault();
        
            document.getElementById("correctness userSighedUp").style.display = "block";
            desableElement("correctness userSighedUp", 2.5);
            signFormHide('signUpForm', 'signUpEmailInputFieldText', 'signUpPasswordInputFieldText', 'signUpEmailInputFieldLabel', 'signUpPasswordInputFieldLabel', 'signUpFNInputFieldText', 'signUpCodeInputFieldText', 'signUpFNInputFieldLabel', 'signUpCodeInputFieldLabel')        }).catch(function(error)
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
        if (user)
        {
            var userFN, userLN, userGrade, userEmail;
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

                        document.getElementById("mainTitleUserName").innerHTML = userFN;
                        document.getElementById("informationFNInputFieldText").value = userFN;
                        document.getElementById("informationLNInputFieldText").value = userLN;
                        document.getElementById("informationGradeInputFieldText").value = userGrade;
                        document.getElementById("informationEmailInputFieldText").value = userEmail;
                    }
                }).catch(function(error)
                {
                    console.log("Got an Error: " +  error);
                })
            }
            else
            {
                cloudData.doc("users/" + user.uid).get().then(function(doc)
                {
                    if (doc && doc.exists)
                    {
                        const userData = doc.data();
                        userFN = userData.firstName;
                        userLN = userData.lastName;
                        userEmail = userData.Email;
                        
                        document.getElementById("accountButton").innerHTML = userFN;
                    }
                }).catch(function(error)
                {
                    console.log("Got an Error: " +  error);
                })
            }
        }
        else
        {
            location.replace("../index.html")
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

        cloudData.doc("users/" + Auth.currentUser.uid).set(
        {
            firstName: FNInputFieldText.value,
            lastName: LNInputFieldText.value,
            Grade: gradeInputFieldText.value,
            Email: emailInputFieldText.value
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

function defaultFunction()
{

}