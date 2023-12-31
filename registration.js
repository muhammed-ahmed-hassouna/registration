const firebaseConfig = {
  apiKey: "AIzaSyAPmc5UwkZ2At9lDD7-YcGgZFXLTD03r8E",
  authDomain: "registration-22e51.firebaseapp.com",
  databaseURL: "https://registration-22e51-default-rtdb.firebaseio.com",
  projectId: "registration-22e51",
  storageBucket: "registration-22e51.appspot.com",
  messagingSenderId: "499121232679",
  appId: "1:499121232679:web:f00e2c7443c6ec59d92702",
  measurementId: "G-QYCDYE2PBY"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

document.getElementById('signup').addEventListener('click', function () {
  const email = document.getElementById('Email').value;
  const password = document.getElementById('Password').value;
  const phoneNumber = document.getElementById('PhoneNumber').value;
  const username = document.getElementById('Username').value;

  if (username.includes(' ')) {
    alert('Username cannot contain spaces.');
    return;
  }
  
  if (
    password.length < 8 ||
    !/[0-9]/.test(password) ||
    !/[A-Z]/.test(password) ||
    !/[!@#$%^&*]/.test(password)
  ) {
    alert('Password must be at least 8 characters and contain 1 number, 1 uppercase letter, and special characters.');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Invalid email format.');
    return;
  }

  const phoneRegex = /^07\d{8}$/;
  if (!phoneRegex.test(phoneNumber)) {
    alert('Invalid phone number format. It should start with 07 and have 10 digits.');
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);

      // Save user data to Firestore
      return db.collection('users').doc(email).set({
        username: username,
        email: email,
        phoneNumber: phoneNumber,
      });
    })
    .then(() => {
      console.log('User data saved to Firestore successfully.');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === 'auth/email-already-in-use') {
        alert('Email address is already in use. Please use a different email address.');
      } else {
        console.error(`${errorCode}: ${errorMessage}`);
      }
    });
});
