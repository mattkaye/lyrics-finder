import { useState } from "react";
import { cn } from "../../utils/cn";

import "./styles.css";

export const InterpretLyrics = () => {
  const [open, setOpen] = useState(false);

  const toggleMagicBox = () => {
    setOpen(!open);
  };

  return (
    <aside className={cn("magic-ball-wrapper", open ? "active" : "")}>
      <div className="absolute -left-8 w-16 h-16 rounded-xl flex items-center bg-blue-500 text-5xl cursor-pointer ">
        <button onClick={toggleMagicBox} aria-label="Interpret Lyrics">
          🔮
        </button>
      </div>
      <button className="interpret">Interpret Lyrics</button>
    </aside>
  );
};
