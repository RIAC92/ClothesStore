const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const order = require('../../models/orders');


require('dotenv').config({ path: process.cwd() + '/.env' });
const MY_FORM_SECRET = process.env.MY_FORM_SECRET;
const STORE_TIME_MIN = process.env.STORE_TIME_MIN;

router.post('/', function (req, res) {

  let body = Object.assign({}, req.body);
  let formCookie = myCookieParse(req.signedCookies.form);
  if (!formCookie) {//bad
    console.log("Bad attemp to send order form, without cookies")
    res.json({ error: "Orden no recibida, posiblemente ha expirado la conexión, favor recargar la página" });
    return
  } else {
    bcrypt.compare(MY_FORM_SECRET, formCookie.secret)
      .then(result => {
        if (!result) {//bad
          console.log('Unreliable Form');
          res.json({ error: "Orden no recibida, posiblemente ha expirado la conexión, favor esperar " + STORE_TIME_MIN + "min y después recargar la página" });
          return
        } else {//good

          console.log("Reliable Form:", formCookie);
          console.log("body", body);
          let dataToSave = Object.assign({}, body);
          dataToSave.connection = {
            id: formCookie.id,
            date_expires: formCookie.time
          };
          return order.save(dataToSave)
            .then((data) => {
              if (data.follow_code) {
                console.log(data);
                let date_expires=JSON.parse(data.connection).date_expires;
                res.json({
                  message: 'Su orden ha sido enviada, nuestros vendedores se pondrán en contato con Usted!',
                  follow_code:data.follow_code,
                  date_expires:date_expires
                });
                return
              } else {
                res.json({ error: 'Orden no recibida, problablemente por orden duplicada, favor intentarlo más tarde'});
              }

            })
            .catch(e => {
              console.log(e)
              res.json({ error: 'Ha ocurrido un error desconocido' })
              return
            })

        }
      })
      .catch(e => console.log(e));


  }//end else

});//end post

router.get('/form', function (req, res) {
  let formCookie = myCookieParse(req.signedCookies.form);
  
  if (!formCookie) {
    res.json({ error: 'Ha ocurrido un error' })
  } else {
    let connection = JSON.stringify({
      id: formCookie.id,
      date_expires: formCookie.time
    });
    order.Order.find({ connection: connection })
      .then(data => {
        if (data.length === 1) {
          res.json({
            case: 1,
            date_expires: formCookie.time,
            follow_code:data[0].follow_code
          });//do not allow to show the form
        } else {
          res.json({ case: 0 })//allow to show the form

        }
      })
      .catch(e => {
        console.log(e)
        res.json({ error: 'Ha ocurrido un Error' });
      })

  }//end else
});//end get




function myCookieParse(cookieValue) {
  if (!cookieValue) {
    return null
  }
  let idRegex = /[&]\w{8}-\w{4}-\w{4}-\w{4}-\w{12}\b/g;
  let timeRegex = /(?<=[&]t)\d+(?=[&])/g;
  let secretRegex = /[$]\w+[$]\w+[$]\S{53}/g;
  let id = cookieValue.match(idRegex)[0];
  let time = cookieValue.match(timeRegex)[0];
  let secret = cookieValue.match(secretRegex)[0];
  if (!secret || !time || !id) {
    return null
  } else {
    return {
      id: id,
      time: parseInt(time),
      secret: secret
    }
  }

}//end myCookieParse
module.exports = router;