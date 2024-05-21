import { PropsWithChildren } from "react";
import { BoxStyled } from "./styles";

interface ButtonFileProps {
  // ? : não é obrigatório.
  // Função que vai receber uma lista de arquivos.
  onChange?: (files: FileList) => void;
}

// Componente passando os filhos.
// Children vai servir como base para colocar outras coisas.
export default function ButtonFile({
  children,
  onChange,
}: PropsWithChildren<ButtonFileProps>) {
  return (
    <BoxStyled>
      <label>
        <input
          type={"file"}
          style={{ width: "100px" }}
          onChange={({ target: { files } }) => {
            // Verificar se pegou de fato algum arquivo.
            if (files !== null && files.length) {
                // ! : garantir para o typescript que não é undefined.
                // colocar . para fazer funcionar o ? do onChange.
              onChange?.(files);
            }
          }}
        />

        {children}
      </label>
    </BoxStyled>
  );
}
