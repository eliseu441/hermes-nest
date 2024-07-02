import {
    IsNotEmpty,
    MinLength,
  } from 'class-validator';
  
  const passwordRegEx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;
  
  export class CreateHermesDto {
    @IsNotEmpty()
    @MinLength(3, { message: 'filme deve conter ao menos 3 caracteres.' })
    filme: string;
  
  }