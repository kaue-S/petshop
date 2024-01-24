import Head from "next/head";
import styled from "styled-components";
import ListaPosts from "@/components/ListasPosts";
import { useState } from "react";
import serverApi from "./api/server";

export async function getStaticProps() {
  console.log("Código de servidor (não aparece no cliente...)");
  try {
    const resposta = await fetch(`${serverApi}/posts`);
    const dados = await resposta.json();

    if (!resposta.ok) {
      throw new error(`erro: ${resposta.status} - ${resposta.statusText}`);
    }

    //extraindo as categorias dos posts para um novo array
    const categorias = dados.map((post) => post.categoria);
    console.log(categorias);

    const categoriasUnicas = [...new Set(categorias)];
    console.log(categoriasUnicas);

    return {
      props: {
        posts: dados,
        categorias: categoriasUnicas,
      },
    };
  } catch (error) {
    console.error("Deu ruim: " + error.message);
    return {
      notFound: true,
    };
  }
}

export default function Home({ posts, categorias }) {
  console.log(categorias);
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
        <div>
          {categorias.map((categoria) => {
            return <button>{categoria}</button>;
          })}
        </div>
        <ListaPosts posts={listaDePosts} />
      </StyledHome>
    </>
  );
}

const StyledHome = styled.section`
  h2::before {
    content: "📰 ";
  }

  button {
    background-color: #5454a3;
    padding: 8px;
    border-radius: 5px;
    border-style: none;
    justify-content: center;
    margin-left: 15px;
    margin-bottom: 10px;
    color: white;
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
    &:hover {
      transform: scale(1.1);
    }
  }
`;
