import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async create(createItemDto: CreateItemDto) {
    const item = this.itemRepository.create({ ...createItemDto });
    return await this.itemRepository.save(item);
  }

  async findAll() {
    return await this.itemRepository.find();
  }

  async findOne(id: number) {
    const item = await this.itemRepository.findOneBy({ id });

    if (!item) {
      throw new BadRequestException('Item was not found');
    }

    return item;
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const item = await this.itemRepository.findOneBy({ id });

    if (!item) {
      throw new BadRequestException('Item was not found');
    }

    await this.itemRepository.update({ id }, { ...updateItemDto });

    return { ...item, ...updateItemDto };
  }

  async remove(id: number) {
    const item = await this.itemRepository.findOneBy({ id });

    if (!item) {
      throw new BadRequestException('Item was not found');
    }

    await this.itemRepository.delete({ id });

    return item;
  }
}
