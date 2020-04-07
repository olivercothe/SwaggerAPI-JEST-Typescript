# Haika API

The API for haika.

## Run

- `mv .env.example .env`
- docker-compose up --build
- then:

```sh
curl http://localhost:3000/ping
# {"environment":"development","database":"up"}
```