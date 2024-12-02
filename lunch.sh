#!/bin/bash

echo "Kopiowanie pliku .env..."
cp ./be_booktracker/.env.example ./be_booktracker/.env
cp ./fe_booktracker/.env.example ./fe_booktracker/.env

echo "Uruchamianie aplikacji Docker Compose..."
sudo docker compose up --build -d

sleep 5

echo "Aplikacja uruchomiona. Wejdź na http://localhost:3000 w swojej przeglądarce."
