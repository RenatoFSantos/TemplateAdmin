import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface AuthInputProps {
  label: string;
  valor: any;
  obrigatorio?: boolean;
  naoRenderizarQuando?: boolean;
  tipo: string;
  valorMudou: (novoValor: any) => void;
  styles?: string;
  password: boolean;
}

export default function AuthInput(props: AuthInputProps) {
  const [icon, setIcon] = useState("");
  const changeIcon = (eye: any) => {
    if (eye === "close") {
      document.querySelector("input").type = "text";
      return "open";
    }
    return "close";
  };

  return props.naoRenderizarQuando ? null : (
    <div className={`flex flex-col text-gray-800 mt-4 ${props.styles}`}>
      <label>{props.label}</label>
      <div className={`flex justify-between items-center`}>
        <input
          type={
            props.password && icon === "open"
              ? "text"
              : props.password
              ? "password"
              : "text"
          }
          value={props.valor}
          onChange={(e) => props.valorMudou?.(e.target.value)}
          className={`flex-grow px-4 py-3 bg-gray-300 mt-2 border focus:border-blue-500 focus:outline-none focus:bg-white ${
            props.password ? "rounded-l-lg" : "rounded-lg"
          }`}
        />
        {props.password ? (
          <div
            onClick={() => setIcon((old) => changeIcon(old))}
            className={`bg-gray-300 px-2 py-3 mt-2 cursor-pointer rounded-r-lg`}
          >
            {icon === "open" ? (
              <AiOutlineEye size={24} />
            ) : (
              <AiOutlineEyeInvisible size={24} />
            )}
          </div>
        ) : (
          false
        )}
      </div>
    </div>
  );
}
