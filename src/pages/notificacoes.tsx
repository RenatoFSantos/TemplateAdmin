import { Inter } from "next/font/google";
import Layout from "../components/Layout";
import useAppData from "@/data/hook/useAppData";

const inter = Inter({ subsets: ["latin"] });

export default function Notificacoes() {
  const { alternarTema } = useAppData();

  return (
    <Layout
      titulo="Notificações"
      subtitulo="Aqui você irá gerenciar as suas notificações!"
    ></Layout>
  );
}
