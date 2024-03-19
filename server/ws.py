#!/usr/bin/env python

import json
import asyncio
import websockets
import json
from urllib.parse import unquote
rooms = {}

    #room_name = unquote(path.strip("/"))    

    #if room_name not in rooms:
    #    rooms[room_name] = set()
    
    #rooms[room_name].add(websocket)

import pathlib
import ssl
#ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
#localhost_pem = pathlib.Path(__file__).with_name("key_cert.pem")
#ssl_context.load_cert_chain(localhost_pem)


clients = set()
async def socket(message):
    for client in clients:
            await client.send(message)

async def broadcast(message):
    i=len(clients)
    massmessage = message
    await socket(massmessage)


async def handle_client(websocket, path):
    clients.add(websocket)
    try:
        async for message in websocket:
            await broadcast(message)
    finally:
        clients.remove(websocket)

async def start_server():
    async with websockets.serve(handle_client, "0.0.0.0", 8765): #, ssl=ssl_context):
        await asyncio.Future()  # Run forever

asyncio.run(start_server())