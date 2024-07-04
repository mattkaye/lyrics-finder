export const formatLyrics = (lyrics: string) => {
  const paragraphs = removeLyricJunk(lyrics.split(/\r?\n/));
  return (
    <div className="flex flex-col gap-4">
      {paragraphs.map((paragraph, index) => boldLyrics(paragraph, index))}
    </div>
  );
};

const boldLyrics = (paragraph: string, index: number) => {
  const parts = paragraph.split(/(\* \*\*.*\*\*)/g).map((part, i) => {
    if (part.match(/\* \*\*.*\*\*/)) {
      // Remove the markers and wrap the text in a strong tag
      const strongText = part.replace("* **", "").replace("**", "");
      return <strong key={i}>{strongText}</strong>;
    } else {
      return part;
    }
  });

  return <p key={index}>{parts}</p>;
};

const removeLyricJunk = (lyrics: string[]) => {
  if (lyrics[0].includes("Paroles de la chanson")) {
    lyrics.shift();
  }
  return lyrics.filter((line) => line);
};
