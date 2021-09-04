
import { Injectable } from '@nestjs/common';

@Injectable()
export class SocketService {
  server = null;
  send = null;
}