# 🧪 Prueba Técnica Frontend: Tabla Interactiva con React + TypeScript

Este proyecto es el resultado de una **prueba técnica frontend** para una posición en Beeping. El objetivo era construir una tabla interactiva en React que explore publicaciones académicas usando la API pública de OpenAlex, incorporando scroll infinito, virtualización de filas y ordenación dinámica.

---

## 🎯 Objetivo

Desarrollar una tabla que permita:
- **Consultar publicaciones académicas** desde OpenAlex.
- Implementar **scroll infinito** (sin botón de "Cargar más").
- Usar **virtualización** para renderizar solo las filas visibles.
- Permitir **ordenar por número de citaciones** (ascendente y descendente).

---

## 🧰 Tecnologías utilizadas

- ⚛️ **React + TypeScript**: Base del frontend.
- 📊 **TanStack Table**: Renderizado y manejo de la tabla.
- 🧩 **TanStack Virtual**: Virtualización de filas para alto rendimiento.
- 🎨 **shadcn/ui**: Estilos modernos y accesibles.
- 🐙 **Vite**: Entorno de desarrollo rápido.
- 🦄 **@tanstack/react-query**: Manejo de fetching y caché de datos.

---

## ⚙️ Características principales

- **Scroll infinito:** Carga automática de más publicaciones al llegar al final de la tabla.
- **Virtualización:** Solo se renderizan las filas visibles en pantalla, lo que permite manejar miles de registros de manera fluida.
- **Ordenación por citaciones:** El usuario puede alternar entre orden ascendente y descendente en la columna de citaciones.
- **Búsqueda por título:** Barra de búsqueda para filtrar publicaciones por texto en el título.
- **Columnas limpias y claras:** Datos bien mapeados y tipados fuertemente con TypeScript.

### 📋 Columnas de la tabla

| Columna       | Fuente JSON de OpenAlex           | Descripción                              |
|---------------|----------------------------------|------------------------------------------|
| 📖 Título     | `title`                          | Título del trabajo académico             |
| 📅 Año        | `publication_year`               | Año de publicación                       |
| 🔢 Citaciones | `cited_by_count`                 | Número de citaciones                     |
| 👥 Autores    | `authorships[].author.display_name` | Hasta 2 autores separados por coma        |

---

## 🔎 Consulta a la API de OpenAlex

- **URL base:** `https://api.openalex.org/works`
- **Parámetros usados:**
  - `per-page`: Cantidad de resultados por página (ej. 20)
  - `cursor`: Paginación eficiente para scroll infinito
  - `sort`: Ejemplo `cited_by_count:desc` para ordenar por citaciones
  - `filter=title.search:`: Búsqueda por texto en el título

**Ejemplo de petición:**
```bash
curl --location --request GET 'https://api.openalex.org/works?per-page=20&sort=cited_by_count:desc&filter=title.search:PROTEIN'
```

---

## 🚀 Instalación y ejecución

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/vitorsm19/tabla-interactiva-beeping.git
   cd tabla-interactiva-beeping
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Inicia el proyecto:**
   ```bash
   npm run dev
   ```

---

## 🧠 Evaluación y buenas prácticas demostradas

- ✅ Scroll infinito funcional y sin errores
- ✅ Uso correcto de TanStack Virtual para virtualización
- ✅ Tabla con datos bien mapeados, claros y consistentes
- ✅ Ordenación funcional por citaciones
- ✅ Tipado fuerte y claro con TypeScript
- ✅ Código limpio, ordenado y mantenible
- ✅ Commits claros y significativos: cada cambio está documentado con mensajes precisos

---

## 📂 Estructura principal del proyecto

```
src/
  components/         # Componentes UI reutilizables (Tabla, Barra de Búsqueda)
  pages/              # Página principal con la tabla interactiva
  hooks/              # Hook para scroll infinito y fetching
  lib/                # Utilidades generales
  index.css           # Estilos base y variables CSS
  main.tsx            # Punto de entrada de React
```

---

## 📄 Notas adicionales

- Este desafío fue realizado para mostrar capacidad técnica en:
  - Consumo y paginación de APIs REST.
  - Manejo de volúmenes grandes de datos con virtualización.
  - Implementación de patrones de diseño frontend modernos.
  - Uso de herramientas actuales del ecosistema React/TypeScript.

---

¡Gracias por revisar este proyecto!  
**Vitor S. M.**
