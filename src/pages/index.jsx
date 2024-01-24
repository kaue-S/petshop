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
  // const [categoria, setCategoria] = useState(null);

  const filtrar = (event) => {
    const categoriaEscolhida = event.currentTarget.textContent;

    const novaListaDePosts = posts.filter(
      (post) => post.categoria === categoriaEscolhida
    );

    setListaDePosts(novaListaDePosts);
  };

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
        <StyledCategorias>
          {categorias.map((categoria, indice) => {
            return (
              <button onClick={filtrar} key={indice}>
                {categoria}
              </button>
            );
          })}
        </StyledCategorias>
        <ListaPosts posts={listaDePosts} />
      </StyledHome>
    </>
  );
}

const StyledCategorias = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 1rem 0;
  flex-wrap: wrap;

  button {
    border: none;
    background-color: var(--cor-secundaria-fundo);
    color: #f7f7f7;
    padding: 0.5rem;
    border-radius: var(--borda-arredondada);
    text-transform: capitalize;

    &:hover,
    &focus {
      background-color: var(--cor-secundaria-fundo-hover);
      cursor: pointer;
    }
  }
`;

const StyledHome = styled.section`
  h2::before {
    content: "📰 ";
  }
`;
