import useAuth from "@/data/hook/useAuth";
import MenuItem from "./MenuItem";
import { IconBell, IconExit, IconHome, IconSettings } from "./icons";
import Logo from "./logo";

export default function MenuLateral() {
  const { Logout } = useAuth();
  return (
    <aside
      className={`flex flex-col dark:bg-gray-900 dark:text-gray-200 bg-gray-200 text-gray-900`}
    >
      <div
        className={`flex flex-col items-center justify-center p-2 bg-gradient-to-r from-indigo-500 via-blue-600 to-purple-800`}
      >
        <Logo></Logo>
      </div>
      <ul className={`flex-grow`}>
        <MenuItem
          url="/"
          texto="Início"
          icone={IconHome}
        />
        <MenuItem
          url="/ajustes"
          texto="Ajustes"
          icone={IconSettings}
        />
        <MenuItem
          url="/notificacoes"
          texto="Notificações"
          icone={IconBell}
        />
      </ul>
      <ul>
        <MenuItem
          texto="Saída"
          icone={IconExit}
          onClick={Logout}
          className={`text-red-600 hover:bg-red-400 hover:text-white`}
        />
      </ul>
    </aside>
  );
}
