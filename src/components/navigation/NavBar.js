import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useStateValue } from "react-conflux";
import { userContext } from "../../conflux/userReducer";
import Login from "../authentication/login";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
		textDecoration: "none",
		color: "#000",
	},
	profileImg: {
		width: "50px",
		height: "50px",
		borderRadius: "4px",
	},
}));

const NavBar = () => {
	const classes = useStyles();
	const [state] = useStateValue(userContext);

	return (
		<AppBar position="static" color="transparent">
			<Toolbar>
				{/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
					<MenuIcon />
				</IconButton> */}
				<Typography variant="h6" className={classes.title}>
					<Link to="/" className={classes.title}>
						Jeopardy
					</Link>
				</Typography>
				{/* <Button color="inherit">Login</Button> */}
				<Link to="/user" className={state.userProfile.uid ? "" : "hidden "}>
					<img
						className={classes.profileImg}
						src={state.userProfile.photo || "None"}
						alt={state.userProfile.name || "None"}
					/>
				</Link>
				<Login />
			</Toolbar>
		</AppBar>
		// <Styles>
		//     <div className="NavBar">
		//         <Link to="/" className="Logo">
		//             Jeopardy
		//         </Link>

		//         <div className="MenuRight">
		//             <Link to="/user" className={
		//                 state.userProfile.uid
		//                     ? ''
		//                     : 'hidden '
		//             }>
		//                 <img
		//                     className='ProfileImg'
		//                     src={state.userProfile.photo || 'None'}
		//                     alt={state.userProfile.name || 'None'}
		//                 />
		//             </Link>
		//             <Login />
		//         </div>
		//     </div>
		// </Styles>
	);
};

const Styles = styled.div`
	.Logo {
		font-size: 2rem;
		text-decoration: none;
		color: #f09d51;
	}
	.NavBar {
		width: 100%;
		height: 75px;
		display: flex;
		padding: 0 10px;
		justify-content: space-between;
		align-items: center;
		background-color: #313638;
	}
	.MenuRight {
		display: flex;
		align-items: center;
	}
	.ProfileImg {
		width: 50px;
		height: 50px;
		border-radius: 4px;
	}
`;

export default NavBar;
