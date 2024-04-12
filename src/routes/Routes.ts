import { NextRouter } from "next/router";

export const Router = {
    home: {
        name: "/",
        push: function (router: NextRouter){
            // this: se refere ao objeto home.
            router.push({pathname: this.name}); //this.name: equivalente a passar '/'.
        },
        icon: "",
    },
    pesquisaProfessor: {
        name: "/pesquisa-professor",
        push: function (router: NextRouter, search?: string){
            router.push({pathname:this.name, query: {search}});
        },
        icon: "",
    },
    detalheProfessor: {
        name: "/professor/detalhe-professor",
        push: function (router: NextRouter, search: string){
            router.push({pathname:this.name , query: {search}});
        },
        icon: "",
    },
    cadastroProfessor: {
        name: "/professor/cadastro-professor",
        push: function (router: NextRouter){
            router.push({pathname:this.name });
        },
        icon: "",
    },
    
};