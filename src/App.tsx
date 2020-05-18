import React from 'react';

import Home from './pages/Home';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Home />
    </UserProvider>
  );
}

export default App;
