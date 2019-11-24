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
  shape: {
    borderRadius: 0,
  },
  palette: {
    type: 'dark',
    contrastThreshold: 4,
    primary: {
      main: '#28AD83',
    },
    secondary: {
      main: '#C7C190',
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
    hover: {
      dark: '#668266',
      main: '#BDDCBD',
      light: '#E4FEE0',
    }
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
  palette: {
    ...baseTheme.palette,
    background: {
      default: '#111',
    },
    common: {
      black: '#111',
      white: '#f5f5f5',
    },
  },
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
        paddingTop: '7px',
        paddingBottom: '7px',
        backgroundColor: '#f5f5f5',
        '&:hover': {
          boxShadow: 'none',
        },
      },
      outlined: {
        borderWidth: '2px!important',
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
    MuiOutlinedInput: {
      notchedOutline: {
        borderWidth: '2px',
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
      paper: {
        margin: '0',
      },
      listbox: {
        padding: '0',
        margin: '0 0 0 2px',
      },
      option: {
        backgroundColor: baseTheme.palette.grey.A400,
        '&:hover, &[data-focus="true"]': {
          backgroundColor: baseTheme.palette.hover.dark,
        },
      },
    },
  },
}

if (typeof window !== 'undefined') {
  console.log(responsiveFontSizes(theme))
}

export default responsiveFontSizes(theme)
