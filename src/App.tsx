import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Navbar from './Components/Navbar/Navbar';
import Profile from './Components/Profile/Profile';
import {Route} from 'react-router-dom';
import News from './Components/News/News';
import Music from './Components/Music/Music';
import Settings from './Components/Settings/Settings';
import {DispatchActionType, RootStateType} from './Redux/Store';
import {ReduxStoreType} from './Redux/redux-store';
import DialogsContainer from './Components/Dialogs/DialogsContainer';

type AppType = {
    state: RootStateType
    // changePostEL: (el: string) => void,
    // addPost: () => void,
    // changeMessageEl: (el: string) => void,
    // addMessage: () => void
    dispatch: (action: DispatchActionType) => void
    store: ReduxStoreType
}

const App = (props: AppType) => {

    return (
        <div className='appWrapper'>
            <Header/>
            <Navbar/>
            <div className='appWrapperContent'>
                <Route path={'/profile'}
                       render={() => <Profile store={props.store}/>}/>

                <Route path={'/dialogs'}
                       render={() => <DialogsContainer store={props.store}/>}/>

                <Route path={'/news'} render={() => <News/>}/>
                <Route path={'/music'} render={() => <Music/>}/>
                <Route path={'/settings'} render={() => <Settings/>}/>
            </div>
        </div>
    );
}


export default App;
