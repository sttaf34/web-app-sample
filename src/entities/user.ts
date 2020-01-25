import {
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity
} from "typeorm"
import * as bcrypt from "bcrypt"

@Entity()
@Unique(["name"])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  password: string

  @Column()
  age: number

  public static findOneByNameAndPassword = async (
    name: string,
    password: string
  ): Promise<User | undefined> => {
    const user = await User.findOne({ name })
    if (user === undefined) {
      return undefined
    }
    const isOK = await bcrypt.compareSync(password, user.password)
    if (isOK) {
      return user
    }
    return undefined
  }
}

export default User
