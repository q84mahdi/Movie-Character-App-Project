import { Toaster } from "react-hot-toast";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar from "./components/Navbar";
import { useState } from "react";
import useCharacters from "./hooks/useCharacters";
import useLocalStorage from "./hooks/useLocalStorage";
import GlobalStyles from "./styles/globalStyles";
import styled from "styled-components";
import type { CharacterType } from "./types/CharacterType";

const MainHandler = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 2rem;

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { characters, isLoading } = useCharacters(searchValue);
  const [favourites, setFavourites] = useLocalStorage<CharacterType[]>(
    "Favourits",
    []
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const handleSelectedCharacter = (id: number) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  const handleAddFavourite = (char: CharacterType) => {
    setFavourites((prevFav) => [...prevFav, char]);
  };

  const handleDeleteFavourite = (id: number) => {
    setFavourites((prevFav) => prevFav.filter((fav) => fav.id !== id));
  };

  const isAddedToFavourites =
    (selectedId && favourites.map((fav) => fav.id).includes(selectedId)) ||
    false;

  return (
    <div className="app">
      <GlobalStyles />

      <Toaster />

      <Navbar
        numOfResult={characters.length}
        searchValue={searchValue}
        onSearch={handleSearch}
        favourites={favourites}
        onDeleteFavourite={handleDeleteFavourite}
      />

      <MainHandler>
        <CharacterList
          characters={characters}
          isLoading={isLoading}
          onSelectedCharacter={handleSelectedCharacter}
          selectedId={selectedId}
        />

        <CharacterDetail
          selectedId={selectedId}
          onAddFavourite={handleAddFavourite}
          isAddedToFavourites={isAddedToFavourites}
        />
      </MainHandler>
    </div>
  );
}

export default App;
