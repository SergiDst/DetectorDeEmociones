from fastapi import FastAPI, File, UploadFile, Form, Depends
from starlette.responses import HTMLResponse
import tensorflow as tf
import tensorflow_hub as hub
from PIL import Image
import requests
from io import BytesIO
import cv2
import numpy as np
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from dataclasses import dataclass

with tf.keras.utils.custom_object_scope({'KerasLayer': hub.KerasLayer}):
    model = tf.keras.models.load_model('modelo/modelo_entrenado.h5')

""" def categorizar(url):
  url = data.get("url")
  respuesta = requests.get(url)
  img = Image.open(BytesIO(respuesta.content))
  img = np.array(img).astype(float)/255
  img = cv2.resize(img, (224,224))
  prediccion = model.predict(img.reshape(-1, 224, 224, 3))
  return np.argmax(prediccion[0], axis=-1), prediccion

url = 'https://www.tophoy.com/wp-content/uploads/2019/06/mujer-llorando.jpg'
prediccion = categorizar (url)
print(prediccion) """


app = FastAPI()

origins = [
   "http://127.0.0.1:5500",
   "http://localhost:5500"
]  

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@dataclass
class SimpleModel:
    filetest: UploadFile = Form(...)

@app.post("/resultado")
async def categorizar(form_data: SimpleModel = Depends()):
  """ respuesta = requests.get(url)
  img = Image.open(BytesIO(file))
  img = np.array(img).astype(float)/255
  img = cv2.resize(img, (224,224))
  prediccion = model.predict(img.reshape(-1, 224, 224, 3))
  return np.argmax(prediccion[0], axis=-1), prediccion """
  return { 'filename': form_data.filetest.file}
 