import { TransactionBaseService, CustomerGroupService } from "@medusajs/medusa";
import { Lifetime } from "awilix";
import { EntityManager } from "typeorm";
import { generateEntityId } from "@medusajs/medusa/dist/utils";

export default class BlogService extends TransactionBaseService {
  static LIFE_TIME = Lifetime.SCOPED;
  protected manager_: EntityManager;
  constructor(container: any) {
    super(container);
    this.manager_ = container.manager;
  }

  async getOneByHandle(
    searchValue: string,
    onlyActive?: boolean
  ): Promise<any> {
    const postResult: any = await this.manager_
      .createQueryBuilder()
      .select("*")
      .from("posts", "posts")
      .where(
        onlyActive
          ? "handle = :searchValue AND active = true"
          : "handle = :searchValue",
        { searchValue }
      )
      .limit(1)
      .getRawOne();

    if (postResult) {
      postResult.error = null;
      const metadata: any[] | undefined = await this.manager_
        .createQueryBuilder()
        .select("value as key, content")
        .from("post_meta", "post_meta")
        .where("post_id = :id", { id: postResult.id })
        .getRawMany();

      postResult.metadata = metadata ?? [];

      return postResult;
    } else {
      return {
        error: "Not found",
      };
    }
  }

  async getImages(): Promise<any> {
    const images: any[] = await this.manager_
      .createQueryBuilder()
      .select("*")
      .from("image", "image")
      .getRawMany()
      .then((data) => data || [])
      .then((data) =>
        data.map((data) => ({ ...data, metadata: JSON.parse(data.metadata) }))
      );
    return images;
  }

  async deleteImage(id: string) {
    try {
      await this.manager_
        .createQueryBuilder()
        .delete()
        .from("image")
        .where("id = :id", { id })
        .execute();
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async saveImage(name: string, url: string, key?: string): Promise<any> {
    await this.manager_
      .createQueryBuilder()
      .insert()
      .into("image")
      .values({
        id: generateEntityId(null, "img"),
        url,
        created_at: new Date(),
        uploaded_at: new Date(),
        metadata: JSON.stringify({ name, key: key ?? "" }),
      })
      .execute();
  }

  async getAll(
    limit?: number | undefined,
    offset?: number | undefined,
    onlyActive?: boolean | undefined
  ): Promise<any> {
    let results = await this.manager_
      .createQueryBuilder()
      .select("*")
      .from("posts", "posts")
      .orderBy("pub_date", "DESC")
      .limit(limit)
      .where(onlyActive ? "active = :active" : "true = true", {
        active: onlyActive ?? true,
      })
      .offset((offset ?? 0) * (limit ?? 10))
      .getRawMany();

    results = await Promise.all(
      results.map(async (post: any) => {
        return {
          ...post,
          metadata: await this.manager_
            .createQueryBuilder()
            .select("value as key, content")
            .from("post_meta", "metadata")
            .where("post_id = :id", { id: post.id })
            .getRawMany(),
        };
      })
    );

    let { count }: any = await this.manager_
      .createQueryBuilder()
      .select("count(*) as count")
      .from("posts", "posts")
      .getRawOne();

    const pages = Math.ceil((count ?? 1) / (limit ?? count ?? 1)) ?? 1;

    return { results, pages };
  }

  async getOne(searchValue: number, onlyActive?: boolean): Promise<any> {
    const postResult: any = await this.manager_
      .createQueryBuilder()
      .select("*")
      .from("posts", "posts")
      .where(
        onlyActive
          ? "id = :searchValue AND active = true"
          : "id = :searchValue",
        { searchValue }
      )
      .limit(1)
      .getRawOne();

    if (postResult) {
      postResult.error = null;
      const metadata: any[] | undefined = await this.manager_
        .createQueryBuilder()
        .select("value as key, content")
        .from("post_meta", "post_meta")
        .where("post_id = :id", { id: postResult.id })
        .getRawMany();

      postResult.metadata = metadata ?? [];

      return postResult;
    } else {
      return {
        error: "Not found",
      };
    }
  }

  async patch(
    id: number,
    data: any,
    metadata: any[] | undefined
  ): Promise<any> {
    await this.manager_.transaction(
      async (transactionManager: EntityManager) => {
        const updateResults = await transactionManager
          .createQueryBuilder()
          .update("posts")
          .set(data)
          .where({ id })
          .execute();

        if (updateResults.affected === 0) throw new Error("Post not found");

        await transactionManager
          .createQueryBuilder()
          .delete()
          .from("post_meta")
          .where("post_id = :id", { id })
          .execute();

        if (metadata) {
          const metarows: any[] = metadata.map((metaRow) => {
            return {
              post_id: id,
              ...metaRow,
            };
          });

          await transactionManager
            .createQueryBuilder()
            .insert()
            .into("post_meta")
            .values(metarows)
            .execute();
        }
      }
    );
  }

  async delete(id: number) {
    await this.manager_.transaction(
      async (transactionManager: EntityManager) => {
        await transactionManager
          .createQueryBuilder()
          .delete()
          .from("post_meta")
          .where({ post_id: id })
          .execute();

        await transactionManager
          .createQueryBuilder()
          .delete()
          .from("posts")
          .where({ id })
          .execute();
      }
    );
  }

  async insert(data: {
    title: string;
    content: string;
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
        if (meta.key && meta.content)
          this.manager_
            .createQueryBuilder()
            .insert()
            .into("post_meta")
            .values({
              post_id: returnId,
              value: meta.key,
              content: meta.content,
            })
            .execute();
      }
    }
    return insertResult;
  }
}
