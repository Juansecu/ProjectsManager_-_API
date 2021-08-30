import { Injectable } from '@nestjs/common';
import { verify } from 'jsonwebtoken';

@Injectable()
export class JwtService {
  verifyToken(token: string) {
    return verify(token, process.env.JWT_SECRET);
  }
}
