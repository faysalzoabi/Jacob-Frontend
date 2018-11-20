import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme(
  {
    palette: {
      primary: green,
    },
    shadows: Array(25).fill('none'),
    overrides: {
      MuiButton: {
        raisedPrimary: {
          color: 'white',
        },
      },
    }
  },
);

export default theme;
