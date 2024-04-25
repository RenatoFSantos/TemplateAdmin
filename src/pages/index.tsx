import { Inter } from "next/font/google";
import Layout from "../components/Layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Layout
      titulo="Página Inicial"
      subtitulo="Estamos construindo um template administrativo."
    >
      <h3>Novo conteúdo - children</h3>
    </Layout>
  );
}
