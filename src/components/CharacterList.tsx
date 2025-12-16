import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Loader from "./Loader";
import styled from "styled-components";
import ButtonIcon from "../ui/ButtonIcon";
import Character from "./Character";
import type { CharacterType } from "../types/CharacterType";

const CharacterListContainer = styled.div`
  width: 45%;
  max-height: 660px;
  overflow-y: scroll;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    opacity: 0;
    visibility: hidden;
    border-radius: 5px;
    background-color: #9ca3af;
  }
  &:hover::-webkit-scrollbar-thumb {
    opacity: 1;
    visibility: visible;
  }

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

interface CharacterListProps {
  characters: CharacterType[];
  isLoading: boolean;
  onSelectedCharacter: (id: number) => void;
  selectedId: number | null;
}

function CharacterList({
  characters,
  isLoading,
  onSelectedCharacter,
  selectedId,
}: CharacterListProps) {
  if (isLoading) {
    return (
      <CharacterListContainer>
        <Loader />
      </CharacterListContainer>
    );
  }

  return (
    <CharacterListContainer>
      {characters.map((item) => (
        <Character key={item.id} item={item}>
          <ButtonIcon onClick={() => onSelectedCharacter(item.id)}>
            {selectedId === item.id ? <EyeSlashIcon /> : <EyeIcon />}
          </ButtonIcon>
        </Character>
      ))}
    </CharacterListContainer>
  );
}

export default CharacterList;
