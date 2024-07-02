Pra que a aplicação funcione corretamente é necessario ter 
as seguintes dependencias instaladas e em execução:

-Docker
-PostgresSQL
-Redis

após a clonagem do repositório, execute no terminal os seguintes comandos:

```bash
$ npm i
$ docker-compose build
$ docker-compose up
```

A pasta "insomnia" na raiz do projeto contem a collection com as 
apis, a importação é feita no insomnia ao clicar na sua coleção.

Ao gerar o token com a api de login voce deve usar o mesmo nas outras apis
peenchendo o campo Bearer Token em authenticação.
