import { useState } from "react";
import { cn } from "../../utils/cn";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

import "./styles.css";

export const InterpretLyrics = ({ lyrics }: { lyrics: string }) => {
  const [open, setOpen] = useState(false);
  const [interpretation, setInterpretation] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const onCloseModal = () => {
    setOpenModal(false);
    setInterpretation(false);
  };

  const toggleMagicBox = () => {
    setOpen(!open);
  };

  const handleInterpretLyricsCall = async () => {
    setOpenModal(true);
    const response = await fetch("https://fakeresponder.com/?sleep=2000");

    const data = await response.json();
    setInterpretation(data.about);
    console.log(data);
  };

  // Remove the line breaks
  const cleanLyrics = lyrics.replaceAll("\n", " ");

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
        {interpretation && cleanLyrics}
      </Modal>
    </aside>
  );
};
