from fastapi import FastAPI, File, UploadFile
import tensorflow as tf
import tensorflow_hub as hub
from PIL import Image
import requests
from io import BytesIO
import cv2
import numpy as np
from constant import prediccion

with tf.keras.utils.custom_object_scope({'KerasLayer': hub.KerasLayer}):
    model = tf.keras.models.load_model('./API/modelo/modelo_entrenado.h5')

""" def categorizar(url):
  respuesta = requests.get(url)
  img = Image.open(BytesIO(respuesta.content))
  img = np.array(img).astype(float)/255
  img = cv2.resize(img, (224,224))
  prediccion = model.predict(img.reshape(-1, 224, 224, 3))
  return np.argmax(prediccion[0], axis=-1), prediccion

url = 'https://arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/HAWL642GUZDBHOOXFQF7OEJJSA.jpg'
prediccion = categorizar (url)
print(prediccion) """



""" @app.post("/")
def categorizar(url):
    respuesta = requests.get(url)
    img = Image.open(BytesIO(respuesta.content))
    img = np.array(img).astype(float)/255
    img = cv2.resize(img, (224,224))
    prediccion = model(img.reshape(-1, 224, 224, 3))
    return np.argmax(prediccion[0], axis=-1), prediccion
 """
 
app = FastAPI()

@app.post("/resultado")
async def categorizar(file: UploadFile = File(...)):
    respuesta = await file.read()
    img = Image.open(BytesIO(respuesta.content))
    img = np.array(img).astype(float)/255
    img = cv2.resize(img, (224,224))
    prediccion = model(img.reshape(-1, 224, 224, 3))
    return {"la prediccion es ": np.argmax(prediccion[0], axis=-1), "prediccion": prediccion}
