import { useState } from "react";
import { LyricsJSON } from "./types";
import { formatLyrics } from "./lib/FormatLyrics";
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
    <div className="container mx-auto p-6">
      <nav>
        <h1 className="search-title">Search For Lyrics</h1>
        <form onSubmit={handleSubmit} className="flex w-full mx-auto gap-6">
          <SearchField
            classes="border-slate-300 rounded-xl p-4 border-2 w-full text-2xl text-black"
            name="artist"
            placeholder="Artist Name"
            required
          />
          <SearchField
            classes="border-slate-300 rounded-xl p-4 border-2 w-full text-2xl text-black"
            name="song"
            placeholder="Song Title"
            required
          />
          <input
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded cursor-pointer"
            type="submit"
            value={isLoading ? "SEARCHING..." : "SEARCH"}
            disabled={isLoading}
          />
        </form>
      </nav>
      <main>
        <section className="w-full mx-auto text-center py-10 flex flex-col gap-1 text-xl">
          {lyricData.lyrics && formatLyrics(lyricData.lyrics)}
          {lyricData.error}
        </section>
      </main>
    </div>
  );
}

export default App;
