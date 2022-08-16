import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './components/Elements/Header';
import { Dashboard } from './pages/Dashboard';
import AuthProvider from './providers/AuthProvider';
import theme from './theme';

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
