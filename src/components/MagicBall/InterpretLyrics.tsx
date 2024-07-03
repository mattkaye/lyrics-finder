import { useState } from "react";
import { cn } from "../../utils/cn";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { formatLyrics } from "../../lib/FormatLyrics";

import "./styles.css";

export const InterpretLyrics = ({ lyrics }: { lyrics: string }) => {
  const [open, setOpen] = useState(false);
  const [interpretation, setInterpretation] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const onCloseModal = () => {
    setOpenModal(false);
    setInterpretation("");
  };

  const toggleMagicBox = () => {
    setOpen(!open);
  };

  const handleInterpretLyricsCall = async () => {
    setOpenModal(true);
    const response = await fetch(
      import.meta.env.VITE_INTERPRET_LYRICS_ENDPOINT,
      {
        method: "POST",
        body: JSON.stringify({ lyrics }),
      }
    );
    const data = await response.json();
    setInterpretation(data.message);
  };

  return (
    <aside className={cn("magic-ball-wrapper", open ? "active" : "")}>
      <div className="absolute -left-8 w-16 h-16 rounded-xl flex items-center bg-blue-500 text-5xl cursor-pointer ">
        <button onClick={toggleMagicBox} aria-label="Interpret Lyrics">
          🔮
        </button>
      </div>
      <button className="interpret" onClick={handleInterpretLyricsCall}>
        Interpret Lyrics
      </button>
      <Modal
        classNames={{
          modal: "p-20 text-black",
        }}
        open={openModal}
        onClose={onCloseModal}
        center
      >
        {!interpretation && <h1 className="text-3xl">Thinking... 🤔</h1>}
        {interpretation && formatLyrics(interpretation)}
      </Modal>
    </aside>
  );
};
