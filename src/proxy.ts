import { Inject, Injectable, Req, Res, Logger } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Request, Response } from 'express';
import { JSONObject, TYPES } from './types';
import { prepGRPCPayload } from './utils/helper';
import { handleError, success } from './utils/response';

@Injectable()
export class ProxyService {
  private readonly userSvc: any;
  private readonly authSvc: ClientGrpc;

  constructor(
    @Inject(TYPES.USER_SVC) private readonly userClient: ClientGrpc,
    @Inject(TYPES.AUTH_SVC) private readonly authClient: ClientGrpc,
  ) {
    this.authSvc = this.authClient.getService('AuthService');
    this.userSvc = this.userClient.getService('UserService');
  }

  async send(
    @Req() req: Request,
    @Res() res: Response,
    service: string,
    endpoint: string,
    data: JSONObject = {},
    returnHttpResponse = true,
  ): Promise<any> {
    let svc = null;
    switch (service) {
      case TYPES.USER_SVC:
        svc = this.userSvc;
        break;
      case TYPES.AUTH_SVC:
        svc = this.authSvc;
        break;
      default:
        throw new Error('Invalid service name');
    }

    try {
      const { data: reqData, grpcMetadata } = prepGRPCPayload(req, data);
      const response = await svc[endpoint](reqData, grpcMetadata).toPromise();
      if (!returnHttpResponse) {
        return response;
      }

      return success(res, response);
    } catch (err) {
      Logger.error(
        err,
        `Error making grpc call to microservice: ${service} - endpoint: ${endpoint} - ${JSON.stringify(
          this.removeSensititiveDetails(data),
        )} `,
      );
      handleError(res, err.message);
    }
  }

  removeSensititiveDetails(data): any {
    delete data.password;
    delete data.otp;
    delete data.token;
    return data;
  }
}
