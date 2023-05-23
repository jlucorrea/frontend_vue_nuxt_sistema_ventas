# Sistema de Ventas - Frontend (Vue.js + Nuxt.js)
Este repositorio contiene el frontend de un Sistema de Ventas desarrollado utilizando Vue.js y Nuxt.js. Proporciona una interfaz de usuario moderna y amigable para interactuar con la API de Laravel del backend correspondiente.

# Instalación

Sigue estos pasos para configurar y ejecutar el frontend:

1. Clona este repositorio en tu máquina local:

git clone https://github.com/jlucorrea/frontend_vue_nuxt_sistema_ventas.git

2. Accede al directorio del proyecto:

cd frontend_vue_nuxt_sistema_ventas

3. Instalar las dependencias utilizando npm:

npm install

4. Ejecuta el siguiente comando para iniciar el frontend en modo de desarrollo:

npm run dev


# Antes de ejecutar la aplicación, es importante configurar la URL base de la API de Laravel en la que se basa este frontend.
  
Para realizar la configuración de la API, se recomienda seguir las instrucciones detalladas disponibles en el repositorio correspondiente: https://github.com/jlucorrea/api_laravel_sistema_ventas

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).


### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).
