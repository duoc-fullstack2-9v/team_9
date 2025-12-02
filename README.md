# Entrega 1

Se utilizo React + Vite como lo mostrado en clase y en el repositorio entregado por el profesor

# Descripcion de entrega

Se configuro el proyecto para mostrar las siguientes vistas: 

## Home

Se configuro el Home para mostrar la tienda, un Hero el cual contiene botones que llevan al inicio de sesion y registro, asi como tambien, una imagen y descripcion de los productos. Por otro lado, se muestra una vista de los productos.

![alt text](image.png)

## Productos

La pagina de productos se configuro para permitir mostrar pasteles, asi como tambien, filtros para categorizarlos, esta es una funcionalidad que esta en proceso de desarrollo

![alt text](image-2.png)

## Inicio de Sesion

Se configuro el inicio de sesion, el cual permite entrar con la credencial:

```
    const testEmail = "rparra@duoc.cl";
    const testPass = "123456";
```

Sin embargo, no se tiene aun una vista del panel adminsitrativo, es una funcionalidad demo.

![alt text](image-3.png)

## Registro

Se creo un registro que contiene validaciones basicas.

![alt text](image-4.png)

# CRUD

```
[Página Productos.jsx]
        │
        │  (1) Usuario hace clic en "Agregar al carrito"
        ▼
 [ProductCard.jsx]
        │
        │  (2) Llama a → addItem(producto)
        ▼
 [CartContext.jsx]  ←───  useCart()
        │
        │  (3) Guarda el producto en el estado global (cartItems)
        │
        │  (4) Usa useEffect() para guardar el carrito en localStorage
        ▼
 ┌──────────────────────────────┐
 │ localStorage del navegador   │
 │ ("cartItems")                │
 └──────────────────────────────┘
        │
        │  (5) Cuando se abre la app o el usuario va al carrito
        ▼
 [Carrito.jsx]
        │
        │  (6) Lee los datos desde useCart()
        │
        │  (7) Muestra los productos, cantidades y total
        ▼
 (Usuario puede ↑ aumentar ↓ disminuir o eliminar)
        │
        └──────► Cambios se reflejan otra vez en CartContext y localStorage
```