import express from 'express'
import session from 'express-session'
import verificarAutenticado from './seguranca/autenticar.js';
import verificarUsuario from './seguranca/login.js';

let lista = [];

const app = express();
const porta = 3000;
const host = "0.0.0.0";

app.use(express.urlencoded({extended: true}));

app.use(session({
    secret:"minhachave",
    cookie:{
        maxAge: 1000 * 60 * 15,
        httpOnly: true
    },
    resave: true,
    saveUninitialized: false
}));

app.use(express.static("./publico"));

app.post("/login", (requisicao, resposta) => {
    const {usuario, senha} = requisicao.body;

    fetch("http://localhost:4000/usuarios", {
        method: "GET"
    })
    .then((resposta) => {
        if(resposta.ok)
            return resposta.json();
    })
    .then((usuarios) => {
        lista = usuarios;
        if(verificarUsuario(usuario, senha, lista) || (usuario === "admin" && senha === "admin")){
            requisicao.session.autenticado = true;
            resposta.redirect("/menu.html");
        }
        else{
            resposta.redirect("/login.html");
        }
    })
    .catch((erro) => {
        console.log("Erro: "+erro);
    });
});

app.use(verificarAutenticado, express.static("./privado"));

app.get("/logout", (requisicao, resposta) => {
    requisicao.session.destroy();
    resposta.redirect("/login.html");
    resposta.end();
});

app.listen(porta, host, () =>{
    console.log(`Servidor em execução em http://${host}:${porta}`);
});