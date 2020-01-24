import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { List } from './list';
import { createListDto } from './dto/createList.dto';

@Injectable()
export class ListService {
  constructor(
    @InjectModel('List') private list: Model<List>
  ) {}

  async findAll(): Promise<List[]> {
    return this.list.find();
  }

  async createList(list: createListDto): Promise<List> {
    return this.list.create(list);
  }

  async updateList(id: String, list: Partial<List>): Promise<List> {
    return this.list.findByIdAndUpdate(id, list);
  }
  
  async deleteById(id: String) {
    return this.list.deleteOne({_id: id});
  }
}

