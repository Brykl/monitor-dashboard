import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function DenseAppBar() {
  return (
    <Box  sx={{ flexGrow: 1}}>
      <AppBar position="static" sx={{bgcolor: '#66754c'}}>
        <Toolbar variant="dense" sx={{ justifyContent: 'center' }}>
          <Typography variant="h5" color="#cccccc" component="div" >
            Desktop Monitoring
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}