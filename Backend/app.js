const express = require("express");
const app = express();
const port = 3000;

var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "coopertech",
});

//GET URL: http://localhost:3000/user?start_date=${startDate}&end_date=${endDate}
//Formato data AAAA-MM-DD
app.get("/user", (req, res) => {
  const startDate = req.query.start_date;
  const endDate = req.query.end_date;

  if (startDate && endDate) {
    connection.query(
      `
            SELECT 
                SUM(p.preco) as "total_compra",
                COUNT(u.id) AS "quantidade_compras",
                u.id as "id_usuario",
                u.nome as "nome_usuario",
                c.data_compra as "data_compra"
            FROM
                usuario AS u
            INNER JOIN
                compras AS c
            INNER JOIN
                item_compra as ic
            INNER JOIN
                produtos as p
            ON
                u.id = c.id_usuario 
                    AND 
                ic.id_compra = c.id 
                    AND 
                ic.id_produto = p.id
            WHERE
                c.data_compra BETWEEN '${startDate}' AND '${endDate}'
            GROUP BY
                u.id
            HAVING 
                COUNT(u.id) = 3
            AND
                SUM(p.preco) > 30
            `,
      function (err, rows, fields) {
        res.send(rows);
      }
    );
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
