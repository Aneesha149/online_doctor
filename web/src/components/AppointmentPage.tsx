import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useContext } from 'react';
import { AuthContext } from '../context/Auth.context';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import Drawer from '@mui/material/Drawer';
import ReviewForm from './ReviewForm';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function AppointmentPage() {
  //@ts-ignore
  const { state } = useContext(AuthContext);
  const [doctors, setDoctors] = React.useState(null);
  const [selectedRow, setselectedRow] = React.useState(null);
  const onAddressChange = (e: any) => {
    fetchData(e.target.value, null);
  };
  const onSpecialityChange = (e: any) => {
    fetchData(null, e.target.value);
  };

  const columns: GridColDef[] = [
    {
      field: 'user',
      headerName: 'User',
      width: 200,
      renderCell: (params) => {
        console.log(params);
        return (
          <>
            <Avatar>
              {' '}
              <PersonIcon />
            </Avatar>
          </>
        );
      },
    },

    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'first_name',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'last_name',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'speciality',
      headerName: 'Speciality',
      width: 110,
      editable: true,
    },
    {
      field: 'designation',
      headerName: 'Designation',
      width: 110,
      editable: true,
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 110,
      editable: true,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.first_name || ''} ${params.row.last_name || ''}`,
    },
    {
      field: 'view',
      headerName: '',
      width: 200,
      renderCell: (params) => {
        console.log(params);
        return (
          <>
            <Button
              onClick={() => {
                console.dir(params);
                setselectedRow(params.row);
                setDrawerState(true);
              }}
            >
              View Details
            </Button>
          </>
        );
      },
    },
  ];

  //@ts-ignore
  const fetchData = (address, speciality) => {
    let myHeaders = new Headers();
    myHeaders.append('Authorization', 'Token ' + state.user.user.token);
    myHeaders.append('Content-Type', 'application/json');

    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    let ok = true;
    let url = `http://127.0.0.1:8000/api/doctors`;
    if (address != null) {
      url = url + '?address=' + address;
    }
    if (speciality != null) {
      url = url + '?speciality=' + speciality;
    }
    //@ts-ignore
    fetch(url, requestOptions)
      .then((response) => {
        debugger;
        if (response.status != 200) {
          ok = false;
        }
        return response.json();
      })
      .then((data) => {
        if (ok) {
          //@ts-ignore
          setDoctors(data);
        } else {
          alert('Failed to get doctors');
        }
      })

      .catch((error) => alert('Failed to get doctors'));
  };
  useEffect(() => {
    fetchData(null, null);
  }, []);
  const [drawerstate, setDrawerState] = React.useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setDrawerState(open);
    };

  //@ts-ignore
  if (!state.isLoggedIn) {
    return <Navigate replace to="/signin" />;
  } else {
    if (doctors != null) {
      return (
        <Box sx={{ height: 400, width: '100%' }}>
          <React.Fragment key={'top'}>
            {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
            <Drawer
              anchor={'right'}
              open={drawerstate}
              onClose={toggleDrawer(false)}
            >
              <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Profile Details
          </Typography>
              <ReviewForm profile={selectedRow} setProfile={null}></ReviewForm>
              </Paper>
              </Container>
            </Drawer>
          </React.Fragment>
          <TextField
            margin="normal"
            sx={{ m: +4 }}
            id="address"
            label="Filter by address"
            name="address"
            autoComplete="address"
            autoFocus
            onChange={onAddressChange}
          />
          <TextField
            margin="normal"
            sx={{ m: +4 }}
            id="speciality"
            label="Filter by speciality"
            name="speciality"
            autoComplete="speciality"
            autoFocus
            onChange={onSpecialityChange}
          />
          <DataGrid
            rows={doctors}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
          />
        </Box>
      );
    } else {
      return <div>Loading data...</div>;
    }
  }
}
