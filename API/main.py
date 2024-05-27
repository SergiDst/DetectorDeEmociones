from fastapi import FastAPI, File, UploadFile, Form, Depends, HTTPException
from starlette.responses import StreamingResponse
import tensorflow as tf
import tensorflow_hub as hub
from PIL import Image
import cv2
import numpy as np
from fastapi.middleware.cors import CORSMiddleware
from dataclasses import dataclass
from fastapi.responses import StreamingResponse

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

camera = cv2.VideoCapture(0)
frame = None

def generate_frames():
    global frame
    while True:
        success, frame = camera.read()  # read the camera frame
        if not success:
            break
        else:
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@dataclass
class SimpleModel:
    filetest: UploadFile = Form(...)

@app.post("/archivo")
async def categorizar(form_data: SimpleModel = Depends()):
  archivo = form_data.filetest.file
  img = Image.open(archivo).convert("RGB")
  img = np.array(img).astype(float)/255
  img = cv2.resize(img, (224,224))
  prediccion = model.predict(img.reshape(-1, 224, 224, 3))
  prediccion_imagen = prediccion[0]
  suma = sum(prediccion_imagen)
  print(prediccion[0])
  if suma >= 1:
    finalPrediccion = np.argmax(prediccion[0])
    print(suma)
  else:
    print(suma)
    finalPrediccion = 3
  return int(finalPrediccion)
 
@app.get("/video")
async def video_feed():
    return StreamingResponse(generate_frames(), media_type="multipart/x-mixed-replace;boundary=frame")

@app.post("/foto")
async def snapshot():
    global frame
    if frame is None:
        raise HTTPException(status_code=500, detail="No frame available")
    else:
        camera.release()
        return StreamingResponse(frame, media_type="image/jpeg")