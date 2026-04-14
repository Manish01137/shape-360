import "./PageLoader.css";

const PageLoader = () => {
  return (
    <div className="page-loader">
      <div className="page-loader-inner">
        <div className="loader-shimmer"></div>
        <div className="loader-shimmer short"></div>
        <div className="loader-shimmer medium"></div>
      </div>
    </div>
  );
};

export default PageLoader;
