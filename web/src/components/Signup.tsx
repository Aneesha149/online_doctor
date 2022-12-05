import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from './Copyright';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/Auth.context';
import { Alert, Snackbar } from '@mui/material';

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  // @ts-ignore
  const { state, login } = React.useContext(AuthContext);

  const [stateSnack, setState] = React.useState({
    open: false,
    message: '',
  });

  //@ts-ignore
  const register = (username, email, password, is_doctor) => {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    let raw = JSON.stringify({
      user: {
        username: username,
        password: password,
        email: email,
        is_doctor: is_doctor ? true : false,
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
    fetch('http://127.0.0.1:8000/api/users', requestOptions)
      .then((response) => {
        if (response.status != 201) {
          ok = false;
        }
        return response.json();
      })
      .then((result) => {
        if (ok) {
          login(result);
          navigate('/');
        } else {
          setState({ open: true, message: JSON.stringify(result) });
        }
      })
      .catch((error) => setState({ open: true, message: error.toString() }));
  };

  //@ts-ignore
  const signin = (e) => {
    e.preventDefault();
    navigate('/signin');
  };
  const handleClose = () => {
    setState({ open: false, message: '' });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    //@ts-ignore
    register(data.get('username'), data.get('email'), data.get('password'), data.get('isDoctor'));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={stateSnack.open}
            onClose={handleClose}
            autoHideDuration={6000}
            key={'top' + 'left'}
          >
            <Alert severity="error">{stateSnack.message}</Alert>
          </Snackbar>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox name="isDoctor" value={true} color="primary" />}
                  label="Signup as a doctor."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" onClick={signin} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
