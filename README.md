1️⃣ Create a Kind Cluster
kind create cluster --name my-cluster --config kind-config.yaml
kubectl get nodes
**************************************************************

2️⃣ Build Docker Images Locally
#Build frontend image

docker build -t frontend:latest -f Dockerfile.frontend .
kind load docker-image frontend:latest --name my-cluster
--------------------------------------------------------------------

#Build backend image

docker build -t backend:latest -f Dockerfile.backend .
kind load docker-image backend:latest --name my-cluster
****************************************************************

3️⃣ Apply Kubernetes Manifests
#Persistent Volumes / Claims

kubectl apply -f pv-pvc.yml
---------------------------------------------------
#Backend Deployment & Service

kubectl apply -f node-deployment.yml
kubectl apply -f node-service.yml
---------------------------------------------------
#Frontend Deployment & Service

kubectl apply -f nginxpod.yml
kubectl apply -f service.yml
------------------------------------------------------
#Horizontal Pod Autoscaler

kubectl apply -f hpa.yml
------------------------------------------------------
#Ingress

kubectl apply -f ingress.yml
--------------------------------------------------------
#Check Everything

kubectl get all
kubectl get pvc
kubectl get ingress
