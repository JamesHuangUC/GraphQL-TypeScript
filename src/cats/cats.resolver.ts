import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CatsService } from './cats.service';
import { CatType } from './dto/create-cat.dto';
import { CatInput } from './inputs/cat.input';

@Resolver()
export class CatsResolver {
  constructor(private readonly catsService: CatsService) {}

  @Query(() => String)
  async hello() {
    return 'hello';
  }

  @Query(() => CatType)
  async cat(@Args('id') id: string) {
    return this.catsService.findOne(id);
  }

  @Query(() => [CatType])
  async cats() {
    return this.catsService.findAll();
  }

  @Mutation(() => CatType)
  async createCat(@Args('input') input: CatInput) {
    return this.catsService.create(input);
  }

  @Mutation(() => CatType)
  async updateCat(@Args('id') id: string, @Args('cat') cat: CatInput) {
    return this.catsService.update(id, cat);
  }

  @Mutation(() => CatType)
  async deleteCat(@Args('id') id: string) {
    return this.catsService.delete(id);
  }
}
