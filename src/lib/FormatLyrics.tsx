export const formatLyrics = (lyrics: string) => {
  const paragraphs = removeLyricJunk(lyrics.split(/\r?\n/));
  return (
    <div className="flex flex-col gap-4">
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
};

const removeLyricJunk = (lyrics: string[]) => {
  if (lyrics[0].includes("Paroles de la chanson")) {
    lyrics.shift();
  }
  return lyrics.filter((line) => line);
};
