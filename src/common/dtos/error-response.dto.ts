import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({ example: false })
  success: boolean;

  @ApiProperty({ example: 404 })
  statusCode: number;

  @ApiProperty({ example: 'RESOURCE_NOT_FOUND' })
  error: string;

  @ApiProperty({ example: 'Usuário não encontrado' })
  message: string | string[];

  @ApiProperty({ example: '/api/users/123' })
  path: string;

  @ApiProperty({ example: '2026-03-10T14:00:00.000Z' })
  timestamp: string;
}
