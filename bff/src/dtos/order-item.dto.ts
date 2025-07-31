import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsString, IsUUID, Min } from "class-validator";

export class OrderItemDto {
    @ApiProperty({ example: '7e2d3c91-3e5a-4df6-a70e-95b87170e55d' })
    @IsUUID()
    product_id: string;

    @ApiProperty({ example: 'Camiseta Branca' })
    @IsString()
    @IsNotEmpty({ message: "Campo nome do produto obrigatório" })
    product_name: string;

    @ApiProperty({ example: 2 })
    @IsInt({ message: "Campo quantidade deve ser um número inteiro" })
    @Min(1, { message: "Campo quantidade deve ser um número maior que 0" })
    @Type(() => Number)
    quantity: number;

    @ApiProperty({ example: 49.90 })
    @IsNumber({ maxDecimalPlaces: 2 }, { message: "Campo preço unitário deve ter no máximo 2 casas decimais" })
    @Type(() => Number)
    unit_price: number;
}