import * as firebase from 'firebase/app'

import "firebase/firestore";

// Your firebase config
var config = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: ''
}

firebase.initializeApp(config)

const db = firebase.firestore()
export default db
