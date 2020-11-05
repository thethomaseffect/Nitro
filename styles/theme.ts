import { createMuiTheme } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#fff',
    },
    info: {
      main: yellow[50],
    },
  },
});

export type Theme = typeof theme;
export default theme;
