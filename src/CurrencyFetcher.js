// CurrencyConverter.js UI(입력·선택·계산)와 표시 담당
//전달된 conversionRates를 받아 실제 환산 로직과 UI만 처리(입력 필드, select, 버튼, 결과 표시).
// amount, fromCurrency, toCurrency, result (사용자 입력·계산 관련)
// JSX 사용, 이벤트 핸들링, 상태 관리 등 UI 관련 로직 집중.

// React 기본 문법을 사용하는 곳:
// - import: 외부 라이브러리나 다른 파일에서 기능을 가져올 때 사용
// - useState: 컴포넌트 내부에서 상태(state)를 선언/관리할 때 사용
// - useEffect: 컴포넌트의 "사이드 이펙트"(예: API 호출)를 처리할 때 사용
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CurrencyConverter from './CurrencyConverter';

// 환경변수 사용 예:
// process.env.REACT_APP_EXCHANGE_RATE_API_KEY 는 .env에 설정한 값(개인 키)을 참조
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

// 함수형 컴포넌트 선언: React에서는 함수가 UI(컴포넌트)를 반환함
function CurrencyFetcher() {
  // - rates: 환율 데이터가 들어갈 변수 (초기 null)
  // - loading: 로딩 중 표시를 위한 boolean
  // - error: 에러 메시지를 저장
  const [rates, setRates] = useState(null); // !!null true 달리는 조건 확인!!
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // String, NULL, Boolean

  // useEffect: 컴포넌트가 화면에 마운트(처음 렌더)될 때 실행되는 훅으로
  // 빈 배열([])을 두번째 인자로 전달하면 "한 번만" 실행됨
  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        // axios.get: 외부 API에 HTTP GET 요청을 보냄
        const response = await axios.get(BASE_URL);

        // API 응답 구조에 따라 성공 여부 판단
        if (response.data.result === 'success') {
          // 환율 정보(conversion_rates)만 저장합니다.
          // conversion_rates 객체를 상태로 저장
          setRates(response.data.conversion_rates);
          setError(null); // 이전 에러가 있으면 초기화
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
        // 성공/실패 상관없이 로딩 끝 처리

        setLoading(false);
      }
    };

    // 위에서 정의한 비동기 함수 호출
    fetchRates();
  }, []); // 컴포넌트 마운트 시 한 번만 실행

// 조건부 렌더링 예시 1: 로딩 중에는 로딩 메시지만 보여줌
  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>환율 정보를 불러오는 중입니다... 🔄</div>;
  }
  // 조건부 렌더링 예시 2: 에러가 있으면 에러 메시지만 보여줌
  if (error) {
    return <div style={{ textAlign: 'center', color: 'red', padding: '50px' }}>오류 발생: {error}</div>;
  }

  // 정상적으로 rates가 로드되면 자식 컴포넌트인 CurrencyConverter에 props로 전달
  // props 전달 방식: <Component propName={value} />
  // 여기서는 conversionRates라는 이름으로 환율 객체를 전달
  return <CurrencyConverter conversionRates={rates} />;
}

export default CurrencyFetcher;