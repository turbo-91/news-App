import React from "react";
import { useEffect, useState, useRef } from "react";
import { Calendar } from "react-date-range";
import format from "date-fns/format";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function DateRangeCompTo({ dateRange, setDateRange }) {
  // open close calendar table state:
  const [open, setOpen] = useState(false);

  // useRef hook to get the target element to toggle
  const refOne = useRef(null);

  // set current date on component load:
  useEffect(() => {
    setDateRange(format(new Date(), "MM/dd/yyyy"));

    // event listeners to open/close calendar table
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, [setDateRange]);

  // function: hide dropdown on ESC press
  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // function: Hide on outside click
  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  // on date change, store data in state
  const handleSelect = (date) => {
    setDateRange(format(date, "MM/dd/yyyy"));
  };
  return (
    <div className="calenderWrap">
      <input
        id="date-to"
        value={dateRange}
        readOnly
        className="dataRangeInputBox"
        onClick={() => setOpen((open) => !open)} // open/close calendar table
      />
      {/* div to make close on outside click possible: */}
      <div ref={refOne}>
        {open && (
          <Calendar
            date={new Date()}
            onChange={handleSelect}
            className="calendarElement"
          />
        )}
      </div>
    </div>
  );
}
