import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Health check da aplicação' })
  @ApiOkResponse({
    description: 'Aplicação saudável',
    schema: {
      example: {
        status: 'ok',
        timestamp: '2026-03-10T14:00:00.000Z',
      },
    },
  })
  check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
