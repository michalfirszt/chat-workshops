import blue from '@mui/material/colors/blue';
import grey from '@mui/material/colors/grey';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: grey[200],
    },
  },
});

export default theme;
