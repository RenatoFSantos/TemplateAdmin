import useAppData from "@/data/hook/useAppData";
import Cabecalho from "./Cabecalho";
import Conteudo from "./Conteudo";
import MenuLateral from "./MenuLateral";
import Rodape from "./Rodape";
import ForcarAutenticacao from "./auth/ForcarAutenticacao";

interface LayoutProps {
  titulo: string;
  subtitulo: string;
  children?: any;
}

export default function Layout(props: LayoutProps) {
  const { tema } = useAppData();

  return (
    <ForcarAutenticacao>
      <div className={`${tema} flex h-screen w-screen overflow-hidden`}>
        <MenuLateral />
        <div className={`flex flex-col bg-gray-300 dark:bg-gray-800 w-full`}>
          <div className={`p-7 flex-1  dark:text-white`}>
            <Cabecalho
              titulo={props.titulo}
              subtitulo={props.subtitulo}
            />
            <Conteudo>{props.children}</Conteudo>
          </div>
          <div className={`mb-0 font-light`}>
            <Rodape copyright="Copyright © 2023 - Midilabs - Mídias Digitais Ltda." />
          </div>
        </div>
      </div>
    </ForcarAutenticacao>
  );
}
