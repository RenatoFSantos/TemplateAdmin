import { Inter } from "next/font/google";
import Layout from "../components/Layout";

const inter = Inter({ subsets: ["latin"] });

export default function Ajustes() {
  return (
    <Layout
      titulo="Ajustes & Configurações"
      subtitulo="Personalize o sistema por aqui!"
    >
      <h3>Ajustes</h3>
    </Layout>
  );
}
