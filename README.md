# ClothesStore
## First project, developed on my own initiative
Primeramente, todo el proyecto esta desarrollado haciendo unso del MERN Stack
El proyecto se divide en tres partes,
1. frontend (“public/build”,la pagina de la tienda) 
2. admins-frontend (“public/admins-build”, la pagina del administrador)
3. Backend (donde esta fusionado el backend que respalda ambas paginas)

### Notas:
- Los frontend, han sido construidos haciendo uso de ReactJS y react-rourter-dom, por el monento no he aprendido a renderizar desde el servidor, no use NextJS,
porque al comenzar a usar otra tecnologia sin siquiera conocer bien a ReactJS (aparte queria trabajar con ExpressJS). Entonces, por ejemplo, cuando se hace 
un llamado a “https://StoreClothes.ia92.repl.co/catalogo” redirecciona a “https://StoreClothes.ia92.repl.co” y asi con las demás rutas.
- No he hecho nada con respecto al SEO.
- Esta versión tiene varios faltantes, que originalmente yo queria agregar, como:
  1. conteo de los productos más vendidos 
  2. conteo de los productos más vistos
- Como no le puse pasarela de pago, la UI del cliente tiene un formulario controlado por una cookie, la cokie contiene un ID+fecha de expiracion,
si la cookie no esta vigente el formulario no podrá ser enviado, y si esta vigente, el formulario podrá ser enviado una (1) sola vez,
despues de que la cookie expire se deberá recargar la pagina para obtener una nueva cookie.  
 
- Aquí les dejo las variables de entorno que hay que definir para el programa:
```
{
  "PORT": "5000",
  "ATLAS_URI": “URI de mongoDB Atlas”,
  "SALTROUNDS": "10",
  "SESSION_SECRET": "mySessionSecret",
  "MY_FORM_SECRET": "myFormSecret",
  "SESSION_TIME_MIN": "30",//for admin session
  "STORE_TIME_MIN": "10",//for cookie in UI store
  "COOKIE_SECRET": "MyCookieFormSecret",
  "DOMAIN": "https://StoreClothes.ia92.repl.co",
  "SUDO": "MyPasswor4CreateANewUser"
}
```
