import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import Globals from '../../utils/globals';
import { Map, GoogleApiWrapper,  Marker } from 'google-maps-react';
import MUIDataTable from 'mui-datatables';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import './LocationPage.css';

class LocationView extends Component {

  constructor(props) {
    super(props);
    const plat = this.props.location.latitude;
    const plng = this.props.location.longitude;
    this.state = {
        markers: [ plat, plng ],
        location: this.props.location,
        fishes: this.props.fishes,
        open: false,
        fishModal: false,
        fishName: '',
        fishDescription: '',
        fishPicture: '',
        fishSize: ''
    }
    this.handleClose = this.handleClose.bind(this);
    this.ImageView = this.ImageView.bind(this);
    this.detailFish = this.detailFish.bind(this);
  }

  handleClose() {
      this.setState({open: false, fishModal: false})
  }

  ImageView() {
      this.setState({open: true});
  }

  detailFish(index) {
    const fish = this.props.fishes[index];
    console.log(fish);
    this.setState({fishName: fish.fishName, fishSize: fish.fishSize, fishDescription: fish.fishDescription, fishPicture:fish.fishPicture, fishModal: true})
  }
  
  
  render() {
    const options = {
      selectableRows: false,
      responsive: 'scroll',
      filterType: 'dropdown',
      rowsPerPage: 5,
      rowsPerPageOptions: [2, 5, 10],
      print: false,
      download: false,
      filter: false,
      viewColumns: false,
      onRowClick: (rowData, rowMeta) => {
        this.detailFish(rowMeta.dataIndex);
      }
    };
    
    const columns = [
      {
        name: 'Photo',
        options: {
          filter: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <img className="locationImage" src={Globals.instance().publicUrl + value} style={{width:50, height: 40}} alt="location" />
            );
          }
        }
      },
      { name: 'Fish Name' },
      { name: 'Fish Size' },
      {
        name: 'Description',
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              value.substring(0,50)+"..."
            )
          }
        }
      },
      {
        name: 'ID',
        options: {
          display: false
        }
      }
    ];
    return (
      <div className="DashboardPage">
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <Paper className="userInfo">
                <Grid container spacing={8}>
                    <Grid item xs={12}>
                        <img className="location" onClick={this.ImageView} src={Globals.instance().publicUrl + this.state.location.locationPicture} alt="location"/>
                    </Grid>
                </Grid>
                <Grid item  xs={12}>
                    <h2> { this.state.location.locationName } </h2>
                    <p className="detail_location"> {this.state.location.locationDescription} </p>
                </Grid>
                <div className="l_googleMap">
                    <Map
                    google={this.props.google}
                    zoom={10}
                    style={{margin: '5%'}}
                    initialCenter={{
                        lat: this.props.location.latitude,
                        lng: this.props.location.longitude
                    }}
                    >
                        {this.state.markers.map((marker, index) => (
                            <Marker
                            key={index}
                            position={marker.position}
                            />
                        ))}
                    </Map>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={6}>
                <MUIDataTable
                  title="Fish List"
                  data={this.props.fishes.map(item => [
                        item.fishPicture,
                        item.fishName,
                        item.fishSize,
                        item.fishDescription,
                        item._id
                    ])}
                  options={options}
                  columns={columns}
                />
            </Grid>
          </Grid>
          <Dialog
            onClose={this.handleClose}
            aria-labelledby="customized-dialog-title"
            open={this.state.open}
          >
            <img src={Globals.instance().publicUrl + this.props.location.locationPicture} style={{width:'100%', height:'100%'}} alt="location"/>
          </Dialog>

          <Dialog
            onClose={this.handleClose}
            aria-labelledby="customized-dialog-title"
            open={this.state.fishModal}
          >
            <Grid item xs={12}>
              <Card style={{width: 500, height: 600}}>
                <CardMedia style={{hight:0, paddingTop:'56%'}}
                    className="fishImage"
                    image= {Globals.instance().publicUrl + this.state.fishPicture}
                    title='Location'
                />
                <CardContent className="fishContent">
                    <h2> {this.state.fishName} </h2>
                    <Typography className="fishDescription" component="h5">
                        {this.state.fishDescription}
                    </Typography>
                    <Typography className="fishSize" component="p">
                        Size: {this.state.fishSize}
                    </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Dialog>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBQVfqqSFo-SzqrFH2dGubbDrPUkSxAbgs'
})(LocationView);
