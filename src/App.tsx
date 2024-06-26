import { useState } from "react";
import { LyricsJSON } from "./types";
import { SearchField } from "./components/SearchField";
import SearchLyrics from "./lib/SearchLyrics";

function App() {
  const [isLoading, setLoading] = useState(false);
  const [lyricData, setLyrics] = useState<LyricsJSON>({
    lyrics: "",
    error: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const [artist, song] = Array.from(formData.entries()).map(
      (value) => value[1] as string
    );

    const data = await SearchLyrics(artist, song);
    setLoading(false);
    setLyrics(data);
  };
  return (
    <div className="container mx-auto border-black border-2 p-6">
      <nav>
        <h1></h1>
        <form onSubmit={handleSubmit} className="flex w-full mx-auto gap-6">
          <SearchField name="artist" placeholder="Artist Name" required />
          <SearchField name="song" placeholder="Song Title" required />
          <input
            type="submit"
            value={isLoading ? "Wait" : "Go"}
            disabled={isLoading}
          />
        </form>
      </nav>
      <main>{Object.values(lyricData)}</main>
    </div>
  );
}

export default App;
