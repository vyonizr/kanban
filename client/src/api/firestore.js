import * as firebase from 'firebase/app'

import "firebase/firestore";

const config = {
  apiKey: 'AIzaSyDDjVhbpWXzM4yBs3WxgT2dvckfMA4YM48',
  authDomain: 'kanban-d2e63.firebaseapp.com',
  databaseURL: 'https://kanban-d2e63.firebaseio.com',
  projectId: 'kanban-d2e63',
  storageBucket: 'kanban-d2e63.appspot.com',
  messagingSenderId: '393242072909'
}

firebase.initializeApp(config)

const db = firebase.firestore()
export default db
