import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SignInImg from '../assets/imgs/SignIn.jpg';
import Copyright from './Copyright';
import { Alert, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/Auth.context';
import { useContext } from 'react';

const theme = createTheme();

export default function SignIn() {
  //@ts-ignore
  const { state, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stateSnack, setState] = React.useState({
    open: false,
    message: '',
  });
  const fetchProfile = () => {
    let profilePromise = new Promise((resolve, reject) => {
      var myHeaders = new Headers();
      myHeaders.append(
        'Authorization',
        'Token '+ state.user.user.token
      );
      myHeaders.append('Content-Type', 'application/json');

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };
      let ok = true;
      //@ts-ignore
      fetch('http://127.0.0.1:8000/api/profiles/me', requestOptions)
        .then((response) => {
          if (response.status != 200) {
            ok = false;
            
          }
          return response.json();
        })
        .then((result) => {
          if(!ok){
            reject('Failed to fetch profile data.');
          }
          resolve(result.profile);
        })
        .catch((error) => {
          alert('failed to load profile data');
          reject(error);
        });
    });
    return profilePromise;
  };

  const onLogin = (email: FormDataEntryValue, password: FormDataEntryValue) => {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    let raw = JSON.stringify({
      user: {
        password: password,
        email: email,
      },
    });

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    let ok = true;
    //@ts-ignore
    fetch('http://127.0.0.1:8000/api/users/login', requestOptions)
      .then((response) => {
        if (response.status != 200) {
          ok = false;
        }
        return response.json();
      })
      .then((result) => {
        if (ok) {
          console.log(result);
          if(result.is_doctor){
            fetchProfile().then(profile => {
              result.user.profile = profile;
              login(result);
              navigate('/');
            }).catch(err => console.log(err))
          } else {
            login(result);
            navigate('/');
          }
        
        
          
        } else {
          setState({ open: true, message: JSON.stringify(result, null, 2) });
        }
      })
      .catch((error) => setState({ open: true, message: error.toString() }));
  };
  const handleClose = () => {
    setState({ open: false, message: '' });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let email = data.get('email');
    let password = data.get('password');
    if (password && email) {
      onLogin(email, password);
    }
  };
  //@ts-ignore
  const signup = (e) => {
    navigate('/signup');
  };
  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={stateSnack.open}
        onClose={handleClose}
        autoHideDuration={6000}
        key={'top' + 'left'}
      >
        <Alert severity="error">{stateSnack.message}</Alert>
      </Snackbar>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${SignInImg})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="#" onClick={signup} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
