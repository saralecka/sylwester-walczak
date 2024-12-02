# Book Tracker

**Book Tracker** is an application for managing books, allowing users to add books, manage user data, and integrate with a PostgreSQL database. The project includes a backend built with Django and a frontend with Next.js.

## Running the Application

### 1. Prerequisites

To run the application, you need to have the following installed:

- [Docker](https://www.docker.com/get-started) (for running the application in containers)
- [Docker Compose](https://docs.docker.com/compose/install/) (for easily managing multiple containers)

### 2. Running the Application

1. **Start all services** (Django, Next.js, PostgreSQL):

```bash
./lunch.sh
```

The `lunch.sh` script automatically sets environment variables, runs Docker Compose, and builds all containers. After starting the application, the Django service will be available on port `8000`, and the Next.js frontend will be available on port `3000`.

2. Once the application is up, the frontend will be accessible at: [http://localhost:3000](http://localhost:3000).

### 3. Other Commands

- To stop the services:

```bash
docker-compose down
```

- To clear the database and run migrations:

```bash
docker-compose exec django python manage.py flush --no-input
docker-compose exec django python manage.py migrate
```

## Users

The application supports two types of users:

- **Administrator**:
  - Login: `admin`
  - Password: `password`
- **Regular User**:
  - Login: `user`
  - Password: `password`

### 5. Available URLs

- **Django Admin Panel**:

  - URL: [http://localhost:8000/admin](http://localhost:8000/admin)

- **API Documentation (Redoc)**:
  - URL: [http://localhost:8000/redoc](http://localhost:8000/redoc)

## Improvements and Known Issues

While the application works as intended, there are some areas that can be improved or extended:

- **Refresh Token Logic**: Currently, the application does not implement refresh token logic. Adding token refresh functionality to maintain long-lived sessions could enhance security and usability.
- **Full CRUD for Books**: The application currently supports adding and viewing books, but it could be extended to include full CRUD functionality (Create, Read, Update, Delete) for books from the frontend.
- **User Management**: Users can be added and managed from the backend, but adding the ability to manage users (create and delete) directly from the frontend would improve user experience.
- **Testing**: There is no test coverage for the backend or frontend. Writing unit and integration tests would help ensure the application works correctly and prevent regressions during future changes.
- **Dockerization Improvements**: The Docker setup could be enhanced by adding multi-stage builds to optimize the image size and improve performance.
- **Security**: Consider improving security features, such as rate limiting, user role management, and validation for inputs from the frontend.

## Conclusion

This application provides a simple yet functional book tracker with basic user and book management. While it works in its current form, there are several areas for improvement that could make the system more robust and user-friendly.
