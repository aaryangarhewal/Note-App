import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import firebase from 'firebase';

class LoginComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            email: null,
            password: null,
            loginError: ''
        }
    }

    render() { 

        const { classes } = this.props ;

        return ( 
            <div className = {classes.body}>
            <main className = { classes.main }>
                <CssBaseline></CssBaseline>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                        Log In
                    </Typography>
                    <form className = {classes.form} onSubmit={(e) => this.submitLogin(e)}>
                        <FormControl required fullWidth margin='normal'>
                            <InputLabel htmlFor = 'login-email-input'>Enter Your Email</InputLabel>
                            <Input autoComplete='email' autoFocus id='login-email-input' onChange={(e) => this.userTyping('email',e)}></Input>
                        </FormControl>
                        <FormControl required fullWidth margin='normal'>
                            <InputLabel htmlFor = 'login-password-input'>Enter Your Password</InputLabel>
                            <Input type='password' id='login-password-input' onChange={(e) => this.userTyping('password',e)}></Input>
                        </FormControl>
                        <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>Log In</Button>
                    </form>
                    {
                        this.state.loginError ?
                        <Typography className={classes.errorText} component='h5' variant='h6'>
                            Incorrect Login Credentials!
                        </Typography> :
                        null
                    }
                    <br></br>
                    <p><Link className={classes.signUpLink} to='/forgotpassword'>Forgot Password</Link></p>
                    <p>Don't Have an Account? <Link className={classes.signUpLink} to='/signup'> Sign Up</Link></p>
                </Paper>
            </main>
            </div>
         );
    }

    userTyping = (type, e) => {
        switch (type) {
            case 'email':
                this.setState({email: e.target.value});
                break;
            case 'password':
                this.setState({password: e.target.value});
                break;    
        
            default:
                break;
        }
    }

    submitLogin = async (e) => {
        e.preventDefault();
    await firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.props.history.push('/dashboard');
            }, err => {
                this.setState({loginError: 'Server error'});
                console.log(err);
            })
    }

}
 
export default withStyles(styles)(LoginComponent);