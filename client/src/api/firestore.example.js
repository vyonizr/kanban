import firebase from 'firebase'

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
