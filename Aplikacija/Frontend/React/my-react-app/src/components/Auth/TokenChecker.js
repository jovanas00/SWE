import { useRef, useEffect } from 'react';
import Cookies from 'js-cookie';

const TokenChecker = () => {
  const prevTokenRef = useRef('');

  const checkToken = () => {
    const token = Cookies.get('token');

    if (!token) {
      window.location.href = '/prijava';
    } else {
      if (prevTokenRef.current !== token && prevTokenRef.current !== '') {
        window.location.href = '/prijava';
        Cookies.remove('token');
      }

      prevTokenRef.current = token;
    }
  };

  useEffect(() => {
    checkToken();

    const interval = setInterval(checkToken, 1800*1000); // Interval 30 min provera

    return () => {
      clearInterval(interval);
    };
  }, []);

  return null;
};

export default TokenChecker;
