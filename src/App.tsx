import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Navbar from './Components/Navbar/Navbar';
import Dialogs from './Components/Dialogs/Dialogs';
import Profile from './Components/Profile/Profile';
import {Route} from 'react-router-dom';
import News from './Components/News/News';
import Music from './Components/Music/Music';
import Settings from './Components/Settings/Settings';
import {RootStateType} from './Redux/State';

type AppType = {
    state: RootStateType
    changePostEL: (el: string) => void,
    addPost: () => void,
    changeMessageEl: (el: string) => void,
    addMessage: () => void
}

const App = (props: AppType) => {

    let posts = props.state.profileComponent.posts;
    let dialogsState = props.state.dialogComponent;

    return (
        <div className='appWrapper'>
            <Header/>
            <Navbar/>
            <div className='appWrapperContent'>
                <Route path={'/profile'}
                       render={() => <Profile posts={posts}
                                              newPostText={props.state.profileComponent.newPostText}
                                              addPost={props.addPost}
                                              changePostEL={props.changePostEL}/>}/>

                <Route path={'/dialogs'}
                       render={() => <Dialogs dialogsState={dialogsState}
                                              addMessage={props.addMessage}
                                              changeMessageEl={props.changeMessageEl}/>}/>

                <Route path={'/news'} render={() => <News/>}/>
                <Route path={'/music'} render={() => <Music/>}/>
                <Route path={'/settings'} render={() => <Settings/>}/>
            </div>
        </div>
    );
}


export default App;
