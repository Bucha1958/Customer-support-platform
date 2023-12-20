import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'support_requests';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('user_id').unsigned().references('id').inTable('users');
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('email').notNullable();
      table.string('support_message_title').notNullable();
      table.text('support_message_text').notNullable();
      table.string('file_path');
      table.timestamps();
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
