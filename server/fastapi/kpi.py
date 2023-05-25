import joblib
import cv2
import time
import numpy as np
import random
import os

kmeans = joblib.load("kmeans.joblib")
w = joblib.load("w.joblib")
h = joblib.load("h.joblib")
height = joblib.load("height.joblib")
width = joblib.load("width.joblib")

def convertVideoToFrame(assignedWorkplace):
    filePath="../../workplaceVideos/"+str(assignedWorkplace)
    videoFile = None

    for file in os.listdir(filePath):
      if file.endswith(".mp4") or file.endswith(".mov"):
          videoFile = file
          break

    if videoFile!=None:
      vidcap = cv2.VideoCapture(filePath+ "/" + videoFile)
      imageFilePath = os.path.join(filePath, "img.jpg")
      # totalFrames = int(vidcap.get(cv2.CAP_PROP_FRAME_COUNT))
      # success,image = vidcap.read()
      # count = 0
      # #define framerate
      # prev = 0
      # frame=0
      # imageLimit=1
      # vidcap.set(cv2.CAP_PROP_POS_FRAMES, random.randint(0, totalFrames-1))
      # count=0
      # while success and count<imageLimit:
      #     print("video found")
      #     cv2.imwrite(imageFilePath, image)     # save frame as JPEG file      
      #     #print('Read a new frame: ', success)
      #     count=count+1  
      # vidcap.release()
      # cv2.destroyAllWindows()

      total_frames = vidcap.get(cv2.CAP_PROP_FRAME_COUNT)

      random.seed(time.time() + 1)
      random_frame = random.randint(0, total_frames)
      vidcap.set(cv2.CAP_PROP_POS_FRAMES, random_frame)

      ret, frame = vidcap.read()

      cv2.imwrite(imageFilePath, frame)
    else:
      convertVideoToFrame("BK-1")

def getKPIFromFrame(assignedWorkplace):
    try:
      imagePath="../../workplaceVideos/"+str(assignedWorkplace)+"/img.jpg"
      print("Testing activity of image: "+imagePath)
      image = cv2.imread(imagePath)
      image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
      #resize
      dim = (width, height)
      resized = cv2.resize(image, dim, interpolation = cv2.INTER_AREA)
      
      rows,cols=resized.shape #normal shape
      img_size = rows*cols
      img_1D_vector = resized.reshape(img_size)
      
      kpi = kmeans.predict(np.matmul(np.transpose(img_1D_vector.reshape(-1,1)), np.transpose(h)))[0]
    except cv2.error:
      kpi= getKPIFromFrame("BK-1")


    return kpi

def convertStreamToFrame(assignedWorkplace, workplace):
    try:
      filePath="../../workplaceVideos/"+str(assignedWorkplace)
      videoFile = None
      vcap = cv2.VideoCapture(workplace['cameraURL'])
      imageFilePath = os.path.join(filePath, "img.jpg")
      ret, frame = vcap.read()
      cv2.imwrite(imageFilePath, frame) 
    except cv2.error:
      print("Stream not found")

async def getKpiScore(assignedWorkplace, database):
  
  query = "SELECT * FROM Cameras WHERE workplaceName=:workplaceName"
  values = {"workplaceName": assignedWorkplace}
  workplace = await database.fetch_one(query, values)

  if workplace and workplace.cameraURL:
    convertStreamToFrame(assignedWorkplace, workplace)
  else:
    convertVideoToFrame(assignedWorkplace)
  return getKPIFromFrame(assignedWorkplace)