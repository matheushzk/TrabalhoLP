export default function verificarAutenticado(requisicao, resposta, next){
    if(requisicao.session.autenticado){
        next();
    }
    else{
        resposta.redirect("/login.html");
    }
}