import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import AuthService from "../services/auth.service";
import ProfileService from '../services/profile.service'

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      fullName: "",
      collapsed: true,
      user: AuthService.getCurrentUser()
    };
    this.logOut = this.logOut.bind(this);
  }

  async componentDidMount() {
    if(this.state.user) 
      await this.updateFullName();
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  logOut() {
    AuthService.logout();
    this.setState({
      user: AuthService.getCurrentUser()
    });
  }
  
  async updateFullName()
  {
    let fullNameRequest = await ProfileService.getProfileInfo();
    if(fullNameRequest.status === 200)
    {
      this.setState({
        fullName: `${fullNameRequest.data["firstName"]} ${fullNameRequest.data["lastName"]}`
      });
    }
    
    return "";
  }

  render () {
    const { user } = this.state;
    
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/">MusicDrone</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                </NavItem>
                {!user &&
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/sign-in">Sign In</NavLink>
                </NavItem> }
                {!user &&
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/sign-up">Sign Up</NavLink>
                </NavItem> }
                {user &&
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/" onClick={this.logOut}>{`Logout (${this.state.fullName})`}</NavLink>
                </NavItem> }
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
