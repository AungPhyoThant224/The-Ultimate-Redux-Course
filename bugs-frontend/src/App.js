import logo from './logo.svg';
import './App.css';
import Bugs from './components/Bugs';
import StoreContext from './context/storeContext';
import configureStore from './store/configureStore';

const store = configureStore();

function App() {
  return (
    <StoreContext.Provider value={store}>
      <Bugs />
    </StoreContext.Provider>
  );
}

export default App;