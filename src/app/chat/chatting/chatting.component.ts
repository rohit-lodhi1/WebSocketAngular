import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/Services/web-socket.service';
import { ChatMessage } from 'src/app/models/chat-message';

@Component({
  selector: 'app-chatting',
  templateUrl: './chatting.component.html',
  styleUrls: ['./chatting.component.scss']
})
export class ChattingComponent implements OnInit{

  message: ChatMessage=new ChatMessage();
messages:ChatMessage[]=[];
  constructor(private webSocketService: WebSocketService) {}

  ngOnInit() {
    this.webSocketService.initializeWebSocketConnection();
    this.webSocketService.messageData.subscribe((message: ChatMessage) => {

      this.messages.push(message);
    });
  }

connect(){
  this.webSocketService.initializeWebSocketConnection();
}

  sendMessage() {
    this.webSocketService.sendMessage(this.message);
    this.message = new ChatMessage();
  }

  disconnect(){
    this.webSocketService.disConnect();
  }
  
}
