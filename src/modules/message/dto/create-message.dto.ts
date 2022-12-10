export class CreateMessageDTO {
  readonly consumerId: string;
  readonly data: string;
  readonly timestamp: Date;
  readonly producerId: string;
}
