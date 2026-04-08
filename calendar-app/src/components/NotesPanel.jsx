export default function NotesPanel({
  selectedRangeLabel,
  selectedDaysCount,
  rangeNote,
  onRangeNoteChange,
  canEditRangeNote,
  onClearRange,
}) {
  return (
    <section className="notes-panel">
      <h3 className="notes-title">Notes</h3>

      <div className="range-header">
        <p className="notes-caption">Selected Range</p>
        <button type="button" className="clear-btn" onClick={onClearRange}>
          Clear
        </button>
      </div>

      <p className="range-label">{selectedRangeLabel}</p>
      <p className="range-count">
        {selectedDaysCount > 0
          ? `${selectedDaysCount} day selection`
          : "No days selected yet"}
      </p>

      <textarea
        className="notes-textarea notes-textarea-small"
        value={rangeNote}
        onChange={(event) => onRangeNoteChange(event.target.value)}
        placeholder="Select a day or date range to write a note..."
        disabled={!canEditRangeNote}
      />
    </section>
  );
}