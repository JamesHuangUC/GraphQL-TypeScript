import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class CatInput {
  @Field({ nullable: true })
  readonly name: string;
  @Field(() => Int, { nullable: true })
  readonly age: number;
  @Field({ nullable: true })
  readonly breed: string;
}
