#!/usr/bin/env python

import json
import asyncio
import websockets
import json
from urllib.parse import unquote
rooms = {}

async def handle_client(websocket, path):
    
    room_name = unquote(path.strip("/"))    

    if room_name not in rooms:
        rooms[room_name] = set()
    
    rooms[room_name].add(websocket)

    try:
        async for message in websocket:
            for client in rooms[room_name]:
                await client.send(message)
    finally:
        room_name = path.strip("/")
        rooms[room_name].remove(websocket)
        if len(rooms[room_name]) == 0:
            rooms.pop(room_name)

async def start_server():
    async with websockets.serve(handle_client, "localhost", 8765): #, ssl=ssl_context):
        await asyncio.Future()  # Run forever

asyncio.run(start_server())
