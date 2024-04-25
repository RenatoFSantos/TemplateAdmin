import Image from "next/image";
import Head from "next/head";
import loading from "../../public/loading.gif";
import router from "next/router";
import { useEffect } from "react";
import useAuth from "@/data/hook/useAuth";

export default function ForcarAutenticacao(jsx: any) {
  const { usuario, carregando } = useAuth();
  console.log("Email do usuario=", usuario?.email);

  function renderizarConteudo() {
    return (
      <>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
            if(!document.cookie?.includes("admin-template-auth")) {
              window.location.href = '/autenticacao'
            }
          `,
            }}
          />
        </Head>
        {jsx}
      </>
    );
  }

  function renderizarCarregando() {
    return (
      <div className={`flex justify-center items-center h-screen`}>
        <Image
          src={loading}
          alt="Loading"
        />
      </div>
    );
  }

  console.log(
    `forçar autenticação Carregando=${carregando}, e Usuário=${usuario?.email}`
  );

  useEffect(() => {
    if (!carregando && usuario?.email) {
      console.log("renderizando conteúdo...");
      renderizarConteudo();
    } else if (carregando) {
      console.log("renderizando carregando...");
      renderizarCarregando();
    } else {
      router.push("/autenticacao");
    }
  }, []);
}
