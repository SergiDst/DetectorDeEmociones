from fastapi import FastAPI, File, UploadFile, Form, Depends
from starlette.responses import HTMLResponse
import tensorflow as tf
import tensorflow_hub as hub
from PIL import Image
import requests
from io import BytesIO
import io
import cv2
import numpy as np
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from dataclasses import dataclass

with tf.keras.utils.custom_object_scope({'KerasLayer': hub.KerasLayer}):
    model = tf.keras.models.load_model('modelo/modelo_entrenado.h5')

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
  archivo = form_data.filetest.file
  img = Image.open(archivo).convert("RGB")
  img = np.array(img).astype(float)/255
  img = cv2.resize(img, (224,224))
  prediccion = model.predict(img.reshape(-1, 224, 224, 3))
  print(prediccion)
  finalPrediccion = np.argmax(prediccion[0])
  return int(finalPrediccion)
 