import { IsUrl } from 'class-validator';

export class CreateUrlDto {
  @IsUrl({ require_protocol: true })
  url: string;
}
