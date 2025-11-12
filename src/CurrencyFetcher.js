import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CurrencyConverter from './CurrencyConverter';

// ExchangeRate-API 키를 환경 변수에서 가져옵니다.
const API_KEY = process.env.REACT_APP_EXCHANGE_RATE_API_KEY; 
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

function CurrencyFetcher() {
  const [rates, setRates] = useState(null); // !!null true 달리는 조건 확인!!
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // String, NULL, Boolean

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        // API 호출
        const response = await axios.get(BASE_URL);
        
        if (response.data.result === 'success') {
          // 환율 정보(conversion_rates)만 저장합니다.
          setRates(response.data.conversion_rates);
          setError(null);
        } else {
          // API 응답 결과가 'error'인 경우 처리 (예: 잘못된 키, 요청 한도 초과)
          setError("API 호출에 실패했습니다. 키 또는 요청 한도를 확인해 주세요.");
          console.error("API Error Response:", response.data);
        }
      } catch (e) {
        // 네트워크 오류 등 예외 처리
        setError("데이터 통신 중 오류가 발생했습니다.");
        console.error("Network Error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>환율 정보를 불러오는 중입니다... 🔄</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', color: 'red', padding: '50px' }}>오류 발생: {error}</div>;
  }

  // 데이터가 성공적으로 로드되면 변환기 컴포넌트에 전달
  return <CurrencyConverter conversionRates={rates} />;
}

export default CurrencyFetcher;