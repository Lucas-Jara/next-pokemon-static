import { Button, Card, Container, Grid, Text } from "@nextui-org/react";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { FC, useState } from "react";
import { pokeApi } from "../../api";
import { Layout } from "../../components/layouts";
import { Pokemon } from "../../interfaces";
import { getPokemonInfo, localFavorites } from "../../utils";
import confetti from "canvas-confetti";
import { PokemonListResponse } from "../../interfaces/pokemon-list";

interface Props {
  pokemon: Pokemon;
}
export const PokemonByNamePage: FC<Props> = ({ pokemon }) => {
  const [isInFavorites, setIsInFavorites] = useState(
    localFavorites.existInFavorites(pokemon.id)
  );

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsInFavorites(!isInFavorites);

    if (isInFavorites) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0,
      },
    });
  };

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        <Grid xs={6} sm={4}>
          <Card hoverable css={{ margin: "20px 0px" }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world?.front_default ||
                  "/no-image.png"
                }
                width={140}
                height={140}
                alt={pokemon.name}
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={15} sm={8}>
          <Card>
            <Card.Header
              css={{ display: "flex", justifyContent: "space-between" }}
            >
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>
              <Button
                onClick={onToggleFavorite}
                color="gradient"
                ghost={!isInFavorites}
              >
                {isInFavorites ? "Quitar de favoritos" : "Guardar en favoritos"}
              </Button>
            </Card.Header>

            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container direction="row" display="flex" gap={0}>
                <Image
                  src={pokemon.sprites.front_default || "/no-image.png"}
                  width="100%"
                  height={140}
                  alt={pokemon.name}
                />
                <Image
                  src={pokemon.sprites.back_default || "/no-image.png"}
                  width="100%"
                  height={140}
                  alt={pokemon.name}
                />
                <Image
                  src={pokemon.sprites.front_shiny || "/no-image.png"}
                  width="100%"
                  height={140}
                  alt={pokemon.name}
                />
                <Image
                  src={pokemon.sprites.back_shiny || "/no-image.png"}
                  width="100%"
                  height={140}
                  alt={pokemon.name}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");

  const pokemonNames: string[] = data.results.map((pokemon) => pokemon.name);

  return {
    paths: pokemonNames.map((name) => ({
      params: { name },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };

  return {
    props: {
      pokemon: await getPokemonInfo(name),
    },
  };
};

export default PokemonByNamePage;
