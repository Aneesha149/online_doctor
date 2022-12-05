import React from 'react';
import SignIn from './components/SignIn';
import DoctorSignUp from './components/Signup';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import SearchPage from './components/AppointmentPage';
import { AuthContext } from './context/Auth.context';
import { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/Signup';
import Dashboard from './components/Dashboard';
import { debug } from 'console';
import ProfileEditForm from './components/ProfileEditForm';
import Profile from './components/Profile';
import Support from './components/Support';
import AppointmentPage from './components/AppointmentPage'

function App() {
  // @ts-ignore
  const { state, logout } = React.useContext(AuthContext);
  return (
    <div className="App">
      <React.Fragment>
        <GlobalStyles
          styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }}
        />
        <CssBaseline />
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Toolbar sx={{ flexWrap: 'wrap' }}>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Online Doctor   {state.user && state.user.user.username && <> &nbsp;&nbsp;&nbsp;Welcome {state.user.user.username}</>}
            </Typography>
            {state.isLoggedIn == true ? (
              <nav>
            {state.user.user.is_doctor ? <>
                <Link
                  variant="button"
                  color="text.primary"
                  href="/profile"
                  sx={{ my: 1, mx: 1.5 }}
                >
                  Profile
                </Link>
                <Link
                  variant="button"
                  color="text.primary"
                  href="/profile-edit"
                  sx={{ my: 1, mx: 1.5 }}
                >
                  Edit Profile
                </Link>
                {/* <Link
                  variant="button"
                  color="text.primary"
                  href="/profile-edit"
                  sx={{ my: 1, mx: 1.5 }}
                >
                 Appoinments
                </Link> */}
                </> : <>
                <Link
                  variant="button"
                  color="text.primary"
                  href="/appointment"
                  sx={{ my: 1, mx: 1.5 }}
                >
                  Appointment
                </Link>
                {/* <Link
                  variant="button"
                  color="text.primary"
                  href="#"
                  sx={{ my: 1, mx: 1.5 }}
                >
                 History
                </Link> */}
                </>}
                <Link
                  variant="button"
                  color="text.primary"
                  href="/support"
                  sx={{ my: 1, mx: 1.5 }}
                >
                  Support
                </Link>
              </nav>
            ) : (
              <></>
            )}
            {state.isLoggedIn == true ? (
              <Button href="/signin" variant="outlined"  onClick={logout} sx={{ my: 1, mx: 1.5 }}>
                Logout
              </Button>
            ) : (
              <></>
            )}
          </Toolbar>
        </AppBar>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/profile-edit" element={<ProfileEditForm />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/support" element={<Support />} />
            <Route path="/appointment" element={<AppointmentPage />} />
           
          </Routes>
        </BrowserRouter>
      </React.Fragment>
    </div>
  );
}

export default App;
