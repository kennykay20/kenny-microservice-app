import { Controller, Inject, Post, Req, Res } from '@nestjs/common';
import { ProxyService } from '../proxy';
import { CacheService } from '../common/cache/cache.service';
import { Request, Response } from 'express';
import { TYPES } from '../types';

@Controller('/v1/users')
export class UserController {
  constructor(
    @Inject(ProxyService) private readonly proxyService: ProxyService,
    @Inject(CacheService) private readonly cacheService: CacheService,
  ) {}

  @Post('/')
  async create(@Req() req: Request, @Res() res: Response) {
    return this.proxyService.send(
      req,
      res,
      TYPES.USER_SVC,
      'createNewUser',
      req.body,
    );
  }
}
