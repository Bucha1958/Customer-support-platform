import { DateTime } from 'luxon';
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm';
import SupportRequest from './SupportRequest';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column({ columnName: 'email' })
  public email: string;

  @column({ columnName: 'full_name' })

  // Define the relationship: a User has many SupportRequests
  @hasMany(() => SupportRequest)
  public supportRequests: HasMany<typeof SupportRequest>;
}
