/* eslint-disable @next/next/no-img-element */
import AuthInput from "@/components/auth/AuthInput";
import { IconWarning } from "@/components/icons";
import useAuth from "@/data/hook/useAuth";
import Image from "next/image";
import route from "next/router";
import { useState } from "react";

export default function Autenticacao() {
  const { Cadastrar, Login, usuario, LoginGoogle } = useAuth();

  const [modo, setModo] = useState<"login" | "cadastro" | "google">("login");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function exibirErro(msg: any, tempoEmSegundos = 5) {
    setErro(msg);
    setTimeout(() => setErro(""), tempoEmSegundos * 1000);
  }

  async function logar() {
    const result = await Login(email, senha);
    if (result.success) {
      route.push("/");
    } else {
      exibirErro(result.error);
    }
  }

  async function logarGoogle() {
    const result = await LoginGoogle();
    if (result.success) {
      route.push("/");
    } else {
      exibirErro(result.error);
    }
  }

  async function cadastrarUsuario() {
    const result = await Cadastrar(email, senha);
    if (result.success) {
      route.push("/");
    } else {
      exibirErro(result.error);
    }
  }

  return (
    <div className={`flex h-screen items-center justify-center`}>
      <div className={`hidden md:block md:w-1/2 lg:w-2/3 `}>
        <img
          src="https://source.unsplash.com/random"
          alt="Imagem da tela de autenticação"
          className={`h-screen w-full object-cover`}
        />
      </div>
      <div className={`w-full md:w-1/2 m-5 lg:m-7 lg:w-1/3`}>
        <h1 className={`text-2xl font-bold mb-5`}>
          {modo === "login" || modo === "google"
            ? "Entre com sua conta"
            : "Cadastre-se na plataforma"}
        </h1>
        {erro ? (
          <div
            className={`flex items-center justify-start py-3 px-5 my-2 bg-red-400 border border-red-500 rounded-lg text-white`}
          >
            {IconWarning(6)}
            <span className={`ml-2`}>{erro}</span>
          </div>
        ) : (
          false
        )}
        <AuthInput
          label="Email"
          tipo="text"
          valor={email}
          valorMudou={setEmail}
          obrigatorio
          password={false}
        />
        <div className={`flex justify-between items-center`}>
          <AuthInput
            styles="grow"
            label="Senha"
            tipo="password"
            valor={senha}
            valorMudou={setSenha}
            obrigatorio
            password={true}
          />
        </div>
        <button
          onClick={() => {
            console.log("cliquei no Entrar/Cadastrar");
            modo === "login" ? logar() : cadastrarUsuario();
          }}
          className={`w-full bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg px-4 py-3 mt-6`}
        >
          {modo === "login" || modo === "google" ? "Entrar" : "Cadastrar"}
        </button>
        <hr className="my-6 border-gray-300 w-full" />
        <button
          onClick={logarGoogle}
          className={`flex justify-center w-full bg-gray-300 text-gray-700 hover:bg-gray-200 hover:text-white rounded-lg px-4 py-3`}
        >
          <Image
            className={`mr-2`}
            src="/google.svg"
            width={24}
            height={24}
            alt="google"
          />
          Entrar com o Google
        </button>
        {modo === "login" ? (
          <p className="mt-8">
            Novo por aqui?
            <a
              onClick={() => setModo("cadastro")}
              className={`text-blue-500 hover:text-blue-700 font-semibold cursor-pointer`}
            >
              &nbsp;Crie uma conta gratuitamente!
            </a>
          </p>
        ) : (
          <p className="mt-8">
            Já faz parte da nossa comunidade?
            <a
              onClick={() => setModo("login")}
              className={`text-blue-500 hover:text-blue-700 font-semibold cursor-pointer`}
            >
              &nbsp;Entre com suas credenciais!
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
