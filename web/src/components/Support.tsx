import React from 'react';
import { AuthContext } from '../context/Auth.context';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import SignInImg from '../assets/imgs/SignIn.jpg';
import Link from '@mui/material/Link';

export default function Support() {
  // @ts-ignore
  const { state } = useContext(AuthContext);
  if (!state.isLoggedIn) {
    return <Navigate replace to="/signin" />;
  } else {
    return (
      <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${SignInImg})`,
      }}
    >
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src={`url(${SignInImg})`} alt={"image"} />}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              {"Call us on 111111111"}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {"email support@onlinedoctor.com"}
            </Typography>
            
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
  }
}
