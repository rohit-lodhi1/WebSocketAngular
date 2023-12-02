import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';
import * as SockJS from 'sockjs-client';
import { ChatMessage } from '../models/chat-message';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {


  constructor() { }
  private stompClient: any;

  messageReceived: Subject<ChatMessage> = new Subject<ChatMessage>();
  messageData: Observable<ChatMessage> = this.messageReceived.asObservable();
  initializeWebSocketConnection() {
    const socket = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(socket);

    this.connect();
  }

  connect() {
    this.stompClient.connect({}, (frame: string) => {
      console.log('Connected: ' + frame);
      this.stompClient.subscribe('/topic/public', (messages: { body: any; }) => {
        // Handle incoming messages
        console.log(messages);
        this.messageReceived.next(JSON.parse(messages.body).body);
      });
    });
  }

  disConnect() {
    this.stompClient.disconnect();
  }
  sendMessage(message: ChatMessage) {
    this.stompClient.send('/app/chat', {}, JSON.stringify(message));
  }
}
