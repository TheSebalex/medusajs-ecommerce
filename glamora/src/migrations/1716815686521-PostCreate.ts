import { MigrationInterface, QueryRunner } from "typeorm";

export class PostCreate1716815686521 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE posts (
            id SERIAL,
            title VARCHAR(255) NOT NULL,
            content VARCHAR(255) NOT NULL,
            handle VARCHAR(255) NOT NULL,
            pub_date TIMESTAMP NOT NULL,
            active BOOLEAN NOT NULL,
            CONSTRAINT posts_pkey PRIMARY KEY (id)
        );`);
        await queryRunner.query(`CREATE UNIQUE INDEX posts_handle_key ON posts (handle);`);

        await queryRunner.query(`CREATE TABLE post_meta (
            id SERIAL,
            post_id INT NOT NULL,
            value VARCHAR(255) NOT NULL,
            content VARCHAR(255) NOT NULL,
            CONSTRAINT fk_post
                FOREIGN KEY (post_id) 
                REFERENCES posts (id)
        );`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS post_meta;`);
        await queryRunner.query(`DROP INDEX IF EXISTS posts_handle_key;`);
        await queryRunner.query(`DROP TABLE IF EXISTS posts;`);
    }

}
