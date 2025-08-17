# import json
# from channels.generic.websocket import AsyncWebsocketConsumer
# from asgiref.sync import sync_to_async
# from django.contrib.auth import get_user_model
# from django.apps import apps



# class ChatConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         await self.accept()

#     async def receive(self, text_data):
#         try:
#             data = json.loads(text_data)
#             sender_username = data.get('sender')
#             receiver_username = data.get('receiver')
#             message_text = data.get('message')

            
            
#             User = get_user_model()
#             Message = apps.get_model('connect', 'Message')
#             # Validate sender and receiver
#             sender = await sync_to_async(User.objects.get)(username=sender_username)
#             receiver = await sync_to_async(User.objects.get)(username=receiver_username)

#             # Save message to database
#             message = await sync_to_async(Message.objects.create)(
#                 sender=sender,
#                 receiver=receiver,
#                 content=message_text
#             )

#             # Broadcast message
#             await self.send(text_data=json.dumps({
#                 'sender': sender.username,
#                 'receiver': receiver.username,
#                 'message': message.content,
#             }))

#         except User.DoesNotExist:
#             await self.send(text_data=json.dumps({'error': 'User not found'}))
#         except json.JSONDecodeError:
#             await self.send(text_data=json.dumps({'error': 'Invalid message format'}))

#     async def disconnect(self, close_code):
#         pass
