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
import {connect} from 'react-redux';
import {RootReduxState} from './Redux/redux-store';
import {appInitializing} from './Redux/appReducer';
import {Preloader} from './Common/Preloader/Preloader';
import {compose} from 'redux';

type AppPropsType = {
  appInitializing: () => void
  isInitialized: boolean
}

type MapStateToPropsType = {
  isInitialized: boolean
}

class App extends React.Component<AppPropsType, {}> {

  componentDidMount() {
    this.props.appInitializing();
  }

  render() {
    if (!this.props.isInitialized) {
      return <div>
        <Preloader/>
      </div>;
    }

    return (
      <div className='appWrapper'>
        <HeaderContainer/>
        <Navbar/>
        <div className='appWrapperContent'>
          <Route path={'/profile/:userId?'} render={() => <ProfileContainer/>}/>
          <Route path={'/dialogs'} render={() => <DialogsContainer/>}/>
          <Route path={'/users'} render={() => <UsersContainer/>}/>
          <Route path={'/news'} render={() => <News/>}/>
          <Route path={'/music'} render={() => <Music/>}/>
          <Route path={'/settings'} render={() => <Settings/>}/>
          <Route path={'/login'} render={() => <Login/>}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootReduxState): MapStateToPropsType => {
  return {
    isInitialized: state.app.isInitialized,
  };
};

export default compose(
  connect(mapStateToProps, {appInitializing})
)(App);
