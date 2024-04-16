import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeLimitBrandName1713217717698 implements MigrationInterface {
    name = 'ChangeLimitBrandName1713217717698'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_96db6bbbaa6f23cad26871339b\` ON \`brands\``);
        await queryRunner.query(`ALTER TABLE \`brands\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`brands\` ADD \`name\` varchar(230) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`brands\` ADD UNIQUE INDEX \`IDX_96db6bbbaa6f23cad26871339b\` (\`name\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`brands\` DROP INDEX \`IDX_96db6bbbaa6f23cad26871339b\``);
        await queryRunner.query(`ALTER TABLE \`brands\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`brands\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_96db6bbbaa6f23cad26871339b\` ON \`brands\` (\`name\`)`);
    }

}
