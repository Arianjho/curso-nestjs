import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrders1713328267669 implements MigrationInterface {
    name = 'CreateOrders1713328267669'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`brands\` CHANGE \`created_at\` \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`brands\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`created_at\` \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_ea86d0c514c4ecbb5694cbf57df\``);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`created_at\` \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`brandId\` \`brandId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP FOREIGN KEY \`FK_f1d359a55923bb45b057fbdab0d\``);
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP FOREIGN KEY \`FK_cdb99c05982d5191ac8465ac010\``);
        await queryRunner.query(`ALTER TABLE \`order_items\` CHANGE \`created_at\` \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`order_items\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`order_items\` CHANGE \`orderId\` \`orderId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`order_items\` CHANGE \`productId\` \`productId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_e5de51ca888d8b1f5ac25799dd1\``);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`created_at\` \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`customerId\` \`customerId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`customers\` CHANGE \`created_at\` \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`customers\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_c6c520dfb9a4d6dd749e73b13de\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`created_at\` \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`customerId\` \`customerId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_ea86d0c514c4ecbb5694cbf57df\` FOREIGN KEY (\`brandId\`) REFERENCES \`brands\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_items\` ADD CONSTRAINT \`FK_f1d359a55923bb45b057fbdab0d\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_items\` ADD CONSTRAINT \`FK_cdb99c05982d5191ac8465ac010\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_e5de51ca888d8b1f5ac25799dd1\` FOREIGN KEY (\`customerId\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_c6c520dfb9a4d6dd749e73b13de\` FOREIGN KEY (\`customerId\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_c6c520dfb9a4d6dd749e73b13de\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_e5de51ca888d8b1f5ac25799dd1\``);
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP FOREIGN KEY \`FK_cdb99c05982d5191ac8465ac010\``);
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP FOREIGN KEY \`FK_f1d359a55923bb45b057fbdab0d\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_ea86d0c514c4ecbb5694cbf57df\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`customerId\` \`customerId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`created_at\` \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_c6c520dfb9a4d6dd749e73b13de\` FOREIGN KEY (\`customerId\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`customers\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`customers\` CHANGE \`created_at\` \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`customerId\` \`customerId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`created_at\` \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_e5de51ca888d8b1f5ac25799dd1\` FOREIGN KEY (\`customerId\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_items\` CHANGE \`productId\` \`productId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`order_items\` CHANGE \`orderId\` \`orderId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`order_items\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`order_items\` CHANGE \`created_at\` \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`order_items\` ADD CONSTRAINT \`FK_cdb99c05982d5191ac8465ac010\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_items\` ADD CONSTRAINT \`FK_f1d359a55923bb45b057fbdab0d\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`brandId\` \`brandId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`created_at\` \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_ea86d0c514c4ecbb5694cbf57df\` FOREIGN KEY (\`brandId\`) REFERENCES \`brands\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`created_at\` \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`brands\` CHANGE \`updated_at\` \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`brands\` CHANGE \`created_at\` \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

}
