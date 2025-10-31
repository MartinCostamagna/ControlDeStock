# Agregar Módulo de Notificaciones para Stock Bajo

## Tareas Pendientes
- [x] Crear entidad Notificacion
- [x] Agregar Notificacion al database.module.ts
- [x] Crear DTOs para notificaciones (create, update)
- [x] Crear notification.module.ts
- [x] Crear notification.service.ts con lógica de CRUD
- [x] Crear notification.controller.ts con endpoints REST
- [x] Modificar ProductoService para generar notificaciones automáticas en actualizaciones de stock
- [x] Agregar NotificationModule al app.module.ts
- [x] Integrar notificaciones automáticas en registros de salida (DetalleSalidaService)
- [ ] Probar la funcionalidad

## Detalles de Implementación
- Estados: enviada (inicial), vista, eliminada (oculta)
- Mensaje: "El producto [nombre] está por debajo de su stock mínimo de [cantidad] unidades"
- Generación automática en cada update de producto si stock < stockMinimo
- Generación automática en cada registro de salida si stock resultante < stockMinimo
- No crear notificación duplicada si ya existe una activa para el mismo producto
