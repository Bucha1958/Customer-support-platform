import { DateTime } from 'luxon';
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import User from './User';

export default class SupportRequest extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column({ columnName: 'first_name' })
  public firstName: string;

  @column({ columnName: 'last_name' })
  public lastName: string;

  @column({ columnName: 'email' })
  public email: string;

  @column({ columnName: 'support_message_title' })
  public title: string;

  @column({ columnName: 'support_message_text' })
  public text: string;

  @column({ columnName: 'user_id' })
  public userId: number;

  @column({ columnName: 'file' })
  public file: string;

  // Define the relationship: a SupportRequest belongs to a User
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;
}
