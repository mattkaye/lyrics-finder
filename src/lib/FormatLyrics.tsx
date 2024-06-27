export const formatLyrics = (lyrics: string) => {
  const paragraphs = removeLyricJunk(lyrics.split(/\r?\n/));

  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </>
  );
};

const removeLyricJunk = (lyrics: string[]) => {
  if (lyrics[0].includes("Paroles de la chanson")) {
    lyrics.shift();
  }
  return lyrics;
};
