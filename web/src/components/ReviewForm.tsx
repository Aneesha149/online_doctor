import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

const products = [
  {
    name: 'Product 1',
    desc: 'A nice thing',
    price: '$9.99',
  },
  {
    name: 'Product 2',
    desc: 'Another thing',
    price: '$3.45',
  },
  {
    name: 'Product 3',
    desc: 'Something else',
    price: '$6.51',
  },
  {
    name: 'Product 4',
    desc: 'Best thing of all',
    price: '$14.11',
  },
  { name: 'Shipping', desc: '', price: 'Free' },
];
const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

//@ts-ignore
export default function ReviewForm({ profile, setProfile }) {
  if(!profile){
    return <div>Nothing to render</div>
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Profile summary
      </Typography>
      <Typography gutterBottom>First Name: {profile.first_name}</Typography>
      <Typography>Last Name: {profile.last_name}</Typography>
      <Typography>Age: {profile.age}</Typography>
      <Typography>Gender: {profile.gender}</Typography>

      <Typography>
        Medical license number: {profile.medical_license_number}
      </Typography>
      <Typography>Designation: {profile.designation}</Typography>
      <Typography>Speciality: {profile.speciality}</Typography>
      <Typography>Years of exp: {profile.years_of_exp}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Address
          </Typography>
          <Typography gutterBottom>{profile.address}</Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Gradudation Details
          </Typography>
          <Typography gutterBottom>
            Degree: {profile.education_qualifications[0].degree}
          </Typography>
          <Typography gutterBottom>
            Percentage: {profile.education_qualifications[0].percentage}
          </Typography>
          <Typography gutterBottom>
            College Name: {profile.education_qualifications[0].college.name}
          </Typography>
          <Typography gutterBottom>
            College Address:
            {profile.education_qualifications[0].college.address}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Post Gradudation Details
          </Typography>
          <Typography gutterBottom>
            Degree: {profile.education_qualifications[1].degree}
          </Typography>
          <Typography gutterBottom>
            Percentage: {profile.education_qualifications[1].percentage}
          </Typography>
          <Typography gutterBottom>
            College Name: {profile.education_qualifications[1].college.name}
          </Typography>
          <Typography gutterBottom>
            College Address:
            {profile.education_qualifications[1].college.address}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Work Details 1
          </Typography>
          <Typography gutterBottom>
            Place name: {profile.places_of_works[0].name}
          </Typography>
          <Typography gutterBottom>
            City: {profile.places_of_works[0].city}
          </Typography>
          <Typography gutterBottom>
            State: {profile.places_of_works[0].state}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Work Details 2
        </Typography>
        <Typography gutterBottom>
          Place name: {profile.places_of_works[1].name}
        </Typography>
        <Typography gutterBottom>
          City: {profile.places_of_works[1].city}
        </Typography>
        <Typography gutterBottom>
          State: {profile.places_of_works[1].state}
        </Typography>
      </Grid>
    </React.Fragment>
  );
}
