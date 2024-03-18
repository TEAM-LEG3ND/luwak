import { InjectRedis } from '@nestjs-modules/ioredis';
import { randomUUID } from 'crypto';
import { Redis } from 'ioredis';

export class RedisLockService {
  private lockUuid: string;

  constructor(@InjectRedis() private readonly redis: Redis) {
    this.lockUuid = randomUUID();
  }

  async lockOnce(name: string, expire: number) {
    const result = await this.redis.set(this.getPrefix(name), this.lockUuid, 'PX', expire, 'NX');
    console.log(`lock: ${name}, result: ${result}`);
    return result !== null;
  }

  async lock(
    name: string,
    expire: number = 60000,
    retryInterval: number = 100,
    maxRetryTimes: number = 600,
  ): Promise<void> {
    let retryTimes = 0;
    while (true) {
      if (await this.lockOnce(name, expire)) {
        break;
      } else {
        await this.sleep(retryInterval);
        if (retryTimes >= maxRetryTimes) {
          throw new Error(`locking ${name} timeout`);
        }
        retryTimes++;
      }
    }
  }

  async unlock(name: string) {
    const result = await this.redis.eval(
      "if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del', KEYS[1]) else return 0 end",
      1,
      this.getPrefix(name),
      this.lockUuid,
    );
    console.log(`unlock: ${name}, result: `, result);
  }

  private sleep(ms: number): Promise<Function> {
    return new Promise((resolve) => setTimeout(resolve, Number(ms)));
  }

  private getPrefix(name: string): string {
    return `luwak:${name}`;
  }
}
