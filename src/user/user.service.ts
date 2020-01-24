import { Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  
  async createUser(user: Partial<User>): Promise<User> {
    return this.userModel.create(user);
  }
  
  async findByUsername(username: String): Promise<User> {
    return this.userModel.findOne({username})
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }
}
