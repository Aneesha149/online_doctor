import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PersonalDetailsForm from './PersonalDetailsForm';
import QualificationsForm from './QualificationsForm';
import ReviewForm from './ReviewForm';

import { AuthContext } from '../context/Auth.context';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { Alert, Snackbar } from '@mui/material';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Online Doctor
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Personal Details', 'Qualifications', 'Review your profile'];

//@ts-ignore
function getStepContent(step: number, profile, setProfile) {
  switch (step) {
    case 0:
      return <PersonalDetailsForm profile={profile} setProfile={setProfile} />;
    case 1:
      return <QualificationsForm profile={profile} setProfile={setProfile} />;
    case 2:
      return <ReviewForm profile={profile} setProfile={setProfile} />;
    default:
      throw new Error('Unknown step');
  }
}

let profileInitialData = {
  first_name: 'ttest',
  address: '',
  last_name: '',
  education_qualifications: [
    {
      degree: '',
      percentage: '',
      college: {
        name: '',
        address: '',
      },
    },
    {
      degree: '',
      percentage: '',
      college: {
        name: '',
        address: '',
      },
    },
  ],
  places_of_works: [
    {
      name: '',
      city: '',
      state: '',
    },
    {
      name: '',
      city: '',
      state: '',
    },
  ],
  age: '',
  gender: '',
  medical_license_number: '',
  designation: '',
  speciality: '',
  years_of_exp: '',
};

const theme = createTheme();

export default function ProfileEditForm() {
   //@ts-ignore
  const { state, login } = useContext(AuthContext);
  const [stateSnack, setState] = React.useState({
    open: false,
    message: '',
  });
  const handleClose = () => {
    setState({ open: false, message: '' });
  };
  //@ts-ignore
  if(state.user.user.profile){
    profileInitialData = state.user.user.profile;
  }
  const [profile, setProfile] = React.useState(profileInitialData);
  //@ts-ignore
  window.__profile__ = profile;
  //@ts-ignore
  window.__setProfile__ = setProfile;
  const [activeStep, setActiveStep] = React.useState(0);

  const updateProfile = (profile: any, cb: any) => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Token '+ state.user.user.token
    );
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      profile: profile,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    let ok = true;
    //@ts-ignore
    fetch('http://127.0.0.1:8000/api/profiles', requestOptions)
      .then((response) => {
        if (response.status != 201) {
          ok = false;
        }
        return response.json();
      })
      .then((result) => {
        
        if (!ok) {
          setState({ open: true, message: JSON.stringify(result) ?  JSON.stringify(result,null, 2) : "Failed to update profile"});
        } else {
          let tState = JSON.parse(JSON.stringify(state.user));
          tState.user.profile = result.profile;
          debugger
          login(tState)
          
          console.log(result);
          cb();
        }
        
      })
      .catch((error) => setState({ open: true, message: error.toString() }));
  };
  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      updateProfile(profile, () => {
        setActiveStep(activeStep + 1);
      });
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

 
  
  if (!state.isLoggedIn) {
    return <Navigate replace to="/signin" />;
  } else {
    
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={stateSnack.open}
          onClose={handleClose}
          autoHideDuration={6000}
          key={'top' + 'left'}
        >
          <Alert severity="error">{stateSnack.message}</Alert>
        </Snackbar>
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography component="h1" variant="h4" align="center">
              Profile Details
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thanks for registering.
                </Typography>
                <Typography variant="subtitle1">
                  Your profile is updated.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep, profile, setProfile)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1
                      ? 'Update Profile'
                      : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Paper>
          <Copyright />
        </Container>
      </ThemeProvider>
    );
  }
}
