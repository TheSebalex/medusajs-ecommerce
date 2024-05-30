import { TransactionBaseService, wrapHandler } from "@medusajs/medusa";
import { Lifetime } from "awilix";
import { EntityManager } from "typeorm";

export default class BlogService extends TransactionBaseService {
  static LIFE_TIME = Lifetime.SCOPED;
  protected manager_: EntityManager;
  constructor(container: any) {
    super(container);
    this.manager_ = container.manager;
  }

  async getAll(limit?: number, offset?: number): Promise<any> {
    const results = await this.manager_
      .createQueryBuilder()
      .select("*")
      .from("posts", "posts")
      .limit(limit ?? 0)
      .offset(offset ?? 0)
      .getRawMany();
  }

  getOne(id: number) {}

  async patch(
    id: number,
    data: {
      title: string;
      content: string;
      image?: string;
      metadata?: { key: string; value: string }[];
    }
  ): Promise<any> {
    await this.manager_.transaction(
      async (transactionManager: EntityManager) => {
        const result = await this.manager_
          .createQueryBuilder()
          .update("posts")
          .where({ id })
          .set({ title: data.title, content: data.content, image: data.image })
          .execute();

        this.manager_
          .createQueryBuilder()
          .delete()
          .from("post_meta")
          .where({ post_id: id })
          .execute();

        if (data.metadata) {
          for (const meta of data.metadata) {
            if (meta.key && meta.value)
              this.manager_
                .createQueryBuilder()
                .insert()
                .into("post_meta")
                .values({ post_id: id, value: meta.key, content: meta.value })
                .execute();
          }
        }
      }
    );
  }

  delete(id: string) {
    this.manager_
      .createQueryBuilder()
      .delete()
      .from("post_meta")
      .where({ post_id: id })
      .execute();
    this.manager_
      .createQueryBuilder()
      .delete()
      .from("posts")
      .where({ id })
      .execute();
  }

  async insert(data: {
    title: string;
    content: string;
    image?: string;
    handle: string;
    active?: boolean;
    metadata?: any[];
  }): Promise<any> {
    let handleCounts: number = 0;

    const res = await this.manager_
      .createQueryBuilder()
      .select("COUNT(*)", "count")
      .from("posts", "posts")
      .where("posts.handle LIKE :handle", { handle: data.handle + "%" })
      .getRawOne();

    handleCounts = parseInt(res.count);

    const insertResult = await this.manager_
      .createQueryBuilder()
      .insert()
      .into("posts")
      .values({
        title: data.title,
        handle:
          data.handle +
          (handleCounts > 0
            ? (data.handle.endsWith("-") ? "" : "-") + handleCounts
            : ""),
        content: data.content,
        pub_date: new Date(),
        active: data.active ?? true,
      })
      .returning("id")
      .execute();

    const returnId = insertResult.raw[0].id;

    if (data.metadata) {
      for (const meta of data.metadata) {
        this.manager_
          .createQueryBuilder()
          .insert()
          .into("post_meta")
          .values({ post_id: returnId, value: meta.key, content: meta.content })
          .execute();
      }
    }
    return insertResult;
  }
}
