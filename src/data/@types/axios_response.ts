export interface ResponseErrorInterface<T = unknown>{
    errors?: T; // ? : são opcionais.
    message: string;
}