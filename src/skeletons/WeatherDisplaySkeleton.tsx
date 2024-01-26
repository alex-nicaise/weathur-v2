const WeatherDisplaySkeleton = () => {
  return (
    <span id="weather-display-skeleton">
      <div className="condition-icon-loader load"></div>
      <div className="h1-loader load"></div>
      <div className="h3-loader load"></div>
      <div className="h4-loader load"></div>
      <hr />

      <section id="other-info-loader">
        <div className="info-row">
          <span className="info-para-loader load"></span>
          <span className="info-para-loader load"></span>
        </div>
        <div className="info-row">
          <span className="info-para-loader load"></span>
          <span className="info-para-loader load"></span>
        </div>
      </section>
      <section id="day-forecast-loader">
        <div className="h3-loader load"></div>
        <div id="days-loader-container">
          <div className="days-loader">
            <section>
              <div className="h4-loader load"></div>
              <p className="load"></p>
              <p className="load"></p>
              <p className="load"></p>
              <p className="load"></p>
              <p className="load"></p>
            </section>
          </div>
          <div className="days-loader">
            <section>
              <div className="h4-loader load"></div>
              <p className="load"></p>
              <p className="load"></p>
              <p className="load"></p>
              <p className="load"></p>
              <p className="load"></p>
            </section>
          </div>
        </div>
      </section>
    </span>
  );
};

export default WeatherDisplaySkeleton;
