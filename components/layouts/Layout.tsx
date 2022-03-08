import { FC } from "react";

import Head from "next/head";
import { Navbar } from '../ui/Navbar';

interface Props {
    title?: string;
}

export const Layout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="author" content="Lucas Jara" />
        <meta name="description" content={`Información sobre el pokemon xxxxx ${title}`} />
        <meta name="keywords" content={`xxxxx, pokemon, pokedex ${title}`} />
      </Head>

      <Navbar />

      <main style={{
          padding: '0px 20px',
      }}>{children}</main>
    </>
  );
};
