import {initializeApp} from 'firebase/app'
import{
    getFirestore, collection, onSnapshot, addDoc, deleteDoc, doc
} from 'firebase/firestore'

import{
    getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, sendEmailVerification
}from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyC0En0dr6Uiw_VPYyi98H1ZtvYQSbVf0FI",
    authDomain: "fir-b0bad.firebaseapp.com",
    projectId: "fir-b0bad",
    storageBucket: "fir-b0bad.firebasestorage.app",
    messagingSenderId: "738479192303",
    appId: "1:738479192303:web:8f27d7129fdeac0f7f431a"
  }

  initializeApp(firebaseConfig)

  //inti service
  const db = getFirestore()
  const auth = getAuth()

  //collection
  const colRef = collection(db, 'books')

  //get collection in real time
  onSnapshot(colRef,(snapshot)=>{
    let books = []
        snapshot.docs.forEach((doc)=>{
            books.push({ ...doc.data(), id: doc.id})
        })
        console.log(books)
  })


  //adding documents

  const addBookform = document.querySelector('.add')
  addBookform.addEventListener('submit', (e)=>{
    e.preventDefault()

    addDoc(colRef,{
        title: addBookform.title.value,
        author: addBookform.author.value
    })
        .then(()=>{
            addBookform.reset()
        })
  })


  //deleting document

  const deleteBookfrom = document.querySelector('.delete')
  deleteBookfrom.addEventListener('submit', (e)=>{
    e.preventDefault()

    const docRef = doc(db, 'books', deleteBookfrom.id.value)

    deleteDoc(docRef)
    .then(()=>{
        deleteBookfrom.reset()
    })
  })


  //sign up form
  const signupform = document.querySelector('.sign-in')
signupform.addEventListener('submit', (e)=>{
  e.preventDefault()  

  const email = signupform.email.value
  const password = signupform.password.value

  createUserWithEmailAndPassword(auth, email, password)
  .then((cred)=>{
      console.log('user created:', cred.user)
      signupform.reset()
  })
  .catch((err)=>{
      console.log(err.message);
  })
  // Email Verification is called here
  sendEmailVerification(cred.user)
})

  //logging in and out
  const logoutButton = document.querySelector('.logout')
  logoutButton.addEventListener('click', () => {
    signOut(auth)
    .then(() => {
        console.log('logged out');
    })
    .catch((error) => {
        console.error('Error logging out:', error);
    });
});


  const loginFrom = document.querySelector('.login')
  loginFrom.addEventListener('submit', (e)=>{
    e.preventDefault()

    const email = loginFrom.email.value
    const password = loginFrom.password.value

    signInWithEmailAndPassword(auth, email, password)
    .then((cred)=>{
        console.log('user is logged in', cred.user)
    })
    .catch((err)=>{
        console.log(err.message)
    })
  })

  const Unsubbutton = document.querySelector('.Unsub')
  Unsubbutton.addEventListener('click', ()=>{

  })