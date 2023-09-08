// script.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRBDeS3QtmLTyny6xVhwDViJZ-j68FPKQ",
  authDomain: "fb-helpdesk-6fd2f.firebaseapp.com",
  projectId: "fb-helpdesk-6fd2f",
  storageBucket: "fb-helpdesk-6fd2f.appspot.com",
  messagingSenderId: "681905039306",
  appId: "1:681905039306:web:cd828a263aef7769cb5133"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

document.addEventListener('DOMContentLoaded', function () {
    const signupBtn = document.getElementById('signupBtn');
    const loginBtn = document.getElementById('loginBtn');

    if (signupBtn) {
        signupBtn.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent the form from submitting by default

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();

            if (name === '' || email === '' || password === '') {
                alert('Please fill in all fields.');
                return; // Don't proceed with form submission
            }
            // Example registration code using Firebase Authentication
           

            // Handle registration logic here

            // Registration
                function registerUser(email, password) {
                    firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then((userCredential) => {
                        // User registered successfully
                        const user = userCredential.user;
                        // You can store additional user data in Firebase Realtime Database or Firestore here
                        // For example, you might create a 'users' collection and store user details by UID
                        // Replace 'your-database-reference' with your actual database reference
                        const db = firebase.firestore();
                        db.collection('users').doc(user.uid).set({
                        email: user.email,
                        // Other user details here
                        })
                        .then(() => {
                        console.log('User data saved to database.');
                        // Redirect to a different page or perform other post-registration actions
                        })
                        .catch((error) => {
                        console.error('Error saving user data:', error);
                        });
                    })
                    .catch((error) => {
                        // Handle registration errors
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.error('Registration error:', errorMessage);
                    });
                };
                registerUser(email, password)
            alert('Registration button clicked');
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent the form from submitting by default

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();

            if (email === '' || password === '') {
                alert('Please fill in all fields.');
                return; // Don't proceed with form submission
            }
            
            // Handle login logic here
            // Example login code using Firebase Authentication
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
            // User authenticated successfully
            const user = userCredential.user;
            // Redirect the user to the Facebook Page Connection Page
            window.location.href = 'facebook-connect.html';
            })
            .catch((error) => {
            // Handle login errors
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorMessage);
            });

            alert('Login button clicked');
            window.location.href = 'facebook-connect.html';
        });
    }
});
