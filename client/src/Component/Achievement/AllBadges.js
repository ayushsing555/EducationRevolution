import React from 'react';
import { Dialog, DialogActions, Button, Grid, Typography } from '@mui/material';

const AllBadges = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <Typography variant="h5" align="center" style={{ marginBottom: '20px' }}>
        All Badges
      </Typography>
      <Grid container spacing={2} style={{ padding: '20px' }}>
        {/* First Row */}
        <Grid item xs={4}>
          <div style={styles.container}>
            <img src="./Image/Badges/Badge1.png" alt="" style={styles.image} />
            <Typography variant="h6" align="center" style={{ fontWeight: 'bold', marginTop: '10px' }}>
              10 <img src="./Image/Badges/coin.png" alt="" style={styles.coinIcon} />
            </Typography>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div style={styles.container}>
            <img src="./Image/Badges/Badge2.png" alt="2" style={styles.image} />
            <Typography variant="h6" align="center" style={{ fontWeight: 'bold', marginTop: '10px' }}>
              18 <img src="./Image/Badges/coin.png" alt="" style={styles.coinIcon} />
            </Typography>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div style={styles.container}>
            <img src="./Image/Badges/Badge3.png" alt="2" style={styles.image} />
            <Typography variant="h6" align="center" style={{ fontWeight: 'bold', marginTop: '10px' }}>
              30 <img src="./Image/Badges/coin.png" alt="" style={styles.coinIcon} />
            </Typography>
          </div>
        </Grid>

        {/* Second Row */}
         <Grid item xs={4}>
          <div style={styles.container}>
            <img src="./Image/Badges/Badge4.png" alt="3" style={styles.image} />
            <Typography variant="h6" align="center" style={{ fontWeight: 'bold', marginTop: '10px' }}>
              45 <img src="./Image/Badges/coin.png" alt="" style={styles.coinIcon} />
            </Typography>
          </div>
        </Grid>
         <Grid item xs={4}>
          <div style={styles.container}>
            <img src="./Image/Badges/Badge5.png" alt="3" style={styles.image} />
            <Typography variant="h6" align="center" style={{ fontWeight: 'bold', marginTop: '10px' }}>
              65 <img src="./Image/Badges/coin.png" alt="" style={styles.coinIcon} />
            </Typography>
          </div>
        </Grid>
         <Grid item xs={4}>
          <div style={styles.container}>
            <img src="./Image/Badges/Badge6.png" alt="3" style={styles.image} />
            <Typography variant="h6" align="center" style={{ fontWeight: 'bold', marginTop: '10px' }}>
              85 <img src="./Image/Badges/coin.png" alt="" style={styles.coinIcon} />
            </Typography>
          </div>
        </Grid>
         <Grid item xs={4}>
          <div style={styles.container}>
            <img src="./Image/Badges/Badge7.png" alt="3" style={styles.image} />
            <Typography variant="h6" align="center" style={{ fontWeight: 'bold', marginTop: '10px' }}>
              110 <img src="./Image/Badges/coin.png" alt="" style={styles.coinIcon} />
            </Typography>
          </div>
        </Grid>

        {/* Third Row */}
        <Grid item xs={4}>
          <div style={styles.container}>
            <img src="./Image/Badges/Badge8.png" alt="3" style={styles.image} />
            <Typography variant="h6" align="center" style={{ fontWeight: 'bold', marginTop: '10px' }}>
              140 <img src="./Image/Badges/coin.png" alt="" style={styles.coinIcon} />
            </Typography>
          </div>
        </Grid>
         <Grid item xs={4}>
          <div style={styles.container}>
            <img src="./Image/Badges/Badge9.png" alt="3" style={styles.image} />
            <Typography variant="h6" align="center" style={{ fontWeight: 'bold', marginTop: '10px' }}>
              175 <img src="./Image/Badges/coin.png" alt="" style={styles.coinIcon} />
            </Typography>
          </div>
        </Grid>

      </Grid>

      <DialogActions style={{ padding: '20px', justifyContent: 'center' }}>
        <Button onClick={handleClose} variant="outlined" color="secondary" style={{ marginLeft: '10px' }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const styles = {
  container: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '12px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    background: '#f0f0f0', // Fancy background color
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    borderRadius: '12px', // Ensure the same border-radius as the container
  },
  coinIcon: {
    width: '30px', // Adjust the size as needed
    height: '30px', // Adjust the size as needed
    marginLeft: '5px', // Add some spacing to the right of the text
  },
};

export default AllBadges;
