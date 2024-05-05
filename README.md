# FripsBackend


### Como correr el backend?

Hasta el momento el backend solo necesita conectarse a una base de datos

### Paso 1: instalar la BD
#### Opcion 1 -> instalar Postgres directamente en la compu

Hay que descargar e instalar PostGres directamente, pero con cuidado de poner estos credenciales:

* user: postgres
* password: 1234
* port: 5432

Despues de instalar, en el buscador, busca y abre el programa SQLShell(psql)

Solo hay que darle enter hasta que le pida una clave, que serà 1234

Una vez dentro de psql, para crear la base de datos solo hay que poner:

CREATE DATABASE "fripsDB";

### Paso 1: instalar la BD
#### Opcion 2 -> utilizar Docker

Se puede instalar Docker y hacer un contener que solo tenga una base de datos Postgres, para eso hay que:

- instalar Docker desktop
- dentro de Docker destop, buscar una imagen de postgres, poner la ultima version disponible y hacerle pull
- En el cmd, crear un contenedor de docker con la imagen de postgres, eso se hace con el siguiente comando:

docker run -d -p 5432:5432 --name fripsDB -e POSTGRES_PASSWORD=1234 -e POSTGRES_DB=fripsDB -h localhost postgres:16

- Este comando crea la BD con el user, password y port que usa el proyecto


### Paso 2: Reinstalar los node modules
- Es mejor que cada vez que se hace pull de una nueva version del proyecto, volver a instalar los node modules. Para eso, ubicarse en la carpeta del proyecto y con una nueva terminal ejecutar:

npm install

### Paso 3: Crear las tablas de la BD
- Hay que ubicarse en la carpeta del proyecto y con una nueva terminal ejecutar:

npx sequelize-cli db:migrate

- Es preferible volver ejecutar esto siempre que se hace pull de una nueva version

### Paso 4: Ejecutar el proyecto el proyecto en modo dev
- Hay que ubicarse en la carpeta del proyecto y con una nueva terminal ejecutar:

npm run dev


### -- UTILIDADES --

#### Como entrar al contenedor de Docker?
- Abre un cmd y ejecuta el siguiente comando:

docker exec -it fripsDB /bin/bash

#### Como entrar a Postgres dentro del contenedor de Docker?
* Esto tambien se puede ejecutar desde SQLShell(psql) si se instalo PostGres en la compu
- En el cmd, una vez dentro del contenedor de Docker, ejecuta el siguiente comando:

psql -U postgres

#### Conectar con la base de datos fripsDB dentro del Postgres de Docker

* Esto tambien se puede ejecutar desde SQLShell(psql) si se instalo PostGres en la compu
- En el cmd, una vez dentro de postgres, ejecuta el siguiente comando:

\c fripsDB

#### Ver las tablas disponibles en la base de datos fripsDB

* Esto tambien se puede ejecutar desde SQLShell(psql) si se instalo PostGres en la compu
- En el cmd, una vez conectado con la base de datos fripsDB, ejecuta el siguiente comando:

\d

#### Ver diseño de una tabla

* Esto tambien se puede ejecutar desde SQLShell(psql) si se instalo PostGres en la compu
- En el cmd, una vez conectado con la base de datos fripsDB, ejecuta el siguiente comando:

\d "nombre_de_la_tabla"

### Ingresar datos de prueba

- Ingresa: un usuario, un grupo, un grupoviaje, un itinerario

INSERT INTO "Usuarios" ("userId","nombre","email","password","createdAt","updatedAt") VALUES (DEFAULT,$1,$2,$3,$4,$5) RETURNING "userId","nombre","email","password","createdAt","updatedAt";




