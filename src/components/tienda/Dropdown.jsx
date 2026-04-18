import { useState, useRef, useEffect } from "react";
import "../../styles/tienda/Dropdown.css";

export default function Dropdown({ label = "Seleccionar", moodInfo, options = [], onSelect }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const dropdownRef = useRef(null);

  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false);
    if (onSelect) onSelect(option); 
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
    { 

    (moodInfo === false)
    
    ? (
        <div className="dropdown" ref={dropdownRef}>
          <button className="dropdown-button" onClick={() => setOpen(!open)}>
            {selected ? selected.label : label}
            <span className={`arrow ${open ? "open" : ""}`}>▼</span>
          </button>

          <ul className={`dropdown-menu ${open ? "open" : ""}`}>
            {options.map((option) => (
              <li
                key={option.value}
                className="dropdown-item"
                onClick={() => handleSelect(option)}
              >
                {option.label} 
              </li>
            ))}
          </ul>
        </div>
      )
    
    : (
        <div className="dropdown" ref={dropdownRef}>
          <button className="dropdown-button disabled" onClick={() => setOpen(!open)} disabled>
            {selected ? selected.label : label}
            <span className={`arrow ${open ? "open" : ""}`}>▼</span>
          </button>

          <ul className={`dropdown-menu ${open ? "open" : ""}`}>
            {options.map((option) => (
              <li
                key={option.value}
                className="dropdown-item"
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
    )

    }
  </>
  );
}