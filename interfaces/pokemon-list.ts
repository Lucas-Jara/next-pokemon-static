export interface PokemonListResponse {
    count:    number;
    next?:     string;
    previous?: String;
    results:  SmallPokemon[];
}

export interface SmallPokemon {
    name: string;
    url:  string;
    id: Number;
    img: string;
}
