import Usuario from "@/model/Usuario";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { auth } from "@/firebase/config";
import {
  GoogleAuthProvider,
  User,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { iResultHttp } from "@/interface/iResultHttp";

interface AuthContextProps {
  usuario?: Usuario;
  carregando?: boolean;
  LoginGoogle?: () => Promise<iResultHttp>;
  Login?: (email: string, senha: string) => Promise<iResultHttp>;
  Cadastrar?: (email: string, senha: string) => Promise<iResultHttp>;
  Logout?: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({});

async function usuarioNormalizado(usuarioFirebase: User): Promise<Usuario> {
  const token = await usuarioFirebase.getIdToken();
  return {
    uid: usuarioFirebase.uid,
    nome: usuarioFirebase.displayName ?? "",
    email: usuarioFirebase.email ?? "",
    token,
    provedor: usuarioFirebase.providerData[0]?.providerId ?? "",
    imagemUrl: usuarioFirebase.photoURL ?? "",
  };
}

function gerenciarCookie(logado: boolean) {
  if (logado) {
    Cookies.set("admin-template-auth", logado.toString(), {
      expires: 7, // in days
    });
  } else {
    Cookies.remove("admin-template-auth");
  }
}

export function AuthProvider(props: any) {
  const [carregando, setCarregando] = useState(false);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    console.log("useEffect 1");
    if (Cookies.get("admin-template-auth")) {
      const cancelar = auth.onIdTokenChanged(configurarSessao);
      return () => cancelar();
    }
  }, []);

  useEffect(() => {
    console.log("useEffect 2");
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Usuário corrente=", currentUser);
      setUsuario(currentUser);
    });
    return () => unsubscribe();
  }, [usuario]);

  async function configurarSessao(usuarioFirebase: any) {
    if (usuarioFirebase?.email) {
      const usuario = await usuarioNormalizado(usuarioFirebase);
      console.log("Valor do usuário da sessao=", usuario.email);
      setUsuario(usuario);
      gerenciarCookie(true);
      setCarregando(false);
      return usuario.email;
    } else {
      console.log("Limpando Usuário");
      setUsuario(undefined);
      gerenciarCookie(false);
      setCarregando(false);
      return false;
    }
  }

  async function LoginGoogle(): Promise<iResultHttp> {
    console.log("Vou logar no google");
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    return new Promise(async (resolve) => {
      try {
        const res = await signInWithPopup(auth, provider);
        if (res) {
          await configurarSessao(res.user);
          const usuario = await usuarioNormalizado(res.user);
          resolve({ success: true, data: usuario, error: undefined });
        }
      } catch (error: any) {
        resolve({ success: false, data: undefined, error: error.code });
      } finally {
        setCarregando(false);
      }
    });
  }

  async function Login(email: string, senha: string): Promise<iResultHttp> {
    console.log("Vou logar com email e senha= ", email, senha);
    if (email && senha) {
      return new Promise(async (resolve) => {
        try {
          console.log("Tentando logar=", email, senha);
          const res = await signInWithEmailAndPassword(auth, email, senha);
          if (res) {
            setCarregando(false);
            await configurarSessao(res.user);
            const usuario = await usuarioNormalizado(res.user);
            resolve({ success: true, data: usuario, error: undefined });
          }
        } catch (error: any) {
          console.log("Deu erro=", error);
          setCarregando(false);
          resolve({ success: false, data: undefined, error: error.code });
        }
      });
    }
  }

  async function Cadastrar(email: string, senha: string): Promise<iResultHttp> {
    return new Promise(async (resolve) => {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, senha);
        if (res.user) {
          await configurarSessao(res.user);
          const usuario = await usuarioNormalizado(res.user);
          resolve({ success: true, data: usuario, error: undefined });
        }
      } catch (error: any) {
        resolve({ success: false, data: undefined, error: error.code });
      } finally {
        setCarregando(false);
      }
    });
  }

  async function Logout() {
    try {
      setCarregando(true);
      signOut(auth);
      await configurarSessao(undefined);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        carregando,
        Login,
        Cadastrar,
        LoginGoogle,
        Logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
