import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CurrencyConverter from './CurrencyConverter';

const API_KEY = process.env.REACT_APP_EXCHANGE_RATE_API_KEY;
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

function CurrencyFetcher() {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        const response = await axios.get(BASE_URL);

        if (response.data.result === 'success') {
          setRates(response.data.conversion_rates);
          setError(null);
        } else {
          setError("API 호출에 실패했습니다. 키 또는 요청 한도를 확인해 주세요.");
        }
      } catch (e) {
        setError("데이터 통신 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  // 로딩 중 UI (Tailwind 적용)
  if (loading) {
    return (
      <div className="text-center p-12 text-lg font-medium">
        환율 정보를 불러오는 중입니다... 🔄
      </div>
    );
  }

  // 에러 UI (Tailwind 적용)
  if (error) {
    return (
      <div className="text-center p-12 text-red-500 font-semibold">
        오류 발생: {error}
      </div>
    );
  }

  return <CurrencyConverter conversionRates={rates} />;
}

export default CurrencyFetcher;
