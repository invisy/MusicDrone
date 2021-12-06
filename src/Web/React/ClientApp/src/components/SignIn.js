import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import AuthService from '../services/auth.service'
import {Alert} from "@material-ui/lab";

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignIn extends Component {
  static displayName = SignIn.name;
  
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", remember: true, error: ""};
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
    await this.loginUser(this.state.email, this.state.password, this.state.remember);
  }
  
  render () {
    const { classes } = this.props;
    
    return (
        <Container component="main" maxWidth="xs">
          <CssBaseline/>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {this.state.error && <Alert xs variant="outlined" severity="error">{this.state.error}</Alert>}
            <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={this.state.login}
                  onChange={this.handleInputChange}
              />
              <TextField
                  variant="outlined"
                  margin="normal"
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
              <FormControlLabel
                  control={<Checkbox name="remember" type="checkbox" checked={this.state.remember} onChange={this.handleInputChange} value="remember" color="primary"/>}
                  label="Remember me"
              />
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/sign-up" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
    );
  }

  async loginUser(email, password, remember) {
    try {
      const result = await AuthService.login(email, password, remember);
      if(result.status === 200)
        window.location.href = "/";
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

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(SignIn);