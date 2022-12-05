import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/Auth.context';
import ReviewForm from './ReviewForm';
import { useContext } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
export default function Profile() {
  const [isLoading, setLoading] = React.useState(true);
  let profile = null;

  //@ts-ignore
  const { state } = useContext(AuthContext);
  
  if (!state.isLoggedIn || !state.user.user.profile) {
    return <Navigate replace to="/signin" />;
  } else {
    return (
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Profile Details
          </Typography>
          <ReviewForm
            profile={state.user.user.profile}
            setProfile={null}
          ></ReviewForm>
        </Paper>
      </Container>
    );
  }
}
