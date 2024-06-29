import { useState, useRef } from "react";
import { LyricsJSON } from "./types";
import { TextGenerateEffect } from "./components/ui/TextGenerateEffect";
import { SearchField } from "./components/SearchField";
import { InterpretLyrics } from "./components/MagicBall/InterpretLyrics";
import { Loading } from "./components/Loading/Loading";
import { formatLyrics } from "./lib/FormatLyrics";
import SearchLyrics from "./lib/SearchLyrics";

function App() {
  const form = useRef<HTMLFormElement>(null);
  const [isLoading, setLoading] = useState(false);
  const [lyricData, setLyrics] = useState<LyricsJSON>({
    lyrics: "",
    error: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setLyrics({ lyrics: "", error: "" });
    const formData = new FormData(form.current!);
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
        <h1 className="search-title">
          <TextGenerateEffect words={"Search For Song Lyrics"} />
        </h1>
        <form
          ref={form}
          onSubmit={handleSubmit}
          className="flex w-full mx-auto gap-6"
        >
          <SearchField
            classes="rounded-xl p-4 w-full text-2xl text-black"
            name="artist"
            placeholder="Artist Name"
            required
          />
          <SearchField
            classes="rounded-xl p-4 w-full text-2xl text-black"
            name="song"
            placeholder="Song Title"
            required
          />
          <input
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded-xl cursor-pointer"
            type="submit"
            value={isLoading ? "SEARCHING..." : "SEARCH"}
            disabled={isLoading}
          />
        </form>
      </nav>
      <main>
        <section className="w-full mx-auto text-center py-10 flex flex-col gap-1 text-xl">
          <div className="mx-auto mt-12 text-white">
            {isLoading && <Loading />}
          </div>
          {lyricData.lyrics && formatLyrics(lyricData.lyrics)}
          {lyricData.error && (
            <span className="text-4xl">{lyricData.error} ☹️</span>
          )}
        </section>
        <InterpretLyrics />
      </main>
    </div>
  );
}

export default App;
