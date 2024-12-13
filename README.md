Frontend

Requisitos previos

Node.js (versión 14 o superior)

Angular CLI (instalado globalmente):

npm install -g @angular/cli

Instalación

Clonar el repositorio:

git clone <URL_REPOSITORIO>
cd frontend

Instalar dependencias:

npm install

Configurar variables de entorno:
Crear un archivo src/environments/environment.ts con el siguiente contenido:

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3005/v1/api',
};

Iniciar la aplicación:

ng serve

Acceso a la aplicación:
Abre http://localhost:4200 en tu navegador.