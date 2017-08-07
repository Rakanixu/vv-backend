# alantujs-backend

Backend of AlantuJS

# build

Build AlantuJS docker image:

```
docker build -t alantuback .
```

Rebuild image every time you want to target a different commit in this repo.

# Dependencies

Install docker-compose: https://docs.docker.com/compose/install/

# Run

AlantuJS requires a connection to a postgres and a MongoDB instances. For convenience we recommend to run with docker-compose:

```
docker-compose -f compose.yml up
```



