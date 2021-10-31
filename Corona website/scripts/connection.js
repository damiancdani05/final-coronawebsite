// Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA1z2wQHkqokoP_uDpbmC2FhXrjiWIZd_k",
    authDomain: "corona-website-me.firebaseapp.com",
    databaseURL: "https://corona-website-me-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "corona-website-me",
    storageBucket: "corona-website-me.appspot.com",
    messagingSenderId: "644007807216",
    appId: "1:644007807216:web:a7d7781952670c28189a35",
    measurementId: "G-9QK51RKL50"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

/* Validation of data collected through form,
  on click event of Submit button, submitForm function is called */
  var UserInputsRef = firebase.database().ref('UserInputs')
  document.getElementById('testForm').addEventListener('submit', submitForm);


function submitForm(event) {
        event.preventDefault();
        var fname = getInputVal('firstname');
        var lname = getInputVal('lastname');
        var mobile = getInputVal('mobile');
        var state = getInputVal('state');
        state = state.toLowerCase();
        readState(state);
        var email = getInputVal('email');
        var emailstatus = validateEmail();
        var profession = getInputVal('profession');
        var dateofbirth = getInputVal('dateofbirth');
        var symptomsList = getSelectedCheckboxValues('symptoms');
        var selectedOption = document.querySelector('input[name = option]:checked').value;
        if (emailstatus){
            saveMessages(lname+" "+ fname, mobile,state,email,profession,dateofbirth,selectedOption,symptomsList)
        } 
  }

/* function to return input values as per the id passed as parameter */
function getInputVal(id) {
    return document.getElementById(id).value;
  }

  /* function to accept state value as parameter, read database
 to return and display center details on web page */
function readState(state) {
    var centers;
    var ref = firebase.database().ref(state);
    ref.on('value', (data) => {
      centers = data.val();
      document.getElementById("result").innerHTML = "<br>" + centers.toUpperCase();
    })
}

/* function to check if email id entered by user is valid */
function validateEmail() {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(testForm.email.value)) {
      return (true)
    }
    alert("You have entered an invalid email address!")
    return (false)
}

/* function to return value(s) of selcted checkboxes */
function getSelectedCheckboxValues(name) {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
    let values = [];
    checkboxes.forEach((checkbox) => {
      values.push(checkbox.value);
    });
    return values;
}

/* function to write collected details in firebase,
create new record and add values in respective fields */
function saveMessages(name, mobile, email, profession, dateofbirth, state, selectedOption, symptomsList) {
    var newuserInputsRef = UserInputsRef.push();
    newuserInputsRef.set({
      name: name,
      mobile: mobile,
      email: email,
      profession: profession,
      dateofbirth: dateofbirth,
      selectedOption: selectedOption,
      state: state,
      symptomsList: symptomsList
    })
    alert("Thank you, find the list of centers nearby!  ");
}
  

