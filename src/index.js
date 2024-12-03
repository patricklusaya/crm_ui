import React from 'react';
// import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//redux import
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

//reducer import
import Reducer from './reducers';

//router import
import {BrowserRouter} from "react-router-dom";

const store = configureStore({
  reducer: Reducer,
});


// const root = ReactDOM.createRoot(document.getElementById('root'));
const container = document.getElementById('root');
const root = createRoot(container);

root.render(

  // Remove BrowserRouter tags if you dont want to use Routing
    <BrowserRouter>
      <Provider store={store}>
          <App />
      </Provider>
    </BrowserRouter>
);

reportWebVitals();
