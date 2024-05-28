# DetectorDeEmociones

Este proyecto consiste en una aplicación web desarrollada utilizando HTML, CSS y JavaScript, la cual se comunica con una API creada en Python utilizando FastAPI. La funcionalidad principal de la aplicación es permitir al usuario enviar una imagen, la cual será procesada por la API utilizando un modelo de reconocimiento de emociones previamente entrenado. Este modelo es capaz de predecir si la emoción en la imagen es triste o feliz.

## Funcionalidades

- Envío de imágenes: La aplicación web permite al usuario cargar o tomar en vivo una imagen desde su dispositivo.
- Procesamiento de imágenes: Utilizando jQuery y AJAX en JavaScript, la imagen es enviada a la API para su procesamiento.
- Reconocimiento de emociones: La API utiliza un modelo entrenado para predecir si la emoción en la imagen es triste o feliz.
- Visualización de resultados: La aplicación web muestra al usuario el resultado de la predicción realizada por la API.

## Instalación

1. Clonar el repositorio desde GitHub
2. Crear un entorno virtual en Python(la version utilizada al momento de crear esta aplicación fue la 3.11.3, se desconoce la funcionalidad en versiones posteriores): python -m venv venv
3. Activar el entorno virtual:
   - En Windows: venv\Scripts\activate
   - En Unix o MacOS: source venv/bin/activate
4. Instalar las dependencias del proyecto utilizando pip: pip install -r requirements.txt

## Configuración

1. Instalar la extensión Live Server en Visual Studio Code.
2. Ejecutar el HTML utilizando Live Server.
3. Iniciar la API utilizando el siguiente comando en la terminal: python -m uvicorn main:app --port 8082 --reload.
   - Puedes cambiar el puerto si lo deseas, pero asegúrate de actualizarlo también en el archivo de script de la aplicación web.
4. *MUY IMPORTANTE*: En el archivo main.py, asegúrate de agregar la dirección del Live Server al array de origins para permitir el intercambio de información sin que CORS cause problemas.