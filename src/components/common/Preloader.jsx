import { useState, useEffect } from "react";

const Preloader = ({ loading }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!loading) return;
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 2;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
      }
      setCount(current);
    }, 35);
    return () => clearInterval(interval);
  }, [loading]);

  return (
    <div className={`preloader ${loading ? "" : "loaded"}`}>
      <div className="preloader-inner">
        <div className="preloader-count">{count}</div>
        <div className="preloader-bar">
          <div className="preloader-bar-fill" style={{ width: `${count}%` }} />
        </div>
        <div className="preloader-brand">
          {"SHAPE-360".split("").map((char, i) => (
            <span key={i} className="letter" style={{ animationDelay: `${i * 0.1}s` }}>
              {char === "-" ? "\u2013" : char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Preloader;
