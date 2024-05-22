from fastapi import FastAPI, File, UploadFile
import tensorflow as tf
import tensorflow_hub as hub
from PIL import Image
import requests
from io import BytesIO
import cv2
import numpy as np
from pydantic import BaseModel

with tf.keras.utils.custom_object_scope({'KerasLayer': hub.KerasLayer}):
    model = tf.keras.models.load_model('./API/modelo/modelo_entrenado.h5')

def categorizar(url):
  """ url = data.get("url") """
  respuesta = requests.get(url)
  img = Image.open(BytesIO(respuesta.content))
  img = np.array(img).astype(float)/255
  img = cv2.resize(img, (224,224))
  prediccion = model.predict(img.reshape(-1, 224, 224, 3))
  return np.argmax(prediccion[0], axis=-1), prediccion

url = 'https://www.tophoy.com/wp-content/uploads/2019/06/mujer-llorando.jpg'
prediccion = categorizar (url)
print(prediccion)


""" app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

class ImageData(BaseModel):
    url: str 

@app.post("/resultado")
async def categorizar(data: ImageData):
  url = data.get("url")
  respuesta = requests.get(url)
  img = Image.open(BytesIO(respuesta.content))
  img = np.array(img).astype(float)/255
  img = cv2.resize(img, (224,224))
  prediccion = model.predict(img.reshape(-1, 224, 224, 3))
  return np.argmax(prediccion[0], axis=-1), prediccion  """
 