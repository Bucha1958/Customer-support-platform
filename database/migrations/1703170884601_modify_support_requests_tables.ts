import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class ModifySupportRequestsTable extends BaseSchema {
  protected tableName = 'support_requests';

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('last_name').defaultTo('Unknown').notNullable().alter();
      table.string('email').defaultTo('Unknown').notNullable().alter();
      table.string('support_message_title').defaultTo('Unknown').notNullable().alter();
      table.string('support_message_text').defaultTo('Unknown').notNullable().alter();
      table.string('file').defaultTo('Unknown').notNullable().alter();
      
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('last_name');
      table.dropColumn('email');
      table.dropColumn('support_message_title');
      table.dropColumn('support_message_text');
      table.dropColumn('file');
    });
  }
}
