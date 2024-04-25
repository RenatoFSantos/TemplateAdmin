import useAppData from "@/data/hook/useAppData";
import BotaoTema from "./BotaoTema";
import Titulo from "./Titulo";
import AvatarUsuario from "./AvatarUsuario";
import useAuth from "@/data/hook/useAuth";

interface CabecalhoProps {
  titulo: string;
  subtitulo: string;
}

export default function Cabecalho(props: CabecalhoProps) {
  const { tema, alternarTema } = useAppData();
  const { usuario, carregando } = useAuth();
  console.log("Cabecalho = ", usuario.email);
  console.log("Cabecalho = ", usuario.photoURL);
  console.log("Cabecalho Imagem = ", usuario.imagemUrl);
  return (
    <div className={`flex items-center`}>
      <Titulo
        titulo={props.titulo}
        subtitulo={props.subtitulo}
      />
      <div className={`flex flex-grow justify-end`}>
        <BotaoTema
          tema={tema ?? ""}
          alternarTema={alternarTema}
        />
        <AvatarUsuario src={usuario.photoURL} />
      </div>
    </div>
  );
}
