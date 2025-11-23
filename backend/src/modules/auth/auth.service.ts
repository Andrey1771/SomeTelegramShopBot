import { z } from 'zod';
import crypto from 'crypto';
import { UserDto } from '../../common/dtos';

const telegramAuthSchema = z.object({
  hash: z.string(),
});

export class AuthService {
  async verifyTelegramInitData(initData: Record<string, string>): Promise<UserDto> {
    telegramAuthSchema.parse(initData);

    const userId = initData['id'] ?? crypto.randomUUID();

    return {
      id: userId.toString(),
      telegramId: initData['id'] ?? userId,
      username: initData['username'],
      firstName: initData['first_name'],
      lastName: initData['last_name'],
      role: 'buyer',
    };
  }
}
