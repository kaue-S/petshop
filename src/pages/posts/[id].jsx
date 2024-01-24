import Container from "@/components/ui/Container";
import styled from "styled-components";
import Head from "next/head";
import serverApi from "../api/server";

export async function getStaticProps({ params }) {
  //Utilizamos a prop params do gestaticprops para poder ter acesso aos parâmetros dinâmicos da rota configurada nos links da lista de posts. usamos a desestruturação para obter de forma direta o parâmetro chamado "id"
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
    return {
      notFound: true,
    };
  }
}

// getstaticpaths é obrigatória quando se trata de trabalhar com páginas dinâmicas, ou seja, que dependem de parâmetros para serem construidas.
export async function getStaticPaths() {
  return {
    // paths fica vazio pois todos os caminhos devem ser gerados sob demanda, ou seja no momento em que a página for aberta.
    paths: [],

    // fallback fica como "blocking" para garantir que a página somente será renderizada após a conclusão da geração dos caminhos e dos dados estáticos.
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
