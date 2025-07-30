import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsString, IsUUID, Min } from "class-validator";

export class OrderItemDto {
    @IsUUID()
    product_id: string;

    @IsString()
    @IsNotEmpty({ message: "Campo nome do produto obrigatório" })
    product_name: string;

    @IsInt({ message: "Campo quantidade deve ser um número inteiro" })
    @Min(1, { message: "Campo quantidade deve ser um número maior que 0" })
    @Type(() => Number)
    quantity: number;

    @IsNumber({ maxDecimalPlaces: 2 }, { message: "Campo preço unitário deve ter no máximo 2 casas decimais" })
    @Type(() => Number)
    unit_price: number;
}