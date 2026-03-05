# Wayra Travel — E-commerce (React + Firebase)

Single Page Application (SPA) desarrollada con React para un e-commerce de paquetes de viaje.
Incluye catálogo por categorías, detalle de producto, carrito global con Context y checkout con generación de órdenes en Firestore.

## Funcionalidades

- Listado de productos y detalle por ID (React Router).
- Navegación por categorías.
- Carrito de compras con estado global (Context API).
- Selector de cantidad con validación por stock (ItemCount).
- Checkout con validaciones de formulario.
- Generación de orden en Firestore y visualización del `orderId`.
- Mensajes condicionales (cargando, carrito vacío, categoría sin productos, sin stock).

## Tecnologías

- React
- React Router DOM
- Firebase / Firestore

## Instalación y ejecución

```bash
git clone https://github.com/Boni92/WayraTravel-Borsari.git
npm install
npm run dev
```

## Licencia

Este proyecto fue realizado con fines educativos para Coderhouse.

## Caracteristicas

- Fácil de instalar y ejecutar

- Navegación fluida sin recargar la página (SPA)

- Arquitectura con separación de responsabilidades (containers / presentación)

- Servicios desacoplados (mocks → firestore)

- Renderizado condicional para mejorar UX

## Capturas

![Captura de React](https://brandslogos.com/wp-content/uploads/thumbs/react-logo-1.png)

## Enlaces

- [Documentación Oficial](https://react.dev)
- [Repositorio](https://github.com/Boni92/WayraTravel-Borsari)
- [Deploy]
