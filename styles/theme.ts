import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#fff',
    },
  },
});

export type Theme = typeof theme;
export default theme;
