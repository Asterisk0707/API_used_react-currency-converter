import React from 'react';
import './App.css'; 
// ⬇️ 이 부분을 중괄호 없이 'default import' 방식으로 수정합니다.
import CurrencyFetcher from './CurrencyFetcher'; 

function App() {
  return (
    <div className="App">
      <CurrencyFetcher />
    </div>
  );
}

export default App;