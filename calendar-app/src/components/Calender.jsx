import { useEffect, useMemo, useState } from "react";
import CalendarGrid from "./CalenderGrid";
import NotesPanel from "./NotesPanel";
import HeroImage from "./HeroImage";
import { getMonthVisual } from "./calendarConfig";

const STORAGE_KEY = "wallify-calendar-notes-v1";

function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatRangeLabel(startDate, endDate) {
  if (!startDate && !endDate) {
    return "Select a start and end date";
  }

  if (startDate && !endDate) {
    return `Start: ${startDate.toDateString()}`;
  }

  return `${startDate.toDateString()} - ${endDate.toDateString()}`;
}

function createMonthView(date, monthOffset = 0) {
  return new Date(date.getFullYear(), date.getMonth() + monthOffset, 1);
}

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function readStoredNotes() {
  const source = localStorage.getItem(STORAGE_KEY);

  if (!source) {
    return {};
  }

  try {
    return JSON.parse(source);
  } catch {
    return {};
  }
}

export default function Calendar() {
  const today = useMemo(() => new Date(), []);
  const [viewDate, setViewDate] = useState(() => createMonthView(today));
  const month = viewDate.getMonth();
  const year = viewDate.getFullYear();
  const { theme: activeTheme } = useMemo(() => getMonthVisual(month), [month]);
  const monthKey = `${year}-${String(month + 1).padStart(2, "0")}`;
  const daysInMonth = useMemo(() => getDaysInMonth(year, month), [year, month]);

  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd] = useState(null);
  const [notesStore, setNotesStore] = useState(() => readStoredNotes());

  useEffect(() => {
    const payload = JSON.stringify(notesStore);
    localStorage.setItem(STORAGE_KEY, payload);
  }, [notesStore]);

  useEffect(() => {
    setRangeStart(null);
    setRangeEnd(null);
  }, [monthKey]);

  const onDateSelect = (selectedDate) => {
    if (
      rangeStart &&
      rangeEnd &&
      (toDateKey(selectedDate) === toDateKey(rangeStart) ||
        toDateKey(selectedDate) === toDateKey(rangeEnd))
    ) {
      return;
    }

    if (!rangeStart || (rangeStart && rangeEnd)) {
      setRangeStart(selectedDate);
      setRangeEnd(null);
      return;
    }

    if (selectedDate < rangeStart) {
      setRangeEnd(rangeStart);
      setRangeStart(selectedDate);
      return;
    }

    setRangeEnd(selectedDate);
  };

  const monthNotes = notesStore[monthKey] ?? { monthly: "", ranges: {} };

  const selectionKey = rangeStart
    ? rangeEnd
      ? `${toDateKey(rangeStart)}__${toDateKey(rangeEnd)}`
      : `${toDateKey(rangeStart)}__${toDateKey(rangeStart)}`
    : null;

  const onRangeNoteChange = (value) => {
    if (!selectionKey) {
      return;
    }

    setNotesStore((current) => ({
      ...current,
      [monthKey]: {
        ...(current[monthKey] ?? { monthly: "" }),
        ranges: {
          ...((current[monthKey] ?? { ranges: {} }).ranges ?? {}),
          [selectionKey]: value,
        },
      },
    }));
  };

  const onClearRange = () => {
    setNotesStore((current) => {
      const currentMonth = current[monthKey] ?? { monthly: "", ranges: {} };
      const nextRanges = { ...(currentMonth.ranges ?? {}) };

      if (selectionKey) {
        delete nextRanges[selectionKey];
      }

      return {
        ...current,
        [monthKey]: {
          ...currentMonth,
          ranges: nextRanges,
        },
      };
    });

    setRangeStart(null);
    setRangeEnd(null);
  };

  const activeRangeNote = selectionKey ? monthNotes.ranges?.[selectionKey] ?? "" : "";
  const selectedRangeLabel = formatRangeLabel(rangeStart, rangeEnd);
  const selectedDaysCount = rangeStart && rangeEnd
    ? Math.floor((rangeEnd - rangeStart) / (1000 * 60 * 60 * 24)) + 1
    : rangeStart
    ? 1
    : 0;
  const isCurrentMonthView = month === today.getMonth() && year === today.getFullYear();
  const monthProgress = isCurrentMonthView
    ? Math.round((today.getDate() / daysInMonth) * 100)
    : null;

  const navigateMonth = (offset) => {
    setViewDate((current) => createMonthView(current, offset));
  };

  const setMonth = (nextMonth) => {
    if (Number.isNaN(nextMonth) || nextMonth < 0 || nextMonth > 11) {
      return;
    }

    setViewDate((current) => new Date(current.getFullYear(), nextMonth, 1));
  };

  const setYear = (nextYear) => {
    if (Number.isNaN(nextYear) || nextYear < 1900 || nextYear > 2100) {
      return;
    }

    setViewDate((current) => new Date(nextYear, current.getMonth(), 1));
  };

  const goToToday = () => {
    setViewDate(createMonthView(today));
  };

  return (
    <section
      className="poster-shell"
      style={{
        "--accent-main": activeTheme.accent,
        "--accent-soft": activeTheme.accentSoft,
        "--accent-strong": activeTheme.accentStrong,
      }}
    >
      <div className="spiral-row" aria-hidden="true">
        {Array.from({ length: 22 }).map((_, index) => (
          <span className="spiral-hole" key={index} />
        ))}
      </div>

      <div className="poster-card">
        <HeroImage
          month={month}
          year={year}
          todayDate={today}
          onPrevMonth={() => navigateMonth(-1)}
          onNextMonth={() => navigateMonth(1)}
          onToday={goToToday}
          onMonthChange={setMonth}
          onYearChange={setYear}
        />
        <div className="poster-bottom">
          <NotesPanel
            selectedRangeLabel={selectedRangeLabel}
            selectedDaysCount={selectedDaysCount}
            rangeNote={activeRangeNote}
            onRangeNoteChange={onRangeNoteChange}
            canEditRangeNote={Boolean(selectionKey)}
            onClearRange={onClearRange}
          />
          <div className="grid-shell">
            <CalendarGrid
              month={month}
              year={year}
              rangeStart={rangeStart}
              rangeEnd={rangeEnd}
              onDateSelect={onDateSelect}
            />
          </div>
        </div>
      </div>
    </section>
  );
}