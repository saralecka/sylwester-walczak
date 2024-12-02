# Book Tracker

**Book Tracker** to aplikacja do zarządzania książkami, pozwalająca na dodawanie książek, zarządzanie danymi użytkowników oraz integrację z bazą danych PostgreSQL. Projekt zawiera backend oparty na Django oraz frontend w Next.js.

## Uruchamianie aplikacji

### 1. Prerekwizyty

Aby uruchomić aplikację, musisz mieć zainstalowane:

- [Docker](https://www.docker.com/get-started) (do uruchomienia aplikacji w kontenerach)
- [Docker Compose](https://docs.docker.com/compose/install/) (do łatwego zarządzania wieloma kontenerami)

### 2. Uruchomienie aplikacji

1. **Uruchomienie wszystkich serwisów** (Django, Next.js, PostgreSQL):

```bash
./lunch.sh
```

Skript `lunch.sh` automatycznie ustawi zmienne środowiskowe, uruchomi Docker Compose i zbuduje wszystkie kontenery. Po uruchomieniu aplikacji serwis Django będzie dostępny na porcie `8000`, a aplikacja frontendowa Next.js na porcie `3000`.

2. Po zakończeniu uruchamiania, frontend aplikacji będzie dostępny pod adresem: [http://localhost:3000](http://localhost:3000).

### 3. Inne komendy

- Aby zatrzymać serwisy:

```bash
docker-compose down
```

- Aby wyczyścić dane bazy danych i uruchomić migracje:

```bash
docker-compose exec django python manage.py flush --no-input
docker-compose exec django python manage.py migrate
```

## Użytkownicy

Aplikacja obsługuje dwa typy użytkowników:

- **Administrator**:
  - Login: `admin`
  - Hasło: `password`
- **Zwykły użytkownik**:
  - Login: `user`
  - Hasło: `password`

### 5. Dostępne URL-e

- **Panel administracyjny Django**:

  - Adres: [http://localhost:8000/admin](http://localhost:8000/admin)

- **Dokumentacja API (Redoc)**:
  - Adres: [http://localhost:8000/redoc](http://localhost:8000/redoc)
