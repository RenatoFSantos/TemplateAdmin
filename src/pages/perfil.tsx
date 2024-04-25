import { Inter } from "next/font/google";
import Layout from "../components/Layout";

const inter = Inter({ subsets: ["latin"] });

export default function Perfil() {
  return (
    <Layout
      titulo="Perfil do Usuário"
      subtitulo="Administre as suas informações!"
    >
      <h1>Perfil do Usuário</h1>
    </Layout>
  );
}
