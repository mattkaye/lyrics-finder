const SearchLyrics = async (artistName: string, songTitle: string) => {
  const data = await fetch(
    `https://api.lyrics.ovh/v1/${encodeURIComponent(
      artistName
    )}/${encodeURIComponent(songTitle)}`
  );
  const json = await data.json();
  return json;
};

export default SearchLyrics;
