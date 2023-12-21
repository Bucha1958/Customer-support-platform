import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class ModifySupportRequestsTable extends BaseSchema {
  protected tableName = 'support_requests';

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('first_name').defaultTo('Unknown').notNullable().alter();
      
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('first_name');
    });
  }
}

