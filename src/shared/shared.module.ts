import { Module } from '@nestjs/common';

import { JwtService } from './services/jwt/jwt.service';

@Module({
  providers: [JwtService],
  exports: [JwtService]
})
export class SharedModule {}
