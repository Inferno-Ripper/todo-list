import {
	FacebookAuthProvider,
	getAuth,
	GoogleAuthProvider,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyD83jaL7imhcvccKhmV3-rufCBNlz4P03U',
	authDomain: 'todo-list-79a3a.firebaseapp.com',
	projectId: 'todo-list-79a3a',
	storageBucket: 'todo-list-79a3a.appspot.com',
	messagingSenderId: '46859315314',
	appId: '1:46859315314:web:4a4ea2fdb73e0d25a0baeb',
	measurementId: 'G-3NMBSCLW0K',
};

// init firebase
initializeApp(firebaseConfig);

// init services
const db = getFirestore();
const auth = getAuth();

const googleProvider = new GoogleAuthProvider();

const facebookProvider = new FacebookAuthProvider();

export { googleProvider, facebookProvider, auth };
