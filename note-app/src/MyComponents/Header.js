import React from 'react';
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import { Button } from '@material-ui/core';
import firebase from 'firebase';
import { withStyles } from '@material-ui/core';
import styles from './styles';
import {
    Link
  } from "react-router-dom";

class HeaderComponent extends React.Component{
    render(){
        const {user,classes}=this.props;
        return (<>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">My Notes</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/dashboard">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/About" >About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/ContactUs" >Contact Us</Link>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2 mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-dark my-2 my-sm-0" type="submit">Search</button>
                        </form>
                        <Chip icon={<FaceIcon />} label={user} className={classes.chip} />
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={this.signOut}
                            className={classes.signOutBtn}
                        >
                            Sign Out
                        </Button> 
                    </div>
                </div>
            </nav>
    
    
    </>
        )
}

signOut = () => {
    firebase.auth().signOut();};
}
export default withStyles(styles)(HeaderComponent);
