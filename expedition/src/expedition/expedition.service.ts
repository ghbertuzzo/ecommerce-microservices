import { InjectRepository } from "@nestjs/typeorm";
import { Address } from "./entities/address.entity";
import { Delivery } from "./entities/delivery.entity";
import { Repository } from "typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateDeliveryDto } from "./dtos/create-delivery.dto";
import { DeliveryStatus } from "./enums/delivery-status.enum";

@Injectable()
export class ExpeditionService {
    constructor(
        @InjectRepository(Address) private readonly addressRepository: Repository<Address>,
        @InjectRepository(Delivery) private readonly deliveryRepository: Repository<Delivery>,
    ) { }

    async handleProcess(createDto: CreateDeliveryDto) {
        const address = this.addressRepository.create(createDto.address);
        await this.addressRepository.save(address);

        const trackingCode = this.generateTrackingCode();

        const delivery = this.deliveryRepository.create({
            ...createDto,
            address,
            trackingCode,
            deliveryStatus: DeliveryStatus.IN_TRANSIT,
        });

        return await this.deliveryRepository.save(delivery);
    }

    async create(createDto: CreateDeliveryDto): Promise<Delivery> {
        const address = this.addressRepository.create(createDto.address);
        await this.addressRepository.save(address);

        const delivery = this.deliveryRepository.create({ ...createDto, address });
        return await this.deliveryRepository.save(delivery);
    }

    async getById(id: string): Promise<Delivery> {
        const delivery = await this.deliveryRepository.findOne({
            where: { id },
            relations: ['address'],
        });

        if (!delivery) {
            throw new NotFoundException(`Delivery with id ${id} not found`);
        }

        return delivery;
    }

    async findByOrderId(orderId: string): Promise<Delivery> {
        const delivery = await this.deliveryRepository.findOne({ where: { orderId } });
        if (!delivery) {
            throw new NotFoundException(`Delivery with orderId ${orderId} not found`);
        }
        return delivery;
    }

    async getAll(): Promise<Delivery[]> {
        return await this.deliveryRepository.find({
            relations: ['address'],
        });
    }

    private generateTrackingCode(): string {
        const letters = () =>
            String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
            String.fromCharCode(65 + Math.floor(Math.random() * 26));
        const numbers = () =>
            Math.floor(100000000 + Math.random() * 900000000).toString();
        return `${letters()}${numbers()}BR`;
    }
}