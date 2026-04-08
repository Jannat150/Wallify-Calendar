import { getMonthVisual, monthNames } from "./calendarConfig";

export default function HeroImage({
  month,
  year,
  todayDate,
  onPrevMonth,
  onNextMonth,
  onToday,
  onMonthChange,
  onYearChange,
}) {
  const { image: heroImage, theme: monthTheme } = getMonthVisual(month);
  const todayDay = todayDate.toLocaleDateString("default", { weekday: "long" });
  const todayYear = todayDate.getFullYear();

  return (
    <div className="hero-section">
      <div className="hero-photo-diagonal-container">
        <img
          src={heroImage}
          alt={`${monthNames[month]} calendar hero`}
          className="hero-photo-diagonal"
        />
        <div
          className="hero-photo-tint"
          style={{
            "--hero-tint": monthTheme.tint,
          }}
        />
      </div>
      <div className="hero-top-controls">
        <p className="today-label">Today: {todayDay}, {todayYear}</p>
        <div className="hero-control-row">
          <div className="month-nav" aria-label="Calendar month controls">
            <button type="button" className="month-nav-btn" onClick={onPrevMonth}>
              Prev
            </button>
            <button type="button" className="month-nav-btn" onClick={onToday}>
              Today
            </button>
            <button type="button" className="month-nav-btn" onClick={onNextMonth}>
              Next
            </button>
          </div>
          <div className="month-picker-row">
            <select
              className="month-picker-select"
              aria-label="Select month"
              value={month}
              onChange={(event) => onMonthChange(Number(event.target.value))}
            >
              {monthNames.map((name, index) => (
                <option key={name} value={index}>
                  {name}
                </option>
              ))}
            </select>
            <input
              className="month-picker-year"
              type="number"
              min="1900"
              max="2100"
              value={year}
              onChange={(event) => onYearChange(Number(event.target.value))}
              aria-label="Select year"
            />
          </div>
        </div>
      </div>
      <div
        className="hero-blue-band"
        style={{
          "--hero-from": monthTheme.from,
          "--hero-to": monthTheme.to,
        }}
      >
        <div className="month-badge">
          <p>{year}</p>
          <h2>{monthNames[month]}</h2>
        </div>
      </div>
    </div>
  );
}