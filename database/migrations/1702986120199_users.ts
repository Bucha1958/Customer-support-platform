import { Schema } from '@adonisjs/lucid/build/src/Schema';

class CreateUsersSchema extends Schema {
  protected tableName = 'users';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('email').notNullable().unique();
      table.string('full_name').notNullable();
      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}

export default CreateUsersSchema;
