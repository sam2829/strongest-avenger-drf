import { useEffect, useRef, useState } from "react";

// Custom hook to handle click outside toggle functionality
const UseClickOutsideToggle = () => {
  // This is to check if the hamburger menu is expanded
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        // Collapse the menu if clicked outside of it
        setExpanded(false);
      }
    };
    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [ref]);

  return { expanded, setExpanded, ref };
};

export default UseClickOutsideToggle;
