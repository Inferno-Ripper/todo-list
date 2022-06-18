import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// redux
import { store } from './app/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	// react strict mode disabled because it causes the the drag and drop feature to not work properly
	// <React.StrictMode>
	<Provider store={store}>
		<App />
	</Provider>
	// </React.StrictMode>
);
