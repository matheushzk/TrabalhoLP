export default function verificarUsuario(usuario, senha, lista){
    for(const dado of lista){
        if(dado.nome === usuario && dado.senha === senha)
            return true;
    }
    return false;
}