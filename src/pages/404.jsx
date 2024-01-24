import Container from "@/components/ui/Container";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";

export default function Pagia404() {
  return (
    <>
      <Head>
        <title>Ops - PetShop</title>
      </Head>
      <Styled404>
        <h2>Au au au foi mal</h2>
        <Container>
          <h3>Ops! Algo deu arrado</h3>
          <Image
            src="/images/404.svg"
            width={500}
            height={296}
            alt="Ilustração de um cachorrinho bonitinho"
          />
        </Container>
      </Styled404>
    </>
  );
}

const Styled404 = styled.section`
  text-align: center;
  img {
    max-width: 100%;
  }
  h2::before {
    content: "😨 ";
  }
`;
