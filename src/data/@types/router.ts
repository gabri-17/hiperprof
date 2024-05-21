import { Router } from "@routes/Routes";

/**
 * Criação de um tipo com todos os objetos das rotas para pegar os tipos de  suas chaves.
 */
type RouterType = typeof Router;

export type RouterTypeof= keyof RouterType;