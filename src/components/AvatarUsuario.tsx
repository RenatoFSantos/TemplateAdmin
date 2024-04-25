import useAuth from "@/data/hook/useAuth";
import Image from "next/image";
import Link from "next/link";

interface AvatarUsuarioProps {
  className?: string;
  src: string;
}

export default function AvatarUsuario(props: AvatarUsuarioProps) {
  console.log("Valor da imagem=", props.src);
  return (
    <Link href="/perfil">
      <Image
        className={`ml-2 cursor-pointer rounded-full ${props.className}`}
        src={props.src ?? "/user.png"}
        width={32}
        height={32}
        alt="Avatar do usuário"
      />
    </Link>
  );
}
