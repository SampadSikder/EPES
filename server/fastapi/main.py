import os
from fastapi import FastAPI
from databases import Database
from kpi import *
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import asyncio

workplace_stats = {}


app=FastAPI()
database = Database("mysql+aiomysql://root:password@127.0.0.1:3306/EPES")
origins = ["http://localhost:3000"]  # Replace with your client's origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event('startup')
async def database_connect():
    await database.connect()
    await startMonitoring()

@app.post('/assign')
async def createWorkplace(workplaceName):
    try:
        os.mkdir("../../workplaceVideos/"+str(workplaceName))
    except:
        print("Failed to create folder for workstation "+str(workplaceName))


async def startMonitoring():
    while True:
        query = "SELECT WorkerWorkerID, assignedWorkplace, monitoringStatus FROM Assignments"
        assignments = await database.fetch_all(query)
        print(assignments)
        await kpiLogging(assignments)
        await asyncio.sleep(15)  #15 second sleep


# def kpiLogging(assignments):
#     assignment_list = []
#     for assignment in assignments:
#         assignment_dict = {
#             "WorkerWorkerID": assignment[0],
#             "assignedWorkplace": assignment[1],
#             "monitoringStatus": assignment[2],
#         }
#         assignment_list.append(assignment_dict)
    
#     for assignment in assignment_list:
#         if assignment['monitoringStatus']:
#             if assignment['assignedWorkplace'] not in workplace_stats:
#                 workplace_stats[assignment['assignedWorkplace']] = {
#                     "start_time": datetime.now(),
#                     "total_kpi": 0
#                 }
#             kpi = getKpiScore(assignment['assignedWorkplace'])
#             print(kpi)
#             if kpi==1:
#                 print("Currently working")
#                 workplace_stats[assignment['assignedWorkplace']]['total_kpi'] += kpi
#             else:
#                 print("Not working")
#         elif assignment['assignedWorkplace'] in workplace_stats:
#             total_time = (datetime.now() - workplace_stats[assignment['assignedWorkplace']]['start_time']).total_seconds()
#             total_kpi = workplace_stats[assignment['assignedWorkplace']]['total_kpi']
#             # TODO: Calculate total KPI score for the time duration and log it to database
#             del workplace_stats[assignment['assignedWorkplace']]

async def kpiLogging(assignments):
    tasks = []
    for assignment in assignments:
        print(assignment['monitoringStatus'])
        asyncio.sleep(0)
        if assignment['monitoringStatus']:
            print("Monitoring")
            if assignment['assignedWorkplace'] not in workplace_stats:
                workplace_stats[assignment['assignedWorkplace']] = {
                    "start_time": datetime.now(),
                    "total_kpi": 0
                }
            tasks.append((assignment, asyncio.create_task(getKpiScore(assignment['assignedWorkplace']))))
    
    results = await asyncio.gather(*[t[1] for t in tasks])
    
    for assignment, kpi in zip(assignments, results):
        if assignment['monitoringStatus']:
            if kpi == 1:
                print("Currently working")
                workplace_stats[assignment['assignedWorkplace']]['total_kpi'] += kpi
            else:
                print("Not working")
        elif assignment['assignedWorkplace'] in workplace_stats:
            total_time = (datetime.now() - workplace_stats[assignment['assignedWorkplace']]['start_time']).total_seconds()
            total_kpi = workplace_stats[assignment['assignedWorkplace']]['total_kpi']
           
            workerQuery = "SELECT workerID, kpi FROM Workers"

            workerList = await database.fetch_all(workerQuery)

            for worker in workerList:
                if worker.workerID == assignment['WorkerWorkerID']:
                    old_kpi=worker.kpi
                    print(old_kpi)
                    if old_kpi!=None:
                        new_kpi=old_kpi*0.3+(total_kpi/(total_time/100))*0.7 #assign weights
                    else:
                        new_kpi=(total_kpi/(total_time/100))
                    updateQuery="Update Workers set kpi=:kpi where workerID=:workerID"
                    values={"kpi":new_kpi, "workerID":worker.workerID}
                    await database.execute(query=updateQuery, values=values)

            del workplace_stats[assignment['assignedWorkplace']]