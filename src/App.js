import Appstore from './utils/Appstore';
import { Provider } from 'react-redux';
import Body from './components/Body';

function App() {
  return (
    <Provider store={Appstore}>
    <Body/>
    </Provider>
  );
}

export default App;
