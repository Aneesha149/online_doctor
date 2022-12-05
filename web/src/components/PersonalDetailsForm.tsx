import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

//@ts-ignore
export default function PersonalDetailsForm({profile, setProfile}) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Personal Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={profile.first_name}
            onChange={(e) => {setProfile({...profile, first_name: e.target.value})}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={profile.last_name}
            onChange={(e) => {setProfile({...profile, last_name: e.target.value})}}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="age"
            name="age"
            label="Age"
            fullWidth
            autoComplete="age-line"
            variant="standard"
            type={'number'}
            value={profile.age}
            onChange={(e) => {setProfile({...profile, age: e.target.value})}}
          />
        </Grid>
        <Grid item xs={12}>
        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={profile.gender}
          fullWidth
          label="Gender"
          onChange={(e) => {setProfile({...profile, gender: e.target.value})}}
        >
          <MenuItem value={'Male'}>Male</MenuItem>
          <MenuItem value={'Female'}>Female</MenuItem>
          <MenuItem value={'Other'}>Other</MenuItem>
        </Select>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="mln"
            name="mln"
            label="Medical License number"
            fullWidth
            autoComplete="mln-line"
            variant="standard"
            value={profile.medical_license_number}
            onChange={(e) => {setProfile({...profile, medical_license_number: e.target.value})}}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="dsignation"
            name="designation"
            label="designation"
            fullWidth
            autoComplete="designation-line"
            variant="standard"
            value={profile.designation}
            onChange={(e) => {setProfile({...profile, designation: e.target.value})}}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="speciality"
            name="speciality"
            label="Speciality"
            fullWidth
            autoComplete="speciality-line"
            variant="standard"
            value={profile.speciality}
            onChange={(e) => {setProfile({...profile, speciality: e.target.value})}}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="yoe"
            name="yoe"
            label="Years of Experience"
            fullWidth
            autoComplete="you-line"
            variant="standard"
            type={'number'}
            value={profile.years_of_exp}
            onChange={(e) => {setProfile({...profile, years_of_exp: e.target.value})}}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            fullWidth
            autoComplete="address-line"
            variant="standard"
            value={profile.address}
            onChange={(e) => {setProfile({...profile, address: e.target.value})}}
          />
        </Grid>
        
       
      </Grid>
    </React.Fragment>
  );
}