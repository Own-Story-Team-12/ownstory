import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import styles from '../css/fairytale.module.css';

function Animation() {
  const animationContainer = useRef(null);

  useEffect(() => {
    const animData = {
      container: animationContainer.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/35984/LEGO_loader.json'
    };

    const anim = lottie.loadAnimation(animData);
    anim.setSpeed(3.4);

    return () => {
      anim.destroy(); // 애니메이션 컴포넌트가 언마운트될 때 애니메이션을 제거합니다.
    };
  }, []);

  return (
  <>
  <div ref={animationContainer}/>
  </>
  );
}

export default Animation;