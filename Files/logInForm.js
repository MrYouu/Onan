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
const auth = Firebase.auth();

function signUp()
{
    var Email = document.getElementById("signUpEmailInputFieldText");
    var Password = document.getElementById("signUpPasswordInputFieldText");

    firebase.auth().createUserWithEmailAndPassword(Email.value, Password.value).then(function()
    {
        document.getElementById("signUpEmailInputFieldText").style.borderBottomColor = "#fefefe";
        document.getElementById("signUpEmailInputFieldLabel").style.color = "#fefefe";
        document.getElementById("signUpPasswordInputFieldText").style.borderBottomColor = "#fefefe";
        document.getElementById("signUpPasswordInputFieldLabel").style.color = "#fefefe";
        errorDefault();
    
        document.getElementById("correctness userSighedUp").style.display = "block";
        desableElement("correctness userSighedUp", 2.5);
        signFormHide('signUpForm', 'signUpEmailInputFieldText', 'signUpPasswordInputFieldText', 'signUpEmailInputFieldLabel', 'signUpPasswordInputFieldLabel')
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
                document.getElementById("signUpEmailInputFieldLabel").style.color = "#fefefe";
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
                document.getElementById("signUpPasswordInputFieldLabel").style.color = "#fefefe";
                document.getElementById("Error invalidPassword").style.display = "none";
            }
    
            console.log(error);
        }
        else
            throw error;
    });
}

function signIn()
{
    var Email = document.getElementById("signInEmailInputFieldText");
    var Password = document.getElementById("signInPasswordInputFieldText");

    firebase.auth().signInWithEmailAndPassword(Email.value, Password.value).then(function()
    {
        document.getElementById("signInEmailInputFieldText").style.borderBottomColor = "#fefefe";
        document.getElementById("signInEmailInputFieldLabel").style.color = "#fefefe";
        document.getElementById("signInPasswordInputFieldText").style.borderBottomColor = "#fefefe";
        document.getElementById("signInPasswordInputFieldLabel").style.color = "#fefefe";
        errorDefault();
    
        document.getElementById("correctness userSighedIn").style.display = "block";
        desableElement("correctness userSighedIn", 2.5);
        signFormHide('signInForm', 'signInEmailInputFieldText', 'signInPasswordInputFieldText', 'signInEmailInputFieldLabel', 'signInPasswordInputFieldLabel')
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
                document.getElementById("signInEmailInputFieldLabel").style.color = "#fefefe";
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
                document.getElementById("signInEmailInputFieldLabel").style.color = "#fefefe";
                document.getElementById("signInPasswordInputFieldText").style.borderBottomColor = "#fefefe";
                document.getElementById("signInPasswordInputFieldLabel").style.color = "#fefefe";
                document.getElementById("Error nonExistingUser").style.display = "block";
            }
            else if (errorCode != 'auth/wrong-password' && errorCode != 'auth/user-not-found')
            {
                document.getElementById("signInPasswordInputFieldText").style.borderBottomColor = "#fefefe";
                document.getElementById("signInPasswordInputFieldLabel").style.color = "#fefefe";
                document.getElementById("Error nonExistingUser").style.display = "none";
                document.getElementById("Error wrongPassword").style.display = "none";
            }

            if (errorCode == 'auth/too-many-requests')
            {
                document.getElementById("signInEmailInputFieldText").style.borderBottomColor = "#fefefe";
                document.getElementById("signInEmailInputFieldLabel").style.color = "#fefefe";
                document.getElementById("signInPasswordInputFieldText").style.borderBottomColor = "#fefefe";
                document.getElementById("signInPasswordInputFieldLabel").style.color = "#fefefe";
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
    document.getElementById("Error invalidEmail").style.display = "none";
    document.getElementById("Error existingEmail").style.display = "none";
    document.getElementById("Error invalidPassword").style.display = "none";
    document.getElementById("Error wrongPassword").style.display = "none";
    document.getElementById("Error nonExistingUser").style.display = "none";
    document.getElementById("Error toManyRequests").style.display = "none";
}

function defaultFunction()
{

}