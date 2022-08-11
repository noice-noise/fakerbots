import { ChakraProvider } from '@chakra-ui/react';
import { Dashboard } from './pages/Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './components/Elements/Header';
import theme from './theme';

import AuthProvider from './providers/AuthProvider';

function App() {
  return (
    <Router>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard />} />
          </Routes>
        </AuthProvider>
      </ChakraProvider>
    </Router>
  );
}

export default App;
