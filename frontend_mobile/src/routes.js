import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Login from './pages/Login';
import Spots from './pages/Spots';
import Book from './pages/Book';

const Routes = createAppContainer(
    createSwitchNavigator(
        {
            Login,
            Spots,
            Book
        }
    )
);

export default Routes;