docker stop typeorm-aks-workload-identity
docker rm typeorm-aks-workload-identity
docker build -t typeorm-aks-workload-identity .
docker run -d --name typeorm-aks-workload-identity --env-file .env typeorm-aks-workload-identity

