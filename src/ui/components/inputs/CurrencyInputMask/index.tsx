import { TextFormatService } from "@data/services/TextFormatService";
import { TextField, TextFieldProps } from "@mui/material";
import { ChangeEvent } from "react";

function changeFormatter(event: ChangeEvent<{ value: string }>) {
  /**
   A função changeFormatter recebe um evento de mudança (ChangeEvent) que contém um objeto com a 
   propriedade value do tipo string.

    1. Verificação do Evento:

    - Primeiro, verifica se o evento possui um alvo (target). Se não tiver, a função encerra.

    2. Obtenção do Valor:

    - Em seguida, obtém o valor do evento.

    3.Transformação em Lista de Dígitos:

    - O valor é transformado em uma lista de dígitos, onde cada dígito é um elemento da lista. 
    Por exemplo, o valor '10.50' seria transformado em ['1', '0', '.', '5', '0'].
    - Isso é feito dividindo a string em caracteres individuais, filtrando apenas os dígitos, e 
    então juntando-os novamente. Além disso, é adicionado um zero à esquerda se necessário para 
    garantir que haja pelo menos dois dígitos após o ponto decimal.

    4. Conversão para Número de Ponto Flutuante:

    - Em seguida, a lista de dígitos é convertida em um número de ponto flutuante. Por exemplo, a 
    lista ['1', '0', '.', '5', '0'] seria convertida em 10.50.

    5. Atualização do Valor do Evento:

    - Por fim, o valor do evento é atualizado com o resultado da formatação do número de ponto 
    flutuante como uma moeda, utilizando um serviço chamado TextFormatService.currency.
   */
  if (!event.target) return;
  const value = event.target.value;

  // '10.50' => transformar em uma lista ['1','0','.','5','0']
  const onlyDigitals =
    // Dar um console.log() em cada uma das condições para entender.
    value
      .split("")
      .filter((s) => /\d/.test(s))
      .join("")
      .padStart(2, "0");

  const digitalsFloat =
    // Dar um console.log() em cada uma das condições para entender.
    onlyDigitals.slice(0, -2) +
    "." +
    // Dar um console.log() em cada uma das condições para entender.
    onlyDigitals.slice(-2);
  // Dar um console.log() em cada uma das condições para entender.
  event.target.value = TextFormatService.currency(digitalsFloat);
}

export default function CurrencyInputMask(props: TextFieldProps) {
  return (
    <TextField
      onInput={(e) => changeFormatter(e as ChangeEvent<any>)}
      {...props}
    />
  );
}
