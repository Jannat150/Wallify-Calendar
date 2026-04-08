export default function DayCell({
  day,
  date,
  isCurrentMonth,
  weekDayIndex,
  isToday,
  isRangeStart,
  isRangeEnd,
  isInRange,
  onSelect,
}) {
  const isSaturday = weekDayIndex === 5;
  const isSunday = weekDayIndex === 6;
  const numberClassNames = ["day-number"];
  const cellClassNames = ["day-cell"];

  if (!isCurrentMonth) {
    numberClassNames.push("is-muted");
    cellClassNames.push("is-other-month");
  }

  if (isSaturday) {
    numberClassNames.push("is-saturday");
  }

  if (isSunday) {
    numberClassNames.push("is-sunday");
  }

  if (isToday) {
    cellClassNames.push("is-today");
  }

  if (isInRange) {
    cellClassNames.push("is-in-range");
  }

  if (isRangeStart) {
    cellClassNames.push("is-range-start");
  }

  if (isRangeEnd) {
    cellClassNames.push("is-range-end");
  }

  return (
    <button
      type="button"
      className={cellClassNames.join(" ")}
      onClick={() => onSelect(date)}
      aria-label={date.toDateString()}
    >
      <span className={numberClassNames.join(" ")}>{day}</span>
    </button>
  );
}