import { createMuiTheme } from '@material-ui/core/styles'

const montserrat = {
  fontFamily: 'Montserrat',
  fontStyle: 'normal',
  fontWeight: 400,
  src: `
    local('Montserrat'),
  `,
}

const theme = {
  background: '#181818',
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [montserrat],
      },
    },
  },
  palette: {
    type: 'dark',
  },
}

export default createMuiTheme(theme)
