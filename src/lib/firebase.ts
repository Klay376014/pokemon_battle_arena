import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDh6tOPoZqk7PeJfqJnf4w0O0nGDupBPW8',
  authDomain: 'pokemon-battle-area-database.firebaseapp.com',
  projectId: 'pokemon-battle-area-database',
  storageBucket: 'pokemon-battle-area-database.firebasestorage.app',
  messagingSenderId: '200692055130',
  appId: '1:200692055130:web:49128e70e22d034facec63',
  measurementId: 'G-LRDPHPLCXX'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)
