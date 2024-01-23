import Container from "@/components/ui/Container";
import styled from "styled-components";
import Head from "next/head";
import serverApi from "../api/server";

export async function getStaticProps({ params }) {
  const { id } = params;
  console.log(id);

  try {
    // const resposta = await fetch(`${serverApi}/posts/${id}`);
    const resposta = await fetch(`${serverApi}/posts/${id}`);

    if (!resposta.ok) {
      throw new error(`Erro: ${resposta.status} - ${resposta.statusText}`);
    }

    const dados = await resposta.json();

    return {
      props: {
        post: dados,
      },
    };
  } catch (error) {
    console.log("Deu ruim: " + error.message);
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export default function Post({ post }) {
  return (
    <>
      <Head>
        <title>{post.titulo} - PetShop</title>
        <meta name="description" content="Descrição do post..." />
      </Head>

      <StyledPost>
        <h2>{post.titulo}</h2>
        <Container>
          <h3>{post.categoria}</h3>
          <p>{post.descricao}</p>
        </Container>
      </StyledPost>
    </>
  );
}

const StyledPost = styled.article`
  h2::before {
    content: 📃;
  }
`;
