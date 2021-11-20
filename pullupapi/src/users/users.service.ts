import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) { }

  async create(user: User) {
    this.repo.save(user);
  }

  async findAll() {
    return this.repo.find();
  }

  async findRange(id: number, range: number){
    var repoSize = await(this.repo.count());
    if(repoSize <= range) return this.findAll();

    var orderedByScores = await(this.repo.find({
      order: {
        score: "DESC"
      }
    }));

    var midpoint = -1;
    for(let i = 0; i < repoSize; i++){
      if(orderedByScores[i].id == id){
        midpoint = i;
        break;
      }
    }
    if(midpoint == -1) return null;

    var count = 0;
    var min = midpoint;
    var max = midpoint;
    while(count < range){
      if(max < repoSize){
        max++;
        count++;
      }
      if(count == range) break;
      if(min > 0){
        min--;
        count++;
      }
    }

    return this.repo.find({
      order: {
        score: "DESC"
      },
      take: range,
      skip: min
    });
  }

  async findTop(range: number){
    if(await(this.repo.count()) <= range) return this.findAll();
    var ids = [];
    for(let i = 1; i <= range; i++)
      ids.push(i);
    return this.repo.find({
      order: {
        score: "DESC"
      },
      take: range
    });
  }

  async findOne(id: number) {
    return this.repo.findOne(id);
  }

  async update(id: number, user: User) {
    this.repo.update(id, user);
  }

  async remove(id: number) {
    this.repo.delete(id);
  }
}
