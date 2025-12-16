import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "./Loader";
import CharacterInfo from "./CharacterInfo";
import CharacterEpisodes from "./CharacterEpisodes";
import type { CharacterType } from "../types/CharacterType";
import type { EpisodeType } from "../types/episodesType";

interface CharacterDetailProps {
  selectedId: number | null;
  onAddFavourite: (char: CharacterType) => void;
  isAddedToFavourites: boolean;
}

function CharacterDetail({
  selectedId,
  onAddFavourite,
  isAddedToFavourites,
}: CharacterDetailProps) {
  const [character, setCharacter] = useState<CharacterType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [episodes, setEpisodes] = useState<EpisodeType[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        const { data } = await axios.get<CharacterType>(
          `https://rickandmortyapi.com/api/character/${selectedId}`
        );
        setCharacter(data);

        const episodesId = data.episode.map((e) => e.split("/").at(-1));
        const { data: episodesData } = await axios.get<EpisodeType[]>(
          `https://rickandmortyapi.com/api/episode/${episodesId}`
        );
        setEpisodes([episodesData].flat());
      } catch (error: any) {
        toast.error(error.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }

    if (selectedId) fetchData();
  }, [selectedId]);

  if (isLoading)
    return (
      <div style={{ flex: 1 }}>
        <Loader />
      </div>
    );

  if (!character || !selectedId)
    return (
      <div style={{ flex: 1, color: "var(--slate-300)", padding: "1rem" }}>
        Please selecte a character .
      </div>
    );

  return (
    <div style={{ flex: 1 }}>
      <CharacterInfo
        character={character}
        onAddFavourite={onAddFavourite}
        isAddedToFavourites={isAddedToFavourites}
      />
      <CharacterEpisodes episodes={episodes} />
    </div>
  );
}
export default CharacterDetail;
