import React, { useState, MouseEvent, useEffect } from 'react';
import './SpinButton.css';

const SpinButton: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);
  const [text, setText] = useState<null | string>(null);

  const increment = () => {
    if (count > 2) {
      setText('최대 인원수는 3명까지 가능합니다');
      return;
    }
    setText(`성인 승객 추가 ${count + 1}`);
    setCount((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    if (count < 1) {
      setText('최소 인원수는 0명까지 가능합니다');
      return;
    }
    setIsTooltipVisible(false);
    setText(`성인 승객 감소 ${count - 1}`);
    setCount((prevCount) => prevCount - 1);
  };

  const toggleTooltip = (event: MouseEvent<HTMLDivElement>) => {
    setIsTooltipVisible(!isTooltipVisible);
  };

  useEffect(() => {
    setTimeout(() => {
      setText(null);
    }, 1000);
  }, [text]);

  return (
    <section className="spinButtonContainer">
      <div>
        <h1>승객 선택</h1>
        <div className="spinButtonLabel">
          <label>성인</label>
          <div
            className="helpIcon"
            onMouseEnter={toggleTooltip}
            onMouseLeave={toggleTooltip}
          >
            ?
            {isTooltipVisible && (
              <span className="tooltip">최대 인원수는 3명까지 가능합니다</span>
            )}
          </div>
        </div>
        <button
          onClick={decrement}
          className="spinButton"
          aria-label="성인 탑승자 한명 줄이기"
        >
          -
        </button>
        <input
          type="text"
          role="spinbutton"
          readOnly
          className="spinButtonInput"
          value={count}
          aria-label="성인"
        />
        <button
          onClick={increment}
          className="spinButton"
          aria-label="성인 탑승자 한명 늘리기"
        >
          +
        </button>
        <div
          role="status"
          style={{ position: 'absolute', top: '1000px', left: '1000px' }}
        >
          {text}
        </div>
      </div>
    </section>
  );
};

export default SpinButton;
