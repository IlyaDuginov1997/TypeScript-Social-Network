import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {Route} from 'react-router-dom';
import News from './Components/News/News';
import Music from './Components/Music/Music';
import Settings from './Components/Settings/Settings';
import Login from './Components/Login/Login';
import {DialogsContainer} from './Components/Dialogs/DialogsContainer';
import {HeaderContainer} from './Components/Header/HeaderContainer';
import {ProfileContainer} from './Components/Profile/ProfileContainer';
import {UsersContainer} from './Components/Users/UsersContainer';


const App = () => {

    return (
        <div className='appWrapper'>
            <HeaderContainer/>
            <Navbar/>
            <div className='appWrapperContent'>
                <Route path={'/profile/:userId?'}
                       render={() => <ProfileContainer/>}/>

                <Route path={'/dialogs'}
                       render={() => <DialogsContainer/>}/>

                <Route path={'/users'}
                       render={() => <UsersContainer/>}/>

                <Route path={'/news'} render={() => <News/>}/>
                <Route path={'/music'} render={() => <Music/>}/>
                <Route path={'/settings'} render={() => <Settings/>}/>
                <Route path={'/login'} render={() => <Login/>}/>
            </div>
        </div>
    );
}


export default App;
