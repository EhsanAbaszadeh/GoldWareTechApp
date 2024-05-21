import { Component, OnInit, OnDestroy } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private hubConnection: signalR.HubConnection;
  public responseCode: string | null = null;

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.backendUrl}/messageHub`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();
  }

  ngOnInit(): void {
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));

    this.hubConnection.on('ReceiveMessage', (message: string) => {
      this.responseCode = message;
    });
  }

  sendMessage(message: string): void {
    if (message.length <= 20) {
      this.hubConnection
        .invoke('SendMessage', message)
        .then(() => console.log('Message sent successfully'))
        .catch(err => console.error('Error sending message: ', err));
    } else {
      console.error('Message length exceeds 20 characters');
    }
  }

  ngOnDestroy(): void {
    this.hubConnection.stop().catch(err => console.error(err));
  }
}
