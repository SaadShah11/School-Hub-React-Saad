import React from "react";
import {Route,Switch,Redirect,withRouter,} from "react-router-dom";
import {Box, IconButton, Link} from '@material-ui/core';
import Icon from '@mdi/react';
//icons
import {mdiFacebook as FacebookIcon,mdiTwitter as TwitterIcon,mdiGithub as GithubIcon,} from '@mdi/js'
// styles
import useStyles from "./styles";
// components
import Header from "../Header";
import Sidebar from "../Sidebar";
// pages
import Dashboard from "../../pages/dashboard";
import Home from "../../pages/home/Home";
import Notifications from "../../pages/notifications";
import Maps from "../../pages/maps";
import Charts from "../../pages/charts";
import Signin from '../../pages/profiling/signin/signinNew'

function Layout(props) {
  var classes = useStyles();

  const url1 = "/dashboard/post"

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classes.content}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/app/home" render={(props) => (
          <Home {...props} fetchUrl={url1}/>
        )}/>
              <Route path="/app/typography" component={Dashboard} />
              <Route path="/app/map" component={Maps} />
              <Route path="/app/notifications" component={Notifications} />
              <Route
                exact
                path="/app/ui"
                render={() => <Redirect to="/app/ui/icons" />}
              />
              <Route path="/app/ui/maps" component={Charts} />
              <Route path="/app/charts" component={Charts} />
            </Switch>
            <Box
              mt={5}
              width={"100%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent="space-between"
            >
              <div>
                <Link
                  color={'primary'}
                  href={'/'}
                  target={'_blank'}
                  className={classes.link}
                >
                  SchoolHub
                </Link>
                <Link
                  color={'primary'}
                  href={'/'}
                  target={'_blank'}
                  className={classes.link}
                >
                  About Us
                </Link>
                <Link
                  color={'primary'}
                  href={'/'}
                  target={'_blank'}
                  className={classes.link}
                >
                  Blog
                </Link>
              </div>
              <div>
                <Link
                  href={'https://www.facebook.com/osama2jz'}
                  target={'_blank'}
                >
                  <IconButton aria-label="facebook">
                    <Icon
                      path={FacebookIcon}
                      size={1}
                      color="#6E6E6E99"
                    />
                  </IconButton>
                </Link>
                <Link
                  href={'https://twitter.com/i_mub33n'}
                  target={'_blank'}
                >
                  <IconButton aria-label="twitter">
                    <Icon
                      path={TwitterIcon}
                      size={1}
                      color="#6E6E6E99"
                    />
                  </IconButton>
                </Link>
                <Link
                  href={'https://github.com/imub33n/School-Hub'}
                  target={'_blank'}
                >
                  <IconButton
                    aria-label="github"
                    style={{marginRight: -12}}
                  >
                    <Icon
                      path={GithubIcon}
                      size={1}
                      color="#6E6E6E99"
                    />
                  </IconButton>
                </Link>
              </div>
            </Box>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
