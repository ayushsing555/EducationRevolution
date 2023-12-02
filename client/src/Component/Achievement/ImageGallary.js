// ImageGallery.js
import React from 'react';
import { Grid, Paper } from '@material-ui/core';

const ImageGallery = ({ ImagePath }) => {
  return (
    <Grid container spacing={2}>
      {ImagePath.map((path, index) => (
        <Grid item key={index}>
          <Paper elevation={4}>
            <img src={path} alt={`Badge ${index + 1}`} style={{ width: '50px', marginBottom: '5px' }} />
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default ImageGallery;
