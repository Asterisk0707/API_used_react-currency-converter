import React, { useState } from 'react';

// 자주 사용할 통화 목록을 정의합니다.
const CURRENCIES = ['USD', 'KRW', 'JPY', 'EUR', 'CNY', 'GBP'];

function CurrencyConverter({ conversionRates }) {
  const [amount, setAmount] = useState(1); // 입력 금액
  const [fromCurrency, setFromCurrency] = useState('USD'); // 기준 통화
  const [toCurrency, setToCurrency] = useState('KRW'); // 목표 통화
  const [result, setResult] = useState(null); // 변환 결과

  // 변환 로직
  const convertCurrency = () => {
    // API 데이터의 기준 통화는 항상 USD입니다.

    // 1. 기준 금액(amount)을 USD 기준으로 환산합니다. (USD/USD = 1)
    const rateFrom = conversionRates[fromCurrency];
    const rateTo = conversionRates[toCurrency];
    
    if (!rateFrom || !rateTo) {
        setResult("유효하지 않은 통화 코드입니다.");
        return;
    }
    
    // (입력 금액 / 기준 통화의 USD 대비 환율) * 목표 통화의 USD 대비 환율
    // 예: 100 KRW -> USD: (100 / 1455.28)
    // 예: 100 KRW -> JPY: (100 / 1455.28) * 154.04
    const convertedAmount = (amount / rateFrom) * rateTo;

    setResult(convertedAmount.toFixed(2)); // 소수점 둘째 자리까지 표시
  };

  return (
    <div style={styles.container}>
      <h1>💸 환율 계산기</h1>
      
      {/* 1. 금액 입력 */}
      <div style={styles.inputGroup}>
        <label>금액:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          style={styles.input}
        />
      </div>

      {/* 2. 통화 선택: FROM */}
      <div style={styles.inputGroup}>
        <label>FROM:</label>
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          style={styles.select}
        >
          {CURRENCIES.map((code) => (
            <option key={code} value={code}>{code}</option>
          ))}
        </select>
      </div>

      {/* 3. 통화 선택: TO */}
      <div style={styles.inputGroup}>
        <label>TO:</label>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          style={styles.select}
        >
          {CURRENCIES.map((code) => (
            <option key={code} value={code}>{code}</option>
          ))}
        </select>
      </div>
      
      {/* 4. 계산 버튼 */}
      <button onClick={convertCurrency} style={styles.button}>
        환산하기
      </button>

      {/* 5. 결과 표시 */}
      {result !== null && (
        <div style={styles.result}>
          <h3>변환 결과:</h3>
          <p>
            {amount} {fromCurrency}는 
            {result} {toCurrency} 입니다.
          </p>
          <p style={styles.baseInfo}>
            (API 기준: 1 USD = {conversionRates[fromCurrency].toFixed(4)} {fromCurrency})
          </p>
        </div>
      )}
    </div>
  );
}

// 간단한 스타일 정의
const styles = {
    container: {
        maxWidth: '400px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    },
    inputGroup: {
        marginBottom: '15px',
    },
    input: {
        width: 'calc(100% - 10px)',
        padding: '10px',
        marginTop: '5px',
        borderRadius: '5px',
        border: '1px solid #ddd'
    },
    select: {
        width: '100%',
        padding: '10px',
        marginTop: '5px',
        borderRadius: '5px',
        border: '1px solid #ddd'
    },
    button: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px'
    },
    result: {
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#f8f9fa',
        border: '1px dashed #ced4da',
        borderRadius: '5px',
        textAlign: 'center'
    },
    baseInfo: {
        fontSize: '0.8em',
        color: '#6c757d'
    }
};

export default CurrencyConverter;