import React from 'react';
import Countries from './Components/Countries';
import './assets/styles/utils/_reset.scss';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>Country database</h1>
      </header>
      <main>
        <Countries />
      </main>
    </div>
  );
}

export default App;
