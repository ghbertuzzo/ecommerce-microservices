import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AddressDto {
    @IsString()
    @IsNotEmpty({ message: "Campo rua obrigatório" })
    street: string;

    @IsNotEmpty({ message: "Campo número obrigatório" })
    @Type(() => String)
    number: string;

    @IsOptional()
    @IsString()
    complement?: string;

    @IsString()
    @IsNotEmpty({ message: "Campo cidade obrigatório" })
    city: string;

    @IsString()
    @IsNotEmpty({ message: "Campo estado obrigatório" })
    state: string;

    @IsString()
    @IsNotEmpty({ message: "Campo CEP obrigatório" })
    postalCode: string;
}