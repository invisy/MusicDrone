import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import PropTypes from "prop-types";
import {withStyles} from '@material-ui/core/styles';
import Alert from "@material-ui/lab/Alert";
import AuthService from "../services/auth.service";
import { Link } from 'react-router-dom';
import {ExpandLess} from "@material-ui/icons";

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignUp extends Component {
  static displayName = SignUp.name;

  constructor(props) {
    super(props);
    this.state = { firstName: "", lastName: "", email: "", password: "", marketingAgreement: true, error: "", loading: true };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  async handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    await this.setState({
      [name]: value
    });
  }
  
  async handleSubmit(event)
  {
    event.preventDefault();
    await this.registerUser(this.state.firstName, this.state.lastName, this.state.email, this.state.password)
  }
  
  render() {
    const { classes } = this.props;
    
    return (
        <Container component="main" maxWidth="xs">
          <CssBaseline/>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            {this.state.error && <Alert xs variant="outlined" severity="error">{this.state.error}</Alert>}
            <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      value={this.state.firstName}
                      onChange={this.handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                      value={this.state.secondName}
                      onChange={this.handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={this.state.email}
                      onChange={this.handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={this.state.password}
                      onChange={this.handleInputChange}
                  />
                </Grid>
              </Grid>
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link to="/sign-in" variant="body2">
                    {"Already have an account? Sign in"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
    );
  }

  async registerUser(firstname, lastname, email, password) {
    try {
      const result = await AuthService.register(firstname, lastname, email, password);
      if(result.status === 200)
        this.props.history.push("/sign-in");
      else
      {
        await this.setState({
          error: result.data
        });
      }
    }
    catch
    {
      await this.setState({
        error: "Connection problems..."
      });
    }

  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(SignUp);