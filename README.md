# Angular

### Create Angular APP
1. Install angular/cli  ``npm i -g @angular/cli``

2. Install plugin
```
npm i -g module-generator-plugin
```

3. Find your global node_modules
   ``whereis node_modules``

4. run command to create new project:
```
ng new -c <global node_modules path>/node_modules/module-generator-plugin
```
- type the name of project
- go to project directory
  ``cd <project name>``
- run npm install ``npm i``
- run app ``npm run serve``

- open your browser on ``http://localhost:4200``


### Create Angular module
1. Find your global node_modules
   ``whereis node_modules``

2. config your package.json, add new script:
```
"scripts": {
    "create": "ng g <global node_modules path>/module-generator-plugin:ng-module"
}
```
3. Just use it on project
```
npm run create <module name>
```
It will be create new module to src/app/modules and create service to src/app/_services/api
Just import module and service.


# Nest Js
### Create NestJS APP
1. Install nest/cli  ``npm i -g @nestjs/cli``
   
2. Install plugin 
```
npm i -g module-generator-plugin
```

3. Find your global node_modules
   ``whereis node_modules``

4. run command to create new project:
```
nest new -c <global node_modules path>/module-generator-plugin
```
- type the name of project
- got to project directory
``cd <project name>``
- run npm install ``npm i``
- run app ``npm run serve``

#### App settings is for postgresql database, change database config in ``ormconfig.json`` file. 

- open your browser on ``http://localhost:3000/api/docs``
- view swagger docs

### Create NestJs module
1. Find your global node_modules
   ``whereis node_modules``

2. config your package.json, add new script:
```
"scripts": {
    "create": "nest g -c <global node_modules path>/module-generator-plugin nest-module"
}
```
3. Just use it on project
```
npm run create <module name>
```
It will be create new module to src/modules and autoimport it on app.module


