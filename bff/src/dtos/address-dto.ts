import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AddressDto {
    @ApiProperty({ example: 'Rua das Flores' })
    @IsString()
    @IsNotEmpty({ message: "Campo rua obrigatório" })
    street: string;

    @ApiProperty({ example: '123' })
    @IsNotEmpty({ message: "Campo número obrigatório" })
    @Type(() => String)
    number: string;

    @ApiProperty({ example: 'Apto 101', required: false })
    @IsOptional()
    @IsString()
    complement?: string;

    @ApiProperty({ example: 'São Paulo' })
    @IsString()
    @IsNotEmpty({ message: "Campo cidade obrigatório" })
    city: string;

    @ApiProperty({ example: 'SP' })
    @IsString()
    @IsNotEmpty({ message: "Campo estado obrigatório" })
    state: string;

    @ApiProperty({ example: '01234-567' })
    @IsString()
    @IsNotEmpty({ message: "Campo CEP obrigatório" })
    postalCode: string;
}