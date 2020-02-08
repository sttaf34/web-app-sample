import {
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity
} from "typeorm"
import * as bcrypt from "bcrypt"

export enum UserCreateResult {
  Success,
  ErrorPasswordShort,
  ErrorOther
}

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
    const isOK = bcrypt.compareSync(password, user.password)
    if (isOK) {
      return user
    }
    return undefined
  }

  public static createNewUser = async (
    name: string,
    password: string,
    age: number
  ): Promise<UserCreateResult> => {
    // TODO: バリデート追加
    if (password.length < 3) {
      return UserCreateResult.ErrorPasswordShort
    }

    const salt = bcrypt.genSaltSync()
    const hash = bcrypt.hashSync(password, salt)

    const user = new User()
    user.name = name
    user.password = hash
    user.age = age

    try {
      await user.save()
      return UserCreateResult.Success
    } catch (error) {
      return UserCreateResult.ErrorOther
    }
  }
}

export default User
