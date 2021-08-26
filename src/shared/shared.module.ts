import { Module } from '@nestjs/common';

import { JwtService } from './services/jwt/jwt.service';

@Module({
  exports: [JwtService]
})
export class SharedModule {}
