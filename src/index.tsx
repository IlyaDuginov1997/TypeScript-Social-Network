import React from 'react';
import './index.css';
import {addMessage, addPost, changeMessageEl, changePostEL, observe, state} from './Redux/State';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';


export function rerenderEntireTree() {
    ReactDOM.render(
        <BrowserRouter>
            <React.StrictMode>
                <App state={state}
                     addPost={addPost}
                     changePostEL={changePostEL}
                     addMessage={addMessage}
                     changeMessageEl={changeMessageEl}/>
            </React.StrictMode>
        </BrowserRouter>,
        document.getElementById('root')
    );
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
rerenderEntireTree()
observe(rerenderEntireTree)


