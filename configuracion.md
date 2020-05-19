# Configuración inicial
1. Iniciar un proyecto de NodeJS
```sh
npm init
```
2. Instalar express
```sh
npm i express # Con versión express@4.16.4
```
3. Instalar cors. Mecanismo que utiliza cabeceras HTTP adicionales para permitir que un user agent obtenga permiso para acceder a recursos seleccionados desde un servidor, en un origen distinto (dominio) al que pertenece.
```sh
npm i cors
```
4. Instalar body-parser. Parseo de posteos (recibir la información de forma comoda)
```sh
npm i body-parser
```
5. Configurar el proyecto con typescript
```sh
tsc --init
```
En el archivo tsconfig.json generado descomentar las siguientes líneas:
```json
    "outDir": "./dist/",                        /* Redirect output structure to the directory. */

    "outDir": "./dist/",  
        "types": [
        "node"
        ],                           /* Type declaration files to be included in compilation. */
```
6. Poner el servidor en modo observador 
```sh
tsc -w
```
7. Correr nodemon sobre la carpeta dist (archivos javascript compilados)
8. Instalar @types/express y @types/node para mostrar las ayudas de express y node
```sh
npm i @types/express @types/node --save-dev # dependencia de desarrollo
```