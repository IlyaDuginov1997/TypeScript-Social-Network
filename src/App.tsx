import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Navbar from './Components/Navbar/Navbar';
import {Route} from 'react-router-dom';
import News from './Components/News/News';
import Music from './Components/Music/Music';
import Settings from './Components/Settings/Settings';
import DialogsContainer from './Components/Dialogs/DialogsContainer';
import UsersContainer from './Components/Users/UsersContainer';
import ProfileContainer from './Components/Profile/ProfileContainer';

const App = () => {

    return (
        <div className='appWrapper'>
            <Header/>
            <Navbar/>
            <div className='appWrapperContent'>
                <Route path={'/profile/:userId?'}
                       render={() => <ProfileContainer/>}/>

                <Route path={'/dialogs'}
                       render={() => <DialogsContainer/>}/>

                <Route path={'/users'}
                       render={() => <UsersContainer />}/>

                <Route path={'/news'} render={() => <News/>}/>
                <Route path={'/music'} render={() => <Music/>}/>
                <Route path={'/settings'} render={() => <Settings/>}/>
            </div>
        </div>
    );
}


export default App;
