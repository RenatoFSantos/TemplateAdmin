import Image from "next/image";
import Head from "next/head";
import loading from "../../../public/loading.gif";
import useAuth from "@/data/hook/useAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ForcarAutenticacao(props: { children: any }) {
  const { usuario, carregando } = useAuth();
  const router = useRouter();
  console.log("Valor o usuário no Forçar Autenticação = ", usuario);

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
        {props.children}
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

  if (!carregando && usuario?.email) {
    console.log("renderizando conteúdo...");
    return renderizarConteudo();
  } else if (carregando) {
    console.log("renderizando carregando...");
    return renderizarCarregando();
  } else {
    if (typeof window === "undefined") return null;
    router.push("/autenticacao");
  }
}
