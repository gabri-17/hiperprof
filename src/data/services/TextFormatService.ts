const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export const TextFormatService = {
  currency(valor: string | undefined | number): string {
    if (!valor) return "";
    // !: garantir que o valor não pode ser nulo.
    let price: number = +valor!; // +: tentar executar a conversão da string em número.
    if (isNaN(price)) {
      // forma para verificar se o valor é um número.
      price = 0;
    }
    return currencyFormatter.format(price); // retornar o preço em formato de string.
  },
};
