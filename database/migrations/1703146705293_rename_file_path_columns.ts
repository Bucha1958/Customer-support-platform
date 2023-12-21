import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class RenameFilePathColumn extends BaseSchema {
  protected tableName = 'support_requests';

  public async up() {
    await this.db.rawQuery('ALTER TABLE support_requests CHANGE file_path file VARCHAR(255)');
  }

  public async down() {
    await this.db.rawQuery('ALTER TABLE support_requests CHANGE file VARCHAR(255) file_path');
  }
}
