import Head from "next/head";
import styled from "styled-components";
import ListaPosts from "@/components/ListasPosts";
import { useState } from "react";

export async function getStaticProps() {
  try {
    const resposta = await fetch(`http://10.20.46.29:4000/posts`);
    const dados = await resposta.json();

    if (!resposta.ok) {
      throw new error(`erro: ${resposta.status} - ${resposta.statusText}`);
    }

    return {
      props: {
        posts: dados,
      },
    };
  } catch (error) {
    console.error("Deu ruim: " + error.message);
  }
}

export default function Home({ posts }) {
  const [listaDePosts, setListaDePosts] = useState(posts);

  return (
    <>
      <Head>
        <title>PetShop</title>
        <meta
          name="description"
          content="Web App PetShop criado com Next.js como exemplo do curso Téc. Informática para Internet"
        />
        <meta name="keywords" content="PetShop, Banho, Ração, Gato, Cachorro" />
      </Head>
      <StyledHome>
        <h2>Pet Notícias</h2>
        <ListaPosts posts={listaDePosts} />
      </StyledHome>
    </>
  );
}

const StyledHome = styled.section`
  h2::before {
    content: "📰 ";
  }
`;
