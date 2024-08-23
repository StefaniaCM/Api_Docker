IMPORTANTE: tener instalado node.js y docker


COMANDOS DOCKER 
---------------------------------
1)$ docker pull mysql
2)$ docker run --conexiondocker mysql-server -p 3306:3306 -e MYSQL_ROOT_PASSWORD=admin -mysql
3)$ docker start conexiondocker 

SCRIPT BASE DE DATOS
---------------------------------
create database db_docker;
use db_docker;
CREATE TABLE seres_interdimensionales (
  id_usuario INT AUTO_INCREMENT PRIMARY KEY,
  nombre_usuario  VARCHAR(255) NOT NULL,
  don VARCHAR (200) NOT NULL,
  planeta_origen VARCHAR (200),
  contrasena VARCHAR(255) NOT NULL,
  email_etereo VARCHAR(255),
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
select * from seres_interdimensionales;
INSERT INTO seres_interdimensionales (nombre_usuario, don, planeta_origen, contrasena, email_etereo)
VALUES ('Pleyadianos', 'Viaje en el tiempo-espacio', 'saturno', 'iluminado369', 'playadian@gmail.com')

INSTALACIÓN API
--------------------------------
1)setear las variables de entorno en el archivo .env
PORT=8080
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=admin
DB_NAME=db_docker
SESSION_SECRET=supersecreto

2)npm install 

3)npm run dev 

