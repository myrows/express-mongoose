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

- Crear estación y medición

```bash
{
	"name": "Mairena station",
	"location": ["2", "2"],
	"user_mant": "66955ca46063c5600627f393"
}

Añadimos en 'estacion_meteorologica' el id de la estación generado anteriormente

{
    "lluvia": 25,
    "velocidad_viento":45,
    "direccion_viento":35,
    "temperatura_ambiente":25,
    "temperatura_suelo":30,
    "humedad":56,
    "calidad_aire":75,
    "presion":12,
    "estacion_meteorologica":"idEstacion"
    }
```

- Users

```bash
localhost:3000/api/register - POST
{
	"fullname": "Daniel Troncoso",
	"username": "dmtroncoso1",
	"password": "1234",
	"email": "dmtroncoso@gmail.com",
	"rol": "USER"
}

localhost:3000/api/login - POST
{
	"username": "dmtroncoso1",
	"password": "1234"
}
localhost:3000/api/users - GET
```

- Stations

```bash
localhost:3000/api/stations/ - POST
{
	"name": "Mairena station",
	"location": ["2", "2"],
	"user_mant": "66955ca46063c5600627f393"
}
localhost:3000/api/stations/ - GET
localhost:3000/api/stations/:id - GET
- localhost:3000/api/stations/66955ca46063c5600627f392  
localhost:3000/api/stations/:id/today - GET
localhost:3000/api/stations/:id/weather/ - GET
localhost:3000/api/stations/:id/weather/from/:from/to/:to - GET
- http://localhost:3000/api/stations/(id estación creada a mano con su medición)/weather/from/2019-01-01/to/2020-12-30
* Funciona perfecto con estaciones y mediciones creadas , pero no detecta bien las fechas del init
localhost:3000/api/stations/:id - PUT
- http://localhost:3000/api/stations/66955ca46063c5600627f392
{
	"name": "Mi estacion editada",
	"location": ["2", "8"],
	"user_register": "56955ca46063c5600627f393",
	"user_mant": "56955ca46063c5600627f394"
}
localhost:3000/api/stations/:id - DELETE
- localhost:3000/api/stations/66955ca46063c5600627f395

```

- Weather

```bash
localhost:3000/api/weather/ - POST
{
    "lluvia": 25,
    "velocidad_viento":45,
    "direccion_viento":35,
    "temperatura_ambiente":25,
    "temperatura_suelo":30,
    "humedad":56,
    "calidad_aire":75,
    "presion":12,
    "estacion_meteorologica":"66955ca46063c5600627f392"
    }

localhost:3000/api/weather/:id - GET
- localhost:3000/api/weather/76955ca46063c5600627f392
localhost:3000/api/weather/today - GET
localhost:3000/api/weather/fromto - GET
localhost:3000/api/weather/from/:from/to/:to - GET
- localhost:3000/api/weather/from/2019-11-01/to/2019-12-01
localhost:3000/api/weather/:id - DELETE
- localhost:3000/api/weather/76955ca46063c5600627f392 
```
