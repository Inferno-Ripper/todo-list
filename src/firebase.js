import {
	FacebookAuthProvider,
	getAuth,
	GoogleAuthProvider,
	OAuthProvider,
	GithubAuthProvider,
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

const microsoftProvider = new OAuthProvider('microsoft.com');
// microsoft auth sign in doesn't work without using this
microsoftProvider.setCustomParameters({
	tenant: '52237e8e-58c1-4715-9c0b-341df4360da0',
});

const githubProvider = new GithubAuthProvider();

export {
	auth,
	googleProvider,
	facebookProvider,
	microsoftProvider,
	githubProvider,
};
