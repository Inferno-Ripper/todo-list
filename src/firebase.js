import {
	FacebookAuthProvider,
	getAuth,
	GoogleAuthProvider,
	OAuthProvider,
	GithubAuthProvider,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { collection, getFirestore } from 'firebase/firestore';
// import('dotenv').config();

const firebaseConfig = {
	apiKey: process.env.REACT_APP_apiKey,
	authDomain: process.env.REACT_APP_authDomain,
	projectId: process.env.REACT_APP_projectId,
	storageBucket: process.env.REACT_APP_storageBucket,
	messagingSenderId: process.env.REACT_APP_messagingSenderId,
	appId: process.env.REACT_APP_appId,
};

// init firebase
initializeApp(firebaseConfig);

// init services
const db = getFirestore();
const auth = getAuth();

// auth providers
const googleProvider = new GoogleAuthProvider();

const facebookProvider = new FacebookAuthProvider();

const microsoftProvider = new OAuthProvider('microsoft.com');
// microsoft auth sign in doesn't work without using this
microsoftProvider.setCustomParameters({
	tenant: '52237e8e-58c1-4715-9c0b-341df4360da0',
});

const githubProvider = new GithubAuthProvider();

// database reference
const colRef = collection(db, 'todos');

export {
	auth,
	googleProvider,
	facebookProvider,
	microsoftProvider,
	githubProvider,
	colRef,
};
