import asyncio
import websockets

async def upload(websocket, path):
      async for message in websocket:
        message = "I got your message: {}".format(message)
        await websocket.send(message)

print("[BDT] Server Running")
asyncio.get_event_loop().run_until_complete(websockets.serve(upload, 'localhost', 10086))
asyncio.get_event_loop().run_forever()
