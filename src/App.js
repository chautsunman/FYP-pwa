import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MaterialAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ExitToApp from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import HomeIcon from '@material-ui/icons/Home';
import FavouriteIcon from '@material-ui/icons/Favorite';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import LinearProgress from '@material-ui/core/LinearProgress';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {withRouter} from 'react-router';
import {Home, Details, ModelDetails, Settings, Favourite} from './pages';
import {connect} from 'react-redux';
import {updateUser, getUserProfile} from './actions/auth';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Input from '@material-ui/core/Input';
import firebase from 'firebase';
import './App.css';

const google = window.google;
google.charts.load('current', {packages: ['corechart']});

const mapStateToProps = state => ({
  uid: state.get('auth').get('uid'),
  userProfile: state.get('auth').get('userProfile')
});

const mapDispatchToProps = dispatch => ({
  updateUser: user => {dispatch(updateUser(user))},
  getUserProfile: uid => {dispatch(getUserProfile(uid))}
});

const drawerWidth = 240;

const styles = theme => ({
  loginRoot: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    width: '100%'
  },
  root: {
    display: 'flex',
    minHeight: '100%',
    width: '100%'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawerIcon: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative'
    }
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%'
  },
  toolbar: theme.mixins.toolbar,
  content: {
    backgroundColor: theme.palette.background.default,
    flexGrow: 1,
    padding: theme.spacing.unit * 2
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  grow:{
    flexGrow:0.2
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 500,
    },
  },
});

class AppBar extends Component {
  render() {
    const {onMobileDrawerToggle, onLogoutBtnClick, history, location, loading, classes} = this.props;

    let appBarIcon;
    if (location.pathname === '/') {
      appBarIcon =
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onMobileDrawerToggle}
            className={classes.drawerIcon}
          >
            <MenuIcon />
          </IconButton>;
    } else {
      appBarIcon =
          <IconButton
            color="inherit"
            aria-label="back"
            onClick={history.goBack}
          >
            <ArrowBackIcon />
          </IconButton>;
    }

    return (
      <MaterialAppBar className={classes.appBar}>
        <Toolbar>
          {appBarIcon}
          <Typography variant="title" color="inherit" noWrap>
            App
          </Typography>
          <div className={classes.grow}/>
          {
            location.pathname === '/' &&
            <IconButton
              color="inherit"
              onClick={onLogoutBtnClick}
            >
              <ExitToApp />
            </IconButton>
          }
        </Toolbar>
        {loading && <LinearProgress color="secondary" />}
      </MaterialAppBar>
    );
  }
}
AppBar = withRouter(AppBar);

class AppDrawer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 1
    }
  }

  handleListItemClick = () => {
    console.log('test');
  }
  
  onDrawerBtnClick = (link) => {
    this.props.history.push(link);
    if (this.props.device === 'mobile') {
      this.props.mobileDrawerToggle();
    }
  };
  
  render(){
    const {device, classes, location} = this.props;

    // let HomeIcon;
    // if (location.pathname === '/') {
    //   HomeIcon =
    //     <ListItem button key={'Home'} onClick={() => this.onDrawerBtnClick('/')} disabled={true}>
    //       <ListItemIcon><HomeIcon /></ListItemIcon>
    //       <ListItemText primary={'Home'} />
    //     </ListItem>;
    // } else {
    //   HomeIcon =
    //     <ListItem button key={'Home'} onClick={() => this.onDrawerBtnClick('/')}>
    //       <ListItemIcon><HomeIcon /></ListItemIcon>
    //       <ListItemText primary={'Home'} />
    //     </ListItem>;
    // }

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List component="nav">
          <ListItem button key={'Home'} onClick={() => this.onDrawerBtnClick('/')}>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary={'Home'} />
          </ListItem>
          <ListItem button key={'Favourite'} onClick={() => this.onDrawerBtnClick('/favourite')}>
            <ListItemIcon><FavouriteIcon /></ListItemIcon>
            <ListItemText primary={'Favourite'} />
          </ListItem>
          <ListItem button key={'Settings'} onClick={() => this.onDrawerBtnClick('/settings')}>
            <ListItemIcon><SettingsIcon /></ListItemIcon>
            <ListItemText primary={'Settings'} />
          </ListItem>
        </List>
      </div>
    );

    if (device === 'mobile') {
      return (
        <Drawer
          variant="temporary"
          open={this.props.mobileOpenStatus}
          onClose={this.props.mobileDrawerToggle}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true
          }}
        >
          {drawer}
        </Drawer>
      );
    } else {
      return (
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          {drawer}
        </Drawer>
      );
    }
  }
}
AppDrawer = withRouter(AppDrawer);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      googleChartsLoaded: false,
      mobileDrawerOpen: false,
      loading: false
    };
  }

  onSignInAnonymouslyClick = () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  onLogoutBtnClick = () => {
    firebase.auth().signOut();
  };

  onGoogleChartsLoaded = () => {
    this.setState({googleChartsLoaded: true});
  };

  onMobileDrawerToggle = () => {
    this.setState(state => ({mobileDrawerOpen: !state.mobileDrawerOpen}));
  };

  setLoading = (loading) => {
    this.setState({loading: loading});
  };

  componentDidMount() {
    this.unsubscribeAuthChanged = firebase.auth().onAuthStateChanged(user => {
      this.props.updateUser(user);

      if (user) {
        const uid = user.uid;
        this.props.getUserProfile(uid);
      } else {
        this.props.getUserProfile(null);
      }
    });

    google.charts.setOnLoadCallback(this.onGoogleChartsLoaded);
  }

  componentWillUnmount() {
    this.unsubscribeAuthChanged();
  }

  render() {
    const {uid, classes} = this.props;

    const drawer = (
      <div></div>
    );

    if (!uid) {
      return (
        <div className={classes.loginRoot}>
          <Button onClick={this.onSignInAnonymouslyClick} variant="contained">Sign In Using Facebook</Button>
        </div>
      );
    }

    if (!this.state.googleChartsLoaded) {
      return null;
    }

    return (
      <div className={classes.root}>
        <Router>
          <div className={classes.root}>
            <AppBar onMobileDrawerToggle={this.onMobileDrawerToggle} onLogoutBtnClick={this.onLogoutBtnClick} loading={this.state.loading} classes={classes} />
            <Hidden mdUp>
              <AppDrawer
                mobileOpenStatus={this.state.mobileDrawerOpen}
                mobileDrawerToggle={this.onMobileDrawerToggle}
                device="mobile"
                classes={classes} />
              {/* <Drawer
                variant="temporary"
                open={this.state.mobileDrawerOpen}
                onClose={this.onMobileDrawerToggle}
                classes={{
                  paper: classes.drawerPaper
                }}
                ModalProps={{
                  keepMounted: true
                }}
              >
                {drawer}
              </Drawer> */}
            </Hidden>
            <Hidden smDown>
              <AppDrawer
                device="desktop"
                classes={classes} />
              {/* <Drawer
                variant="permanent"
                classes={{
                  paper: classes.drawerPaper
                }}
              >
                {drawer}
              </Drawer> */}
              
            </Hidden>
            <div className={classes.container}>
              <div className={classes.toolbar} />
                <main className={classes.content}>
                <Route
                  path="/"
                  exact
                  render={(props) => <Home {...props} setLoading={this.setLoading} />} />
                <Route
                  path="/favourite"
                  render={(props) => <Favourite {...props} setLoading={this.setLoading} />} />
                <Route
                  path="/settings"
                  render={(props) => <Settings {...props} setLoading={this.setLoading} />} />
                <Route
                  path="/stockDetails/:stockCode"
                  render={(props) => <Details {...props} setLoading={this.setLoading} />} />
                <Route
                  path="/modelDetails/:stockCode/:modelIdx"
                  render={(props) => <ModelDetails {...props} setLoading={this.setLoading} />} />
                </main>
              </div>
            </div>
        </Router>
      </div>
    );
  }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(App));
