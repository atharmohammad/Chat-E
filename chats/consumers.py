import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatRoomConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name'] #Extractig the room_name
        self.room_group_name = 'chats_%s' % self.room_name   #Giving a Group name

        await self.channel_layer.group_add( #Adding the group in user
            self.room_group_name,
            self.channel_name
        )

        await self.accept() #accept to connect
    #
    #     await self.channel_layer.group_send(    #To send message in group
    #         self.room_group_name,
    #         {
    #             'type':'tester_message',    #This type is will be the name of function calls
    #             'tester':'Hello Group'
    #         }
    #     )
    #
    # async def tester_message(self,event):
    #     tester = event['tester']
    #
    #     await self.send(text_data=json.dumps({
    #         'tester': tester
    #     }))

    async  def disconnect(self,close_code):
        #Leave room group
        await self.channel_layer.group_discard( #discarding the group by giving it the group and channel name
            self.room_group_name,
            self.channel_name
        )
    async def receive(self,text_data=None,bytes_data=None):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        username = text_data_json['username']
        way = text_data_json['way']
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type':'chat_message',    #This type is will be the name of function calls
                'message': message,
                'username':username,
                'way':way
            }
        )
    async def chat_message(self,event):
        message  = event['message']
        username = event['username']
        type = event['type']
        way = event['way']
        await self.send(text_data=json.dumps({
            'message' : message,
            'type' : type,
            'username' : username,
            'way':way
        }))
