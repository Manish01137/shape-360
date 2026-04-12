const Preloader = ({ loading }) => {
  return (
    <div className={`preloader ${loading ? "" : "loaded"}`}>
      <div className="preloader-spinner"></div>
      <div className="preloader-text">
        {"SHAPE-360".split("").map((char, i) => (
          <span key={i} className="letter">
            {char === "-" ? "\u2013" : char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Preloader;
