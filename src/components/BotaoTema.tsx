import { IconMoon, IconSun } from "./icons";

interface BotaoTemaProps {
  tema: string | undefined;
  alternarTema?: () => void;
}
export default function BotaoTema(props: BotaoTemaProps) {
  return props.tema === "dark" ? (
    // botao CLARO
    <div
      className={`hidden sm:flex items-center cursor-pointer p-1 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-600 w-14 lg:w-24 h-8`}
      onClick={props.alternarTema}
    >
      <div
        className={`flex justify-center items-center w-6 h-6 rounded-full bg-white text-yellow-600`}
      >
        {IconSun(5)}
      </div>
      <div className="hidden lg:flex items-center ml-1 text-white">
        <span>Claro</span>
      </div>
    </div>
  ) : (
    // botao ESCURO
    <div
      className={`hidden sm:flex justify-center items-center cursor-pointer p-1 rounded-full bg-gradient-to-r from-gray-500 to-gray-900 w-14 lg:w-24 h-8`}
      onClick={props.alternarTema}
    >
      <div className="hidden lg:flex items-center mr-1 text-white">
        <span>Escuro</span>
      </div>
      <div
        className={`flex justify-center items-center w-6 h-6 rounded-full bg-black text-yellow-300`}
      >
        {IconMoon(5)}
      </div>
    </div>
  );
}
