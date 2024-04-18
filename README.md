**----------------API StarWarsManagment ----------------**

.-.__      \ .-.  ___  __
|_|  '--.-.-(   \/\;;\_\.-._______.-.
(-)___     \ \ .-\ \;;\(   \       \ \
 Y    '---._\_((Q)) \;;\\ .-\     __(_)
 I           __'-' / .--.((Q))---'    \,
 I     ___.-:    \|  |   \'-'_          \
 A  .-'      \ .-.\   \   \ \ '--.__     '\
 |  |____.----((Q))\   \__|--\_      \     '
    ( )        '-'  \_  :  \-' '--.___\
     Y                \  \  \       \(_)
     I                 \  \  \         \,
     I                  \  \  \          \
     A                   \  \  \          '\
     |                    \  \__|           '
                           \_:.  \
                             \ \  \
                              \ \  \
                               \_\_|
## Description

Este servicio cuenta con 3 entidades **Movies**, **User**,**Auth**, cada una de estas entidades posee su module, controller y services. 


Las peticiónes del tipo GET se hicieron en función a la API pública de starWars y los POST, DELETE y CREATE se trataron con una entidad en la base de datos de MONGODB.

La lógica de autenticación se realizo como la que se requirió con JWT y los roles "Usuario Regular" y "Administrador" (estos se encuentran dentro de la firma del token)

Se podrán registrar con su usuario y mail y podrán realizar el login correspondiente.

Se agregaron únicamente los tests de la entidad movies 



## Installation

```bash 
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

- Author - Fernando Lefloth
- LinkedIn - [https://www.linkedin.com/in/fernando-lefloth/]