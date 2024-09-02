# Projet fil rouge WCS CDA Mai 2024

The Good Corner est un clone du site Le Bon Coin dans lequel, au départ, il était question de vendre des objets. Parce que c'est plus rigolo (et parce que les placeholders sont chouettes), je l'ai transformé en site de notation/vente d'animaux de compagnie. Les animaux en questions vont de l'ours au capybara en passant par les loutres. Le twist c'est que toutes les photos en base de données viennent de [Place Bear](https://placebear.com/). 

# First launch

### In a real life app, this file would NOT be committed because it contains passwords:
**detached** : 
```sh
DBPASS_ADMIN=the_good_corner_user DBPASS=example docker compose -f docker-compose.dev.yml up -d --build --force-recreate
```

**not detached** : 
```sh
DBPASS_ADMIN=the_good_corner_user DBPASS=example JWT_SECRET=superSecuredKey___ docker compose -f docker-compose.dev.yml up --build --force-recreate
```

Lors de l'initialisation, créer un user dans PostgreSQL : 
1. Accéder à Postgres dans Docker : 
```sh
docker exec -it the-good-corner-db-1 psql -U postgres
```
2. Créer l'utilisateur : 
```sql
CREATE USER the_good_corner_user WITH PASSWORD 'example';
CREATE DATABASE the_good_corner OWNER the_good_corner_user;
GRANT ALL PRIVILEGES ON DATABASE the_good_corner TO the_good_corner_user;
```

Ces informatins doivent correspondre à ce qui est renseigné dans `backend > src > dataSource > dataSource.ts` (database, username et password).

Vérifier également que le chemin du volume associé à la base de données est bien paramétré dans votre `docker-compose.dev.yml` : 
```yml
    volumes:
    # :Dossier de données propre à postgres
      - ./the-good-corner-db-data:/var/lib/postgresql/data
```
