import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAdev0tDmFC7cxyL6oDoQz-IufCKtBeZVU',
  authDomain: 'trigo-8218.firebaseapp.com',
  databaseURL: 'https://trigo-8218.firebaseio.com',
  projectId: 'trigo-8218',
  storageBucket: 'trigo-8218.appspot.com',
  messagingSenderId: '821841165337',
  appId: '1:821841165337:web:9b292eacf5ed0edd723e88',
  measurementId: 'G-5RQ4LKR8NM',
}

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export { firebase as default, storage }
