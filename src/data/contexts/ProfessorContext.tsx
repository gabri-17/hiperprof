import { ProfessorInterface } from "@data/@types/professor";
import { getUser } from "@data/services/MeService";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

interface ProfessorReducerInterface {
  ProfessorState: ProfessorInterface | undefined;
  ProfessorDispatch: Dispatch<SetStateAction<ProfessorInterface | undefined>>;
}

const initialValue: ProfessorReducerInterface = {
  ProfessorDispatch: () => {},
  ProfessorState: undefined,
};

/* Definir os valores que serão criados dentro do contexto (é sempre interessante ter duas situações: o valor do contexto(que
é o próprio valor do objeto em si) e a função que vai servir para atualizar esse objeto).*/
export const ProfessorContext =
  createContext(
    initialValue
  ); /* O contexto, basicamente, vai armazenar os dados em memória e vai ter
estes dois valores iniciais: ProfessorDispatch (a função para atualizar) e ProfessorState (os próprios dados do professor).*/

export const ProfessorProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [professor, setProfessor] = useState<ProfessorInterface>();
  useEffect(() => {
    getUser().then(({ data }) => {
      /* se estiver logado, vai conseguir capturar o professor e por consquência vai 
      conseguir fazer o login.*/
      setProfessor(data);
    });
  }, []);
  return (
    <ProfessorContext.Provider
      value={{ ProfessorState: professor, ProfessorDispatch: setProfessor }}
    >
      {children}
    </ProfessorContext.Provider>
  );
};
