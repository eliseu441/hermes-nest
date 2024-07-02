import { PartialType } from '@nestjs/mapped-types';
import { CreateHermesDto } from './create-hermes.dto';

export class UpdateHermesDto extends PartialType(CreateHermesDto) {}
