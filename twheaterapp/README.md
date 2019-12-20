# TWEATHERAPP
Proyecto desarrollado en Express con Mongoose

Tecnologías usadas : Node.js, Express, Mongoose, Passport

Desarrolladores de la Api Rest : Pablo Roldán, José Antonio Llamas, José Manuel Bargueño y Daniel Troncoso

# ¿Qué es TWEATHERAPP?

- Se trata de un api para la gestión de estaciones meteorológicas.

# EndPoints a tener en cuenta

- Primero insertaremos unos datos de ejemplo :

```bash
localhost:3000/api/init/
```

- Users

```bash
localhost:3000/api/register - POST
localhost:3000/api/login - POST
localhost:3000/api/users - GET
```

- Stations

```bash
localhost:3000/api/stations/ - POST
localhost:3000/api/stations/ - GET
localhost:3000/api/stations/:id - GET
localhost:3000/api/stations/:id/today - GET
localhost:3000/api/stations/:id/weather/ - GET
localhost:3000/api/stations/:id/weather/from/:from/to/:to - GET
localhost:3000/api/stations/:id - PUT
localhost:3000/api/stations/:id - DELETE

```

- Weather

```bash
localhost:3000/api/weather/ - POST
localhost:3000/api/weather/:id - GET
localhost:3000/api/weather/today - GET
localhost:3000/api/weather/fromto - GET
localhost:3000/api/weather/from/:from/to/:to - GET
```
