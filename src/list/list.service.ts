import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { List } from "./list";
import { createListDto } from "./dto/createList.dto";
import { updateListDto } from "./dto/updateListDto";

@Injectable()
export class ListService {
  constructor(@InjectModel("List") private list: Model<List>) {}

  async findByOwner(ownerId: String): Promise<List[]> {
    return this.list.find({ ownerId });
  }

  async createList(list: createListDto): Promise<List> {
    return this.list.create(list);
  }

  async updateList(
    _id: String,
    ownerId: String,
    list: updateListDto
  ): Promise<List | null> {
    const foundList = await this.list.findOne({ _id, ownerId });
    if (!foundList) return null;
    return await foundList.set(list).save();
  }

  async deleteById(_id: String, ownerId: String) {
    return this.list.deleteOne({ _id, ownerId });
  }
}
