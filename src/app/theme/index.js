import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'
import { amber, green, grey, red } from '@material-ui/core/colors'

const augmentColorMap = (color) => ({
  light: color[200],
  main: color[500],
  dark: color[700],
  contrastText: '#fff',
})

const montserrat = {
  fontFamily: 'Montserrat',
  fontStyle: 'normal',
  fontWeight: 400,
  src: `
    local('Montserrat'),
  `,
}

const base = {
  background: '#181818',
  shape: {
    borderRadius: 0,
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#28AD83',
    },
    secondary: {
      main: '#C79F63',
    },
    error: {
      main: '#E85D5A',
    },
    success: {
      main: '#28AD83',
    },
    warning: {
      main: '#FFAB63',
    },
    info: {
      main: '#C79F63',
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    fontStyle: 'normal',
    fontWeight: '400',
  },
}

const baseTheme = createMuiTheme(base)

const theme = {
  ...baseTheme,
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [montserrat],
      },
    },
    MuiToolbar: {
      root: {
        justifyContent: 'space-between',
      },
    },
    MuiButton: {
      root: {
        textTransform: 'none',
      },
      contained: {
        boxShadow: 'none',
      },
      containedSizeLarge: {
        height: 'calc(3.5em + 2px)',
        fontSize: '1rem',
      },
      outlinedSizeLarge: {
        height: '3.5em',
        fontSize: '1rem',
      },
    },
    MuiStepper: {
      root: {
        backgroundColor: 'rgba(0,0,0,0)',
      },
    },
    MuiSnackbarContent: {
      root: {
        color: '#fff',
      },
    },
    MuiAutocomplete: {
      inputRoot: {
        flexWrap: 'nowrap',
      },
    },
  },
}

export default responsiveFontSizes(theme)
