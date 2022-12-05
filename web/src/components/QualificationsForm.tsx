import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Divider from '@mui/material/Divider';

//@ts-ignore
export default function QualificationsForm({profile, setProfile}) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Education Qualifications
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="degree1"
            name="degree1"
            label="Graduation"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={profile.education_qualifications[0].degree}
            onChange={(e) => {
                let temp = JSON.parse(JSON.stringify(profile));
                //@ts-ignore
                temp.education_qualifications[0].degree = e.target.value;
                setProfile({...temp})
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="percent1"
            name="percent1"
            label="Percentage"
            fullWidth
            autoComplete="name"
            variant="standard"
            value={profile.education_qualifications[0].percentage}
            onChange={(e) => {
                let temp = JSON.parse(JSON.stringify(profile));
                //@ts-ignore
                temp.education_qualifications[0].percentage = e.target.value;
                setProfile({...temp})
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="college1"
            name="college1"
            label="College"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={profile.education_qualifications[0].college.name}
            onChange={(e) => {
                let temp = JSON.parse(JSON.stringify(profile));
                //@ts-ignore
                temp.education_qualifications[0].college.name = e.target.value;
                setProfile({...temp})
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="add1"
            name="add1"
            label="College Address"
            fullWidth
            autoComplete="address"
            variant="standard"
            value={profile.education_qualifications[0].college.address}
            onChange={(e) => {
                let temp = JSON.parse(JSON.stringify(profile));
                //@ts-ignore
                temp.education_qualifications[0].college.address = e.target.value;
                setProfile({...temp})
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="degree2"
            name="degree2"
            label="Post Graduation"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={profile.education_qualifications[1].degree}
            onChange={(e) => {
                let temp = JSON.parse(JSON.stringify(profile));
                //@ts-ignore
                temp.education_qualifications[1].degree = e.target.value;
                setProfile({...temp})
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="percent2"
            name="percent2"
            label="Percentage"
            fullWidth
            autoComplete="name"
            variant="standard"
            value={profile.education_qualifications[1].percentage}
            onChange={(e) => {
                let temp = JSON.parse(JSON.stringify(profile));
                //@ts-ignore
                temp.education_qualifications[1].percentage = e.target.value;
                setProfile({...temp})
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="college2"
            name="college2"
            label="College"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={profile.education_qualifications[1].college.name}
            onChange={(e) => {
                let temp = JSON.parse(JSON.stringify(profile));
                //@ts-ignore
                temp.education_qualifications[1].college.name = e.target.value;
                setProfile({...temp})
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="add2"
            name="add2"
            label="College Address"
            fullWidth
            autoComplete="name"
            variant="standard"
            value={profile.education_qualifications[1].college.address}
            onChange={(e) => {
                let temp = JSON.parse(JSON.stringify(profile));
                //@ts-ignore
                temp.education_qualifications[1].college.address = e.target.value;
                setProfile({...temp})
            }}
          />
        </Grid>
      </Grid>
      <br></br>
      <Typography variant="h6" gutterBottom>
        Places of work
      </Typography>
      <Grid container spacing={3}>
      <Grid item xs={12}>
          <TextField
            required
            id="name1"
            name="name1"
            label="Address1"
            fullWidth
            autoComplete="address-line"
            variant="standard"
            value={profile.places_of_works[0].name}
            onChange={(e) => {
                let temp = JSON.parse(JSON.stringify(profile));
                //@ts-ignore
                temp.places_of_works[0].name = e.target.value;
                setProfile({...temp})
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city1"
            name="city1"
            label="City1"
            fullWidth
            autoComplete="address-level2"
            variant="standard"
            value={profile.places_of_works[0].city}
            onChange={(e) => {
                let temp = JSON.parse(JSON.stringify(profile));
                //@ts-ignore
                temp.places_of_works[0].city = e.target.value;
                setProfile({...temp})
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state1"
            name="state1"
            label="State1"
            fullWidth
            variant="standard"
            value={profile.places_of_works[0].state}
            onChange={(e) => {
                let temp = JSON.parse(JSON.stringify(profile));
                //@ts-ignore
                temp.places_of_works[0].state = e.target.value;
                setProfile({...temp})
            }}
          />
        </Grid>
        
        
        <Grid item xs={12}>
          <TextField
            required
            id="name2"
            name="name2"
            label="Address2"
            fullWidth
            autoComplete="address-line"
            variant="standard"
            value={profile.places_of_works[1].name}
            onChange={(e) => {
                let temp = JSON.parse(JSON.stringify(profile));
                //@ts-ignore
                temp.places_of_works[1].name = e.target.value;
                setProfile({...temp})
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city2"
            name="city2"
            label="City2"
            fullWidth
            autoComplete="address-level2"
            variant="standard"
            value={profile.places_of_works[1].city}
            onChange={(e) => {
                let temp = JSON.parse(JSON.stringify(profile));
                //@ts-ignore
                temp.places_of_works[1].city = e.target.value;
                setProfile({...temp})
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state2"
            name="state2"
            label="State2"
            fullWidth
            variant="standard"
            value={profile.places_of_works[1].state}
            onChange={(e) => {
                let temp = JSON.parse(JSON.stringify(profile));
                //@ts-ignore
                temp.places_of_works[1].state = e.target.value;
                setProfile({...temp})
            }}
          />
        </Grid>
        
      </Grid>
    </React.Fragment>
  );
}
