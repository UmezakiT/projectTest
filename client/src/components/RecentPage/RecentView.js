import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Globals from '../../utils/globals';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import './RecentPage.css';


class RecentView extends Component {

  constructor(props) {
    super(props);
    this.DetailView = this.DetailView.bind(this);
    this.newLocation = this.newLocation.bind(this);
  }

  DetailView(id) {
    window.location.href = '/location/'+id;
  }

  newLocation() {
    window.location.href = '/upload';
  }

  render() {
    return (
      <div className="recentPage">
        <Grid container spacing={24}>
            {this.props.locations.map((location, i) => (
                <Grid item xs={6} sm={4} lg={3} xl={2} key={i}>
                  <Card>
                  <CardMedia style={{hight:0, paddingTop:'56%'}}
                      image= {Globals.instance().publicUrl + location.locationPicture}
                      title='Location'
                  />
                  <CardContent>
                      <h2> {location.locationName} </h2>
                      <Typography component="p">
                          {location.locationDescription.substring(0,100)+"..."}
                      </Typography>
                  </CardContent>
                  <CardActions>
                      <Button size="small" color="primary" variant='contained' onClick={() => this.DetailView(location.id)}> View </Button>
                  </CardActions>
                  </Card>
                </Grid>
            ))}

            <Fab size="large" color="secondary" aria-label="Add" id="addButton" onClick={this.newLocation} >
              <AddIcon />
            </Fab>
          
        </Grid>
      </div>
    )
  }
}

export default RecentView;
