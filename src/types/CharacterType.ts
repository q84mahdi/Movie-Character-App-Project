export interface CharacterType {
  id: number;
  name: string;
  status: "Dead" | "Alive";
  species: "Human" | "Alien";
  type: string;
  gender: "Male" | "Female";
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}
