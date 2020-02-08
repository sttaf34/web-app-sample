import {
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity
} from "typeorm"
import * as bcrypt from "bcrypt"

export enum UserNotFindResult {
  WrongName,
  WrongPassword
}

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
  ): Promise<User | UserNotFindResult> => {
    // User.findOne() が reject されると
    // ↓
    // User.findOneByNameAndPassword() が reject される
    // ↓
    // 途中で一度も catch してないが、最終的にデフォルトエラーハンドラーに渡る
    const user = await User.findOne({ name })

    if (user === undefined) {
      return new Promise((resolve: (UserNotFindResult) => void): void => {
        return resolve(UserNotFindResult.WrongName)
      })
    }

    const isOK = bcrypt.compareSync(password, user.password)
    if (isOK) {
      return new Promise((resolve: (User) => void): void => {
        return resolve(user)
      })
    }

    return new Promise((resolve: (UserNotFindResult) => void): void => {
      return resolve(UserNotFindResult.WrongPassword)
    })
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
