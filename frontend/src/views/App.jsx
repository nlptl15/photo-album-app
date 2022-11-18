import React, { useEffect } from 'react';
import { ThemeProvider, StyledEngineProvider , createTheme, responsiveFontSizes} from '@mui/material/styles';
import { CssBaseline, useMediaQuery } from '@mui/material';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RoutePaths from '../configs/Routes';
import NotFound from './NotFound';
import Login from './auth/Login';
import TODOS from './Home';
import { ToastrProvider } from '../contexts/ToastrContext';
import { validateLoggedInUser } from '../services/Auth';
import Logout from './auth/Logout';
import DefaultAppTheme from '../theme';
import Signup from './auth/Signup';
import { getDesignTokens, getThemedComponents } from '../theme/Theme';
import { deepmerge } from '@mui/utils';
import { ColorModeContext } from '../contexts/ColorContext';

const App = () => {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = React.useState();

  React.useEffect(() => {
    setMode(prefersDarkMode ? 'dark' : 'light');
  }, [prefersDarkMode]);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  

  let theme = React.useMemo(
    () =>
      createTheme(deepmerge(getDesignTokens(mode), getThemedComponents(mode))),
    [mode]
  );


  theme = responsiveFontSizes(theme);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      const result = await validateLoggedInUser();
      if (result.success) {
        window.localStorage.setItem('isLoggedIn', true);
      } else {
        // DO SOMETHING
      }
    } catch {
      // DO SOMETHING
    }
  }, []);

  return (
    <StyledEngineProvider injectFirst>
    <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <ToastrProvider>
              <Router>
                <Switch>
                <Route exact path={RoutePaths.SIGNUP} component={Signup} />
                  <Route exact path={RoutePaths.LOGIN} component={Login} />
                  <Route exact path={RoutePaths.LOGOUT} component={Logout} />
                  <Route exact path={RoutePaths.HOME} component={TODOS} />
                  <Route exact path="*" component={NotFound} />
                </Switch>
              </Router>
            </ToastrProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </StyledEngineProvider>
  );
};

export default App;
