import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import * as https from 'https';


import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
  imports: [HttpModule.register({
        timeout: 3000,
        maxRedirects: 5,
        httpsAgent: new https.Agent({
            rejectUnauthorized: false,
        }),
  })],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AppModule {}
