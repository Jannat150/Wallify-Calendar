import DayCell from "./DayCell";

const weekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

function atMidnight(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function createCalendarDays(year, month) {
  const first = new Date(year, month, 1);
  const firstDayMondayBased = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPreviousMonth = new Date(year, month, 0).getDate();
  const cells = [];

  for (let i = firstDayMondayBased - 1; i >= 0; i -= 1) {
    const day = daysInPreviousMonth - i;
    cells.push({
      day,
      date: new Date(year, month - 1, day),
      isCurrentMonth: false,
    });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({
      day,
      date: new Date(year, month, day),
      isCurrentMonth: true,
    });
  }

  while (cells.length < 42) {
    const day = cells.length - (firstDayMondayBased + daysInMonth) + 1;
    cells.push({
      day,
      date: new Date(year, month + 1, day),
      isCurrentMonth: false,
    });
  }

  return cells;
}

export default function CalendarGrid({
  month,
  year,
  rangeStart,
  rangeEnd,
  onDateSelect,
}) {
  const days = createCalendarDays(year, month);
  const today = atMidnight(new Date());
  const normalizedStart = rangeStart ? atMidnight(rangeStart) : null;
  const normalizedEnd = rangeEnd ? atMidnight(rangeEnd) : null;

  return (
    <section className="month-grid-wrap">
      <div className="weekday-row">
        {weekDays.map((day) => (
          <span key={day} className="weekday-label">
            {day}
          </span>
        ))}
      </div>

      <div className="days-grid">
        {days.map((item, index) => (
          <DayCell
            key={`${item.day}-${index}`}
            day={item.day}
            date={item.date}
            isCurrentMonth={item.isCurrentMonth}
            weekDayIndex={index % 7}
            isToday={isSameDay(item.date, today)}
            isRangeStart={Boolean(
              normalizedStart && isSameDay(item.date, normalizedStart),
            )}
            isRangeEnd={Boolean(
              normalizedEnd && isSameDay(item.date, normalizedEnd),
            )}
            isInRange={Boolean(
              normalizedStart &&
                normalizedEnd &&
                item.date > normalizedStart &&
                item.date < normalizedEnd,
            )}
            onSelect={onDateSelect}
          />
        ))}
      </div>
    </section>
  );
}