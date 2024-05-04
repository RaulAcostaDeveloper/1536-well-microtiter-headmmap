# Usar una imagen base de Node.js
FROM node:16-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar 'package.json' y 'package-lock.json' (o 'yarn.lock' si usas Yarn)
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar todos los archivos del proyecto al directorio de trabajo del contenedor
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Exponer el puerto que utiliza la aplicación (3000 es común para aplicaciones de React)
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
# Usar una imagen base de Node.js
FROM node:16-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar 'package.json' y 'package-lock.json' (o 'yarn.lock' si usas Yarn)
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar todos los archivos del proyecto al directorio de trabajo del contenedor
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Exponer el puerto que utiliza la aplicación (3000 es común para aplicaciones de React)
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]