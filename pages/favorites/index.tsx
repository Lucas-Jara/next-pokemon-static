import { useEffect, useState } from "react";
import { Layout } from "../../components/layouts";
import { FavoritesPokemons } from "../../components/pokemon";
import { NoFavorites } from "../../components/ui";
import { localFavorites } from "../../utils";

const favorites = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [favoritesPokemons, setFavoritesPokemons] = useState<number[]>([]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setFavoritesPokemons(localFavorites.pokemons());
  }, []);

  return (
    <Layout title="Favorites Pokemons">
      {favoritesPokemons.length < 0 ? (
        <NoFavorites />
      ) : (
        <FavoritesPokemons pokemons={favoritesPokemons} />
      )}
    </Layout>
  );
};

export default favorites;
