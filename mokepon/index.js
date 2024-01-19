const express = require('express');

const app = express();

app.get("/", (req, res) => {
    res.send('<h1>'+req.query.titulo+'!</h1><style>h1 { color:red; }</style>');
})

app.listen(8000, () => {
    console.log('Servidor funcionando');
    });
