import {
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity
} from "typeorm"
import { validate, IsPositive } from "class-validator"

import * as bcrypt from "bcrypt"

export enum UserNotFindResult {
  WrongName,
  WrongPassword
}

export enum UserCreateResult {
  Success,
  ErrorShortPassword,
  ErrorWrongAge
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
  @IsPositive()
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
    // TODO: 定数クラスを作って、そちらに定義
    if (password.length < 8) {
      return new Promise((resolve: (UserCreateResult) => void): void => {
        return resolve(UserCreateResult.ErrorShortPassword)
      })
    }

    const user = new User()
    user.name = name
    user.password = bcrypt.hashSync(password, bcrypt.genSaltSync())
    user.age = Number(age)

    const errors = await validate(user)
    if (errors.length > 0) {
      return new Promise((resolve: (UserCreateResult) => void): void => {
        return resolve(UserCreateResult.ErrorWrongAge)
      })
    }

    await user.save()
    return new Promise((resolve: (UserCreateResult) => void): void => {
      return resolve(UserCreateResult.Success)
    })
  }
}

export default User
