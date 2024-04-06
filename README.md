<<<<<<< HEAD
"# FripsBackend" 
=======
# FripsBackend
>>>>>>> 772ca39395f0772b1c564ec369c17ba50e34d5dd

Para pruebas y desarrollo pueden usar el contenedor docker:

docker run --hostname=232a003969ca --env=POSTGRES_USER=postgres --env=POSTGRES_DB=fripsDB --env=POSTGRES_PASSWORD=1234 --env=POSTGRES_HOST_AUTH_METHOD=password --env=PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin --env=LANG=en_US.utf8 --env=PG_MAJOR=16 --env=PG_VERSION=16.2 --env=PG_SHA256=446e88294dbc2c9085ab4b7061a646fa604b4bec03521d5ea671c2e5ad9b2952 --env=DOCKER_PG_LLVM_DEPS=llvm15-dev 		clang15 --env=PGDATA=/var/lib/postgresql/data --volume=/var/lib/postgresql/data -p 5432:5432 --restart=no --runtime=runc -d postgres:16-alpine3.19
