# SecurityNet

[Frontend](https://github.com/postigoj/securitynet-front)

[Backend](https://github.com/postigoj/securitynet-backend)

[App Mobile](https://github.com/postigoj/securitynet-app)

## Certificaciónde servicios de vigiladores
### Visión general
Desarrollar una aplicación desde la cual una empresa de seguridad puede gestionar y controlar
la presencia de vigiladores dentro de las distintas sucursales de sus clientes.
El sistema dispone de dos aplicaciones bien diferenciadas.
La primera es una capa de gestión web responsive desde la cual se administran los datos de los
clientes, sus locales a vigilar, los datos de los vigiladores y sus horarios de trabajo. Con toda
esa información disponible un administrador del sistema asigna manualmente los distintos
lugares y horarios de trabajo de cada vigilador para los próximos días.
El segundo módulo del sistema se trata de una aplicación PWA/mobile que será utilizada por
cada vigilador para asegurar su presencia en su puesto de trabajo a lo largo de su jornada
laboral. Ello será posible a través del solicitar al vigilador la carga de un formulario que
registrará en el momento de la carga la posición geográfica del empleado.

### Stack Utilizado
 

 1. Backend:
	 - Node.js 
	 - JWT 
	 - Express 
	 - Sequelize 
	 - PostgreSQL
 2. Frontend:
	 - React.js 
	 - ReactNative.js
	 - Redux
	 - MUI
	 - Leaftlet
### Features
*Administración WEB:*
 1. Login:
	 -Rol Administrador
	-Rol Vigilador
	-Perdí mi clave
2. Clientes:
	-Panel de alta de clientes:
	- CUIT
	- Razón Social
	- Dirección Legal
	- Fecha inicio contrato
	- Fecha fin contrato

	-Direcciones de un cliente:
	- Nombre Sucursal
	- Calle
	- Número
	- Localidad
	- Provincia
	- Geoposicionamiento (Latitud,Longitud)
	- 
	-Vigiladores:
	- Nombre
	- Apellido
	- CUIL
	- Horario de ingreso días hábiles, Sábado y Domingo
	- Cantidad de horas trabajadas por día
	- Provincias donde está habilitado a prestar servicio
	
	-Calendarios por vigilador/sucursal:
	- Asignar
	- Mostrar
	- Modificar los vigiladores/sucursales asignados/as



**En la asignación de los calendarios el vigilador a elegir debe estar dentro del rango horario que
tiene definido para ese día.
Las sucursales deben quedar vigiladas durante las 24 horas, los 365 días**

*App móvil*

- Must have:
	- Login
	- Registrar geoposicionamiento durante el horario ingreso y salida de trabajo
- Nice to have:
	- Consulta días y horarios de próximas direcciones de trabajo
	- Cargar avisos de ausencias en su calendario
	- Consultar cantidad de horas trabajadas
	- Aviso en horario aleatorio de carga de formulario durante horario de trabajo
	- Captura de imagen en el momento de registrar geoposicionamiento (los datos de
Hora/latitud/longitud/Modelo de Celular pueden tomarse de la foto que se carga )

## Sprints
1. Sprint 1
	- Backend: endpoints para login/ usuarios/clients/direcciones/ vigiladores
	- Frontend: Diseño / estilos/ Menu/ Login
2. Sprint 2
 - Backend: Endpoints para alta/consulta/modificación de calendarios con validaciones
	- Front End: Pantallas de login Abms de usuarios/clients/direcciones/ vigiladores
3. Sprint 3
	- Backend: Carga de datos de geoposicionamiento del vigilador en horario de trabajo
desde PWA
	- Frontend: Carga/registro calendarios por sucursal y por vigilador
4. Sprint 4
	-	Backend: reportes de horarios de sucursales sin cubrir, horas trabajadas por cada
vigilador
	- FrontEnd: App Móvil/ PWA: login, captura /carga de Geoposicionamiento


![Aplicacion web para administradores](https://i.ibb.co/X2LwKbd/Security-Net.png)


![App Mobile](https://i.ibb.co/Dkjv4DR/Captura-desde-2022-10-18-20-14-28.png)
