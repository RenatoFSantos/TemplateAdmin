import Link from "next/link";

interface MenuItemProps {
  texto: string;
  icone: any;
  url?: string;
  className?: string;
  onClick?: (evento: any) => void;
}

export default function MenuItem(props: MenuItemProps) {
  function renderizarConteudo() {
    return (
      <a
        className={`flex flex-col justify-center items-center h-20 w-20 ${props.className}`}
        href={props.url}
      >
        {props.icone}
        <span className={`text-xs font-light text-white-600`}>
          {props.texto}
        </span>
      </a>
    );
  }
  return (
    <li
      onClick={props.onClick}
      className={`hover:bg-gray-300 hover:text-black dark:hover:text-black dark:hover:bg-gray-300 m-2 cursor-pointer`}
    >
      {props.url ? (
        <Link
          legacyBehavior
          href={props.url}
        >
          {renderizarConteudo()}
        </Link>
      ) : (
        renderizarConteudo()
      )}
    </li>
  );
}
