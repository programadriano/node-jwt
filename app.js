var crypto = require('crypto');

let header = {
    "typ": "JWT",
    "alg": "HS256"
}

header = JSON.stringify(header);
header = Buffer.from(header).toString('base64');

let payload = [
    iss = 'origem do token',
    iat = new Date().toLocaleString(),
    exp = new Date().setMinutes(60).toLocaleString(),
    acl = ['admin'],
    name = 'Thiago Adriano',
    mail = 'teste@gmail.com'
];

payload = JSON.stringify(payload);
payload = Buffer.from(payload).toString('base64');

let key = 'batman batman batman';
let signature = crypto.createHmac('sha256', key)
    .update(header + "." + payload)
    .digest('base64');

signature = Buffer.from(signature).toString('base64');

let token = header + "." + payload + "." + signature;

console.log(token);