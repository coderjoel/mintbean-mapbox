import React, {useState} from 'react';
import MapGL, { Marker, Popup, FullscreenControl} from 'react-map-gl';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ParkInfo from './park-info'
import Pins from './pins';

const geojson = require('./geodata/National_Parks.json');

const MAPBOX_TOKEN = 'pk.eyJ1IjoiamNoYWNrb3NhamkiLCJhIjoiY2tiZ21pMThkMTZ4cTJ3bXJsNHdraGJmMSJ9.r-7cvl27blbieNlinE6S0g'; // Set your mapbox token here
const MAPBOX_STYLE = 'mapbox://styles/jchackosaji/ckbgp6kta4x8x1jlztdr4b13e';

const fullscreenControlStyle = {
  position: 'absolute',
  top: 36,
  left: 0,
  padding: '10px'
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbarStyle: {
    backgroundColor: '#182F25'
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));

export default function App() {
  
  const [state, setState] = useState({
    viewport: {
      latitude: 37.785164,
      longitude: -100,
      zoom: 3.5,
      bearing: 0,
      pitch: 0
    },
    left: false,
    popupInfo: null,
  });

  const classes = useStyles();

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, ['left']: open });
  };

  const list = (anchor) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer('left', false)}
      onKeyDown={toggleDrawer('left', false)}
    >
      <List>
        {['United States', 'Canada (Coming Soon)'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['About'].map((text, index) => (
          <ListItem button key={text}>
            <a href="https://github.com/coderjoel/mintbean-mapbox">
            <ListItemText primary={text} />
            </a>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const _renderPopup = () => {
    const { popupInfo } = state;
    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.Longitude}
          latitude={popupInfo.Latitude}
          closeOnClick={false}
          onClose={() => setState({ popupInfo: null })}
        >
          <ParkInfo info={popupInfo} />
        </Popup>
      )
    );
  }

  const _onClickMarker = (location) => {
    setState({popupInfo: location});
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar
        className={classes.toolbarStyle}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer('left', true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            National Parks
          </Typography>
          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…(Not "
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(evt) => setState({searchText: evt.target.value})}
              value={state.searchText}
            />
          </div> */}
        </Toolbar>
      </AppBar>
      {
        <React.Fragment key={'left'}>
          <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
            {list('left')}
          </Drawer>
        </React.Fragment>
      }
      <MapGL
      {...state.viewport}
      width="100vw"
      height="93.5vh"
      onViewportChange={viewport => setState({viewport})}
      mapboxApiAccessToken={MAPBOX_TOKEN}
      mapStyle={MAPBOX_STYLE}
    >
      {_renderPopup()}
      <Pins data={geojson} onClick={_onClickMarker} />
      <div style={fullscreenControlStyle}>
          <FullscreenControl />
        </div>
      </MapGL>
    </div>
  );
}