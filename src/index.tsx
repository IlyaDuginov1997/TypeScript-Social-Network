import React from 'react';
import './index.css';
import {store} from './Redux/redux-store';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import {RootStateType} from './Redux/Store';


export function rerenderEntireTree(state: RootStateType) {
    debugger
    ReactDOM.render(
        <BrowserRouter>
            <React.StrictMode>
                <App state={state}
                     dispatch={store.dispatch.bind(store)}
                     store={store}/>
            </React.StrictMode>
        </BrowserRouter>,
        document.getElementById('root')
    );
}

rerenderEntireTree(store.getState())

store.subscribe(() => {
    let state = store.getState()
    rerenderEntireTree(state)
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



