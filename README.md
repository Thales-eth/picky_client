# PICKY: Una aplicación de fotos creada usando el Stack MERN

# Aplicación desplegada

La aplicación desplegada se puede encontrar en el siguiente enlace: "https://picky-client.vercel.app/"

Si quiere correrse esta aplicación en local, será necesario crear un archivo .env en la raíz del proyecto y adjuntar la variable de entorno "REACT_APP_API_URL". Por defecto, nos servimos del valor "http://localhost:5005". El puerto 5005 es el elegido en este caso para levantar nuestro servicio (API). Este archivo .env se excluye de subida en nuestro archivo .gitignore.

Para instalar todas las dependencias utilizadas en el proyecto, simplemente se ha de ejecutar el comando:
```
npm install
```
# Auth de la Aplicación

Para acceder a la aplicación y sus funcionalidades, es necesario iniciar sesión. El usuario más usado en la plataforma y con más fotos/amigos tiene por correo: "yayi@gmail.com" y contraseña "1234". 

# Rutas de la aplicación:

| URL path                    | Description           | 
| :--------------------------:|:---------------------:|
| /                           |  Home page            | 
| /feed                           |  Feed where user content is Shown            | 
| /explorer                           |  Page where all platform photos are shown            | 
| /friends/:user_id                 |  User Friends List     |
| /photo/:photo_id                           |  Single Photo with Comments            | 
| /post                           |  Form to Upload Photos to your account            | 
| /profile/:user_id                 |  User information and Personal Photos     |
| /my-profile                 |  Logged User information and Personal Photos     |
| /my-likes                 |  User liked Photos     |
| /my-profile/edit            |  Edit User information| 
| /edit-photo/:photo_id            |  Edit Photo Form| 
| /register                   |  Sign up page         |
| /login                      |  Login page           |