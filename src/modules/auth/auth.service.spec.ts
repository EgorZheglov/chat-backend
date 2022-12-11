import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import * as jwt from 'jsonwebtoken';
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from '../../global-config';
import { IRefreshTokenPayload } from './interfaces/refresh-token-payload.interface';
import { ISignInResponse } from './interfaces/signin-response.interface';

describe('AuthController', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    })
      .useMocker((token) => {
        if (token === UserService) {
          return {
            findByUsername: jest.fn().mockResolvedValue(true),
            findById: jest.fn().mockResolvedValue({
              username: 'name',
              id: '123',
              password: '123',
            }),
          };
        }
      })
      .compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should validate access token', () => {
    const testUser = {
      username: 'name',
      id: '123',
      password: '123',
    };
    const token = jwt.sign(
      { id: testUser.id, password: testUser.password },
      JWT_ACCESS_SECRET,
    );
    const payload = service.verifyAccessToken(token);

    expect(payload.id).toEqual(testUser.id);
  });

  it('should validate refreshed tokens', async () => {
    const testUser = {
      username: 'name',
      id: '123',
      password: '123',
    };
    const token = jwt.sign(
      { id: testUser.id, password: testUser.password },
      JWT_REFRESH_SECRET,
    );
    const tokens: ISignInResponse = await service.refreshTokens(token);

    const payload = service.verifyAccessToken(tokens.accessToken);

    expect(payload.id).toEqual(testUser.id);
    expect(payload.username).toEqual(testUser.username);
  });
});
