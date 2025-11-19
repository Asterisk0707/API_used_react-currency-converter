// 리액트에서 가장 기본적인 상태(state) 관리 도구
// -> 화면에 표시되는 값이 변경될 때 자동으로 컴포넌트를 다시 랜더링해 줌
import React, { useState } from 'react'; //// React와 useState 훅을 임포트


// 자주 사용할 통화 목록을 배열로 정의
//이후에 map()을 이용하여 SELECT 태그 옵션으로 사용
const CURRENCIES = ['USD', 'KRW', 'JPY', 'EUR', 'CNY', 'GBP'];

// 부모 컴포넌트에서 자식 컴포넌트로 값을 전달하는 방식
// 함수형 컴포넌트 정의 매개변수는 conversionRates 객체
  function CurrencyConverter({ conversionRates }) {
  // useState 훅 (React의 기본 상태 관리 기능)
  // amount: 사용자가 입력한 금액
  // setAmount: amount를 변경하는 함수
  // useState: 컴포넌트의 상태(state)를 선언하는 방법 (초기값을 인수로 전달)
  const [amount, setAmount] = useState(1); // 입력 금액
  // 선택한 기준 통화 (예: USD → KRW 변환 시 'USD')
  const [fromCurrency, setFromCurrency] = useState('USD'); // 기준 통화
  // 변환 목표 통화
  const [toCurrency, setToCurrency] = useState('KRW'); // 목표 통화
  // 계산된 결과 값
  const [result, setResult] = useState(null); // 변환 결과를 저장 (초기엔 null)

  // ▶ 실제 환산을 수행하는 함수로  (?버튼을 눌렀을 때 호출?)
  const convertCurrency = () => {
    // conversionRates 객체에서 각 통화의 USD 기준 환율을 꺼냄
    const rateFrom = conversionRates[fromCurrency];
    const rateTo = conversionRates[toCurrency];
    
    // 안전성 검사: 해당 통화 코드가 conversionRates에 없으면 에러 메시지 설정
    if (!rateFrom || !rateTo) {
        setResult("유효하지 않은 통화 코드입니다.");
        return;
    }
    
    // 환산 수식 : (입력 금액 / 기준 통화의 USD 대비 환율) * 목표 통화의 USD 대비 환율
    // 예: 100 KRW -> USD: (100 / 1455.28)
    // 예: 100 KRW -> JPY: (100 / 1455.28) * 154.04
    const convertedAmount = (amount / rateFrom) * rateTo;

    setResult(convertedAmount.toFixed(2)); // 소수점 둘째 자리까지 표시
  };

  // onChange, onClick 등 DOM 이벤트를 React 방식으로 처리.
  // JSX 반환: 리액트 컴포넌트의 렌더링되는 UI
  return (
    <div style={styles.container}>
      <h1>💸 환율 계산기</h1>
      
        {/* 1. 금액 입력: "제어 컴포넌트" 예시
        - value를 state(amount)로 바인딩하고 onChange로 setAmount를 호출하여 상태를 갱신 */}     
        <div style={styles.inputGroup}>
        <label>금액:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))} // 입력값은 문자열이므로 Number로 변환해주는 모습
          style={styles.input}
        />
      </div>

        {/* 2. FROM 통화 선택: select 요소와 map 사용
        - CURRENCIES 배열을 map으로 순회하여 option을 생성 (반복 렌더링) */}      
        <div style={styles.inputGroup}>
        <label>FROM:</label>
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          style={styles.select}
        >
          {/* 배열을 반복해 JSX 요소를 자동 생성할 때 사용 {code} 니들은 뭐냐 */}
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
      
      {/* 4. 계산 버튼: 클릭 시 convertCurrency 함수 실행 */}
      <button onClick={convertCurrency} style={styles.button}>
        환산하기
      </button>

      {/* 5. 결과 표시: 조건부 렌더링
      - result가 null이 아닐 때만 결과 박스를 보여줌 */}      
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
// JSX 외부에서 JS 객체로 스타일을 정의한 방식 (inline style)
//style={{ ... }} 형태로 객체 스타일을 적용.
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

export default CurrencyConverter; //// 이 컴포넌트를 다른 파일에서 import해서 사용 가능