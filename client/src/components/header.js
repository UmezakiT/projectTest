import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
// import Avatar from '@material-ui/core/Avatar';

import "./style.css";


export default class Header extends Component {

	state = {
		firstName: '',
		lastName: '',
		auth: false,
		anchorEl: null,
	}

	componentDidMount() {
		if (localStorage.getItem('token') && localStorage.getItem('token').length >10) {			
			this.setState({auth: true});
		} else {
			this.setState({auth:false});
		}
	}

	handleChange = event => {
		this.setState({ auth: event.target.checked });
	};

	handleMenu = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	profileSetting = () => {
		this.setState({ anchorEl: null });
		window.location.href = '/setting';
	}

	logout = () =>{
		this.setState({ anchorEl: null });
		localStorage.setItem("token", "");
		localStorage.setItem("userID", "");
		localStorage.setItem("latitude", "");
		localStorage.setItem("longitude", "");
		window.location.href = "/";
	}

	login = ()=> {
		window.location.href = "/login";
	}

	signup = ()=> {
		window.location.href = "/signup";
	}

	render () {

		const { auth, anchorEl } = this.state;
    	const open = Boolean(anchorEl);
		
		return (

			<div style={{flexGrow: 1}}> 
			<AppBar position="static" className='header' >
				<Toolbar>
					<Typography variant="h5" color="inherit" style={{flexGrow: 1}}>
						<a href="/dashboard" ><img src={require('../assets/images/logo.png')} style={{width: 55, height: 55}} alt="logo"/></a>
					</Typography>

					<Typography variant="h6" color="inherit" style={{flexGrow: 20}}>
						{auth && (
							<div>
								<a className="nav_item" href="/dashboard" style={{marginRight: 10, color: 'white', textDecoration: 'none'}}> Home </a>
								<a className="nav_item" href="/upload" style={{marginRight: 10, color: 'white', textDecoration: 'none'}}> Upload </a>
								<a className="nav_item" href="/recent" style={{color: 'white', textDecoration: 'none'}}> Recent </a>
							</div>
						)}
					</Typography>
					


					{auth && (
						<div>
							<IconButton
								aria-owns={open ? 'menu-appbar' : undefined}
								aria-haspopup="true"
								onClick={this.handleMenu}
								color="inherit"
							>
								{/* <Avatar alt="Remy Sharp" src={require('../assets/images/no_avartar.jpg')} /> */}
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={open}
								onClose={this.handleClose}
							>
								<MenuItem onClick={this.profileSetting}><i className="material-icons" style={{marginRight:10}}>account_circle</i>Setting </MenuItem>
								<MenuItem onClick={this.logout}><i className="material-icons" style={{marginRight:10}}>exit_to_app</i>Logout</MenuItem>
							</Menu>
						</div>
					)}


					{!auth && (
						<div>
							<Button variant="contained" color="primary"  onClick={this.login}>Login</Button>
							<Button variant="contained" color="primary"  onClick={this.signup}>Signup</Button>
						</div>
					)}
				</Toolbar>
				</AppBar>
			</div>
		);
	}
}
