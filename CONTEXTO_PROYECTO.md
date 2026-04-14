# Contexto del Proyecto: Smart Calculator PWA

Este documento proporciona una visión general técnica y funcional del proyecto para facilitar su continuación en otros editores o para re-contextualizar a un agente de IA.

## 1. Descripción General
**Smart Calculator PWA** es una aplicación web progresiva diseñada para funcionar como una calculadora versátil. Su característica principal es la adaptabilidad según la orientación del dispositivo:
- **Modo Retrato (Portrait):** Calculadora estándar con diseño minimalista y claro.
- **Modo Paisaje (Landscape):** Se transforma automáticamente en una calculadora científica con tema oscuro y funciones adicionales (sin, cos, tan, log, potencias, etc.).

## 2. Pila Tecnológica
- **Lenguajes:** HTML5, CSS3 (Vanilla), JavaScript (ES6+).
- **Funcionalidades PWA:** 
  - Service Workers para soporte offline.
  - Manifiesto de aplicación para instalación en móviles/escritorio.
  - Diseño responsivo "mobile-first".

## 3. Estructura de Archivos
- `index.html`: Estructura semántica de la calculadora. Contiene los contenedores para el display (historial y valor actual) y el teclado dinámico.
- `style.css`: Sistema de diseño basado en variables CSS (`:root`). Implementa las transiciones de tema y el cambio de layout mediante Media Queries (`orientation: landscape`).
- `script.js`: Lógica de negocio encapsulada en la clase `Calculator`. Gestiona operaciones aritméticas, funciones científicas y manipulación del DOM.
- `manifest.json`: Configura el nombre, iconos y comportamiento de instalación de la PWA.
- `sw.js`: Gestiona el caché de recursos estáticos para permitir el funcionamiento sin conexión a internet.
- `icon.svg`: Icono vectorial escalable de la aplicación.

## 4. Lógica de Funcionamiento Key
- **Clase Calculator:**
  - `appendNumber(number)`: Gestiona la entrada de dígitos y el punto decimal.
  - `chooseOperation(operation)`: Prepara la operación pendiente y traslada el valor al historial.
  - `compute()`: Realiza el cálculo final basado en el operador almacenado.
  - `scientific(action)`: Ejecuta funciones de la librería `Math` de JS (sin, cos, sqrt, etc.).
- **Interactividad:** Se utiliza delegación de eventos o listeners individuales sobre botones con atributos `data-action`.
- **Detección de Interfaz:** El cambio de interfaz científica no requiere JS adicional, se gestiona mediante CSS (`display: none/flex` y `grid-template-columns`).

## 5. Instrucciones para Continuación / Mejora
Si deseas ampliar este proyecto, considera:
1.  **Historial Avanzado:** Implementar un almacenamiento local (localStorage) para persistir cálculos anteriores.
2.  **Temas Personalizados:** Añadir un selector de temas manual más allá del cambio automático por orientación.
3.  **Animaciones:** Refinar las transiciones entre modos y el feedback visual de los botones.
4.  **Pruebas Unitarias:** Añadir un framework como Jest para validar la lógica matemática de la clase `Calculator`.

---
*Este archivo fue generado automáticamente por Antigravity para preservar el contexto del desarrollo.*
