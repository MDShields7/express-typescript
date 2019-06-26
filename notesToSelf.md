What to start up:
1 Docker containers
  postgres
  pgadmin
2 Server
  npm run dev (as set up by mwanago), starts ts-node, without import issues, it seems
  ts-config may need moduleResolution: node

dotEnv
Has issues, initiate with require('dotenv').config();
ValidateEnv.ts
Turn off JWT Token, until it is created and used
go to http://localhost:5000 for api endpoints, (no https)
attempting to hit localhost:5432 does not yield RESTful response
Must hit localhost:5000/posts