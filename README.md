# pokeApi
Prueba Adalab
# Instalar y ejecutar el proyecto
Para ejecutar el proyecto debe descargar el codigo usando el comando por consola "git clone https://github.com/altrios/pokeApi.git", esto le descargar una carpeta llamada "pokeApi" la cual se divide de la siguiente manera:
pokeApi
  -Back-end
  -Front-end
    -pokeapi

para ejecutar el proyecto, primero se debe dirigir a la carpeta Back-end y ejecutar por comando "npm i", esperar a que haga toda la instalación y luego ejecutar el comando "npm run start", esto ejecutara el proyecto en el puerto 3000.
luego se debe dirigir a la carpeta "pokeApi->Front-end->pokeapi" y repetir el mismo proceso, esto ejecutara el proyecto desde el puerto 3001 al estar ocupado el puerto 3000 por el Backend.

# Probar el proyecto
luego de hacer las respectivas instalaciones se abrirá la ventana de login, debido a que el proyecto trabaja con inicio de sesión de usuauarios, manejados con base de datos MongoDB y con token JWT desde el backend y desde el front se usa session storage para el manejo del usuario.
el usuario por defecto es "username:satoshi" y "password:123", que de igual manera pueden crear su usuario
![image](https://github.com/altrios/pokeApi/assets/11358929/dce7a23e-f46d-4085-a860-b5c7bcabdc84)

luego de iniciar sesión la pagina los redirigirá a la lista de pokemons
![image](https://github.com/altrios/pokeApi/assets/11358929/5ef52f87-cf63-4b9a-8519-478ef8256af3)

en donde podran interactuar con el filtro y con cada tarjeta de pokemon para asi ver sus datos
![image](https://github.com/altrios/pokeApi/assets/11358929/02a152ab-8a17-46a7-9d13-fe8c792acf78)

de igual manera pueden entrar a la ficha de cada pokemon
![image](https://github.com/altrios/pokeApi/assets/11358929/673fc07a-cc55-4682-b90d-25bf724ee99c)



Para la implementación de formularios se usó react hook form y para la maquetación se uso sass, css y Material UI
En el backend se usaron las librerias express, jsonwebtoken, mongoose y celebrate.
