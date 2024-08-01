
# In a real life app, this file would NOT be committed because it contains passwords
DBPASS_ADMIN=example DBPASS=example docker compose -f docker-compose.dev.yml up --build -d --force-recreate