// import { createTheme } from '@mui/material/styles';
// import palette from './Palette';
// import typography from './Fonts';

// // Extend default MuiTheme
// const Default = createTheme({
//   palette,
//   typography,
//   components: {
//     MuiFormHelperText: {
//       contained: {
//         marginLeft: 0,
//         marginRight: 0,
//       },
//     },
//     MuiButton: {
//       root: {
//         boxShadow: 'none',
//         '&:hover': {
//           boxShadow: 'none',
//         },
//         '&:focus': {
//           boxShadow: 'none',
//         },
//       },
//       contained: {
//         boxShadow: 'none',
//         '&:hover': {
//           boxShadow: 'none',
//         },
//         '&:focus': {
//           boxShadow: 'none',
//         },
//       },
//     },
//     MuiTableSortLabel: {
//       icon: {
//         opacity: 1,
//         color: 'rgba(0, 0, 0, 0.54)',
//       },
//     },
//   },
// });

// export default Default;

import { amber, deepOrange, grey, blue, green } from "@mui/material/colors";
import { palette, palette2 } from "./Palette";

// const palette = {
//   light: {
//     primary: {
//       main: '#34C0AC',
//       light: '#B1DED3',
//       dark: '#00765A',
//     },
//   },
// };

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: green,
          divider: green[200],
          text: {
            primary: '#000',
            secondary: green[400],
          },
        }
      : {
          // palette values for dark mode
          primary: blue,
          divider: blue[700],
          background: {
            default: blue[900],
            paper: blue[900],
          },
          text: {
            primary: "#fff",
            secondary: grey[500],
          },
        }),
  },
  typography: {
    fontFamily: [
      "Oswald",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    body1: {
      fontFamily: "Poppins, Arial, sans-serif",
    },
  },
});

export const getThemedComponents = (mode) => ({
  components: {
    ...(mode === "light"
      ? {
          // MuiAppBar: {
          //   styleOverrides: {
          //     colorPrimary: {
          //       backgroundColor: grey[800],
          //     },
          //   },
          // },
          // MuiLink: {
          //   variant: 'h3',
          // },
          // MuiButton: {
          //   styleOverrides: {
          //     root: {
          //       borderRadius: 0,
          //       color: common.white,
          //       fontFamily:
          //         "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
          //       fontSize: 20,
          //       borderWidth: 2,
          //       '&:hover': {
          //         borderWidth: 2,
          //       },
          //     },
          //   },
          //   variants: [
          //     {
          //       props: { variant: 'contained' },
          //       style: {
          //         fontFamily:
          //           "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
          //       },
          //     },
          //     {
          //       props: { variant: 'outlined' },
          //       style: {
          //         color: palette.light.primary.main,
          //       },
          //     },
          //     {
          //       props: { variant: 'primary', color: 'primary' },
          //       style: {
          //         border: '4px dashed blue',
          //       },
          //     },
          //   ],
          // },
          // MuiList: {
          //   styleOverrides: {
          //     root: {},
          //   },
          // },
          // MuiMenuItem: {
          //   styleOverrides: {
          //     root: {
          //       color: common.white,
          //       alignItems: 'stretch',
          //       fontFamily:
          //         "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
          //     },
          //   },
          // },
          // MuiAccordion: {
          //   styleOverrides: {
          //     root: {
          //       color: common.white,
          //       fontFamily:
          //         "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
          //     },
          //   },
          // },
        }
      : {}),
  },
});
