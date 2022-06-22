
import './App.css';
import { Provider } from 'react-redux';

import { AppRouter } from './router/AppRouter';
import { ThemeProvider } from '@material-ui/styles';
import theme from './themaConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './redux/store';

function App() {
  return (
    <Provider  store={store}   >
       <ThemeProvider theme={theme } >
            <AppRouter /> 
       </ThemeProvider>
    </Provider>
 );
}

export default App;
