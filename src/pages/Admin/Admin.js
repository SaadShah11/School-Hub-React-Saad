import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
  Link,
  InputBase
} from "@material-ui/core";
import Header from './Header/Header'
import { withRouter } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import classnames from "classnames";
import RadioGroup from "@material-ui/core/RadioGroup"
import Radio from "@material-ui/core/Radio"
import FormControlLabel from "@material-ui/core/FormControlLabel"
// styles
import useStyles from "./styles";

// logo
import logo from "../../logo.png";
import google from "../../images/google.svg";

// context
import { useUserDispatch, loginUser, admin } from "../../context/UserContext";
import Widget from "../../components/Widget/Widget";
const teachers=[
  {name: "Muhammad Ahmed", icon:<DeleteIcon/>},
  {name: "Ali Murtaza", icon:<DeleteIcon/>},
  {name: "Mr. john wick", icon:<DeleteIcon/>}
]
function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);
  var [nameValue, setNameValue] = useState("");
  var [loginValue, setLoginValue] = useState("admin@flatlogic.com");
  var [phoneValue, setphoneValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("password");

  return (
      <div>
    <Header />
    <Grid container className={classes.container}>
      

      <div className={classes.formContainer}>
      <Widget title='Admin Dashboard' disableWidgetMenu>
        <div className={classes.form}>
            <div>
            <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="secondary"
            textColor="secondary"
            orientation='vertical'
            // centered
          >
            <Tab label="General" classes={{ root: classes.tab }} />
            <Tab label="About" classes={{ root: classes.tab }} />
            <Tab label="Photos" classes={{ root: classes.tab }} />
            <Tab label="Video" classes={{ root: classes.tab }} />
            <Tab label="Teachers" classes={{ root: classes.tab }} />
            <Tab label="Academic" classes={{ root: classes.tab }} />
            <Tab label="Streaming" classes={{ root: classes.tab }} />
            <Tab label="Fee" classes={{ root: classes.tab }} />
          </Tabs>
            </div>
            <div >
            {activeTabId === 0 && (
            <React.Fragment >
              <div className={classes.innerform}>
              <TextField id="name" placeholder="Name" fullWidth/>
             <TextField id="address" placeholder="Address" fullWidth/>
             <TextField id="zip" placeholder="Zip code" fullWidth/>
             <TextField id="email" placeholder="Email" fullWidth/>
             <TextField id="contact" placeholder="Phone Number" fullWidth/>
             <TextField id="insta" placeholder="Instagram Link" fullWidth/>
             <TextField id="facebook" placeholder="Facebook Link" fullWidth/>
             <Button size="large" variant="contained" color="seconadary"
                   className={classes.createAccountButton}
                > Save</Button>
              </div>
            </React.Fragment>
          )}
          {activeTabId === 1 && (
            <React.Fragment>
              <div className={classes.innerform}>
              <textarea className={classes.para} id="about" placeholder="Enter about your School" fullWidth/>
              <Button size="large" variant="contained" color="seconadary"
                   className={classes.createAccountButton}
                > Save</Button>
                </div>
            </React.Fragment>
          )}
            {activeTabId === 2 && (
            <React.Fragment>
              <div className={classes.innerform}>
                <div>
                <text>Upload photo 1:</text>
                <Button  variant="outlined" color="seconadary"
                   className={classes.createAccountButton}
                > upload</Button>
                </div>
                <div>
                <text>Upload photo 2:</text>
                <Button  variant="outlined" color="seconadary"
                   className={classes.createAccountButton}
                > upload</Button>
                </div>
                <div>
                <text>Upload photo 3:</text>
                <Button  variant="outlined" color="seconadary"
                   className={classes.createAccountButton}
                > upload</Button>
                </div>
                <div>
                <text>Upload photo 4:</text>
                <Button  variant="outlined" color="seconadary"
                   className={classes.createAccountButton}
                > upload</Button>
                </div>
                <Button size="large" variant="contained" color="seconadary"
                   className={classes.createAccountButton}
                > Save</Button>
              </div>
            </React.Fragment>
          )}
          {activeTabId === 3 && (
            <React.Fragment>
              <div className={classes.innerform}>
                <TextField id="video" placeholder="Paste youtube video link here" fullWidth/>
                <Button size="large" variant="contained" color="seconadary"
                   className={classes.createAccountButton}
                > Save</Button>
              </div>
            </React.Fragment>
          )}
          {activeTabId === 4 && (
            <React.Fragment>
              <div className={classes.innerform}>
              <Typography variant="h2">
                Registered Teachers
              </Typography>
              {teachers.map(function(item){return(
                <div style={{display:'flex', flexDirection:'row'}}>
                  <div style={{width:'200px'}}><text >{item.name}</text></div>
                  {item.icon}
                </div>
                
              )})}
                <Button size="large" variant="contained" color="seconadary"
                   className={classes.createAccountButton}
                > Teacher Requests</Button>
              </div>
            </React.Fragment>
          )}
            {activeTabId === 6 && (
            <React.Fragment>
              <div className={classes.innerform}>
              <TextField id="date" placeholder="Date" />
              <br/>
              <TextField id="time" placeholder="Start Time"/>
              <br/>
              <TextField id="time" placeholder="End time" />
              <br/>
              <Button size="large" variant="contained" color="seconadary"
                   className={classes.createAccountButton}
                > Request Streaming </Button>
              </div>
            </React.Fragment>
          )}
            
            
            
            
            </div>
          
          
        </div>
        </Widget>
      </div>
      
    </Grid>
      </div>
      
  );
}

export default withRouter(Login);
