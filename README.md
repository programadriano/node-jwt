# node-jwt

Repositório contendo demonstração de como criar um token JWT em node sem plugin.

## Passos para gerar um token

### Header
Nessa parte nós devemos informar o tipo e o algoritmo que utilizaremos. O tipo será JWT, e o algoritmo pode ser HMAC SHA256 ou RSA. Para esse artigo utilizaremos o SHA256. Abaixo, você tem um trecho de código demonstrando essa etapa:

```TypeScript
let header = {
    "typ": "JWT",
    "alg": "HS256"
}

header = JSON.stringify(header);
header = Buffer.from(header).toString('base64');
```

Resultado no console.log(header): 

```TypeScript
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9
```

### Payload

Nesta parte devemos passar os dados que devem retornar no token. O JWT tem algumas palavras reservadas que não são obrigatórias, mas “no meu ponto de vista” é legal utilizarmos para ter um padrão. Abaixo você pode ver algumas dessas palavras:

* “iss” (Issuer): origem do token
* “iat” (issueAt): timestamp de quando o token foi gerado
* “exp” (Expiration): timestamp de quando o token expira
* “sub” (Subject): entidade a quem o token pertence, normalmente o ID do usuário


Seguindo com a parte do nosso código, abaixo você tem um exemplo de preenchimento do payload.

```TypeScript
let payload = [
    iss = 'omundoedos.net',
    iat = new Date().toLocaleString(),
    exp = new Date().setMinutes(60).toLocaleString(),
    acl = ['coordenador', 'participante'],
    username = 'Thiago Adriano',
    email = 'tadriano.net@gmail.com'
];

payload = JSON.stringify(payload);
payload = Buffer.from(payload).toString('base64');
```

Resultado no console.log(header.payload):

```TypeScript
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.WyJvbXVuZG9lZG9zLm5ldCIsIjIwMTgtMTAtMjUgMTY6NDY6MzYiLCIxLDU0MCw0OTcsNjM2LDA4NiIsWyJjb29yZGVuYWRvciIsInBhcnRpY2lwYW50ZSJdLCJUaGlhZ28gQWRyaWFubyIsInRhZHJpYW5vLm5ldEBnbWFpbC5jb20iXQ==

```
Note que eu estou concatenando o header e o payload com um ponto. O JWT concatena as três partes dessa forma.

### Signature

A assinatura é a terceira parte do token JWT. Ela é composta por: Header + Payload + uma senha definido para nossa aplicação, criptografadas pelo algoritmo que definimos no header. Abaixo você tem um trecho de código demonstrando essa parte.



```TypeScript
let key = '.net-sp-ness';
let signature = crypto.createHmac('sha256', key)
    .update(header + "." + payload)
    .digest('base64');

signature = Buffer.from(signature).toString('base64');
```

Resultado no console.log(SHA256(header.payload + senha)).


```TypeScript
OWlWY24ydmtOSEE4Y0U5YWU3VGZlVGI1U0FISUdtZ0ZSYmZDK3E4dk5UMD0=
```
Agora juntando essas três partes nós temos o nosso token:

```TypeScript
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.WyJvbXVuZG9lZG9zLm5ldCIsIjIwMTgtMTAtMjUgMTc6MDI6MjIiLCIxLDU0MCw1MDEsMjIyLDMxMiIsWyJjb29yZGVuYWRvciIsInBhcnRpY2lwYW50ZSJdLCJUaGlhZ28gQWRyaWFubyIsInRhZHJpYW5vLm5ldEBnbWFpbC5jb20iXQ==.QlUxR2kyRG5NbCtzKzVUQm5vTkF0dGEvaEhaTTNsd1ZJbEhlTjhIOFNJRT0=
=
```


