import { LqbConfig } from "./types/LQB";
import { Client } from "pg";

export class LQB {
  private readonly db_provider: Client | undefined;
  private query: string;

  public constructor(config: LqbConfig | undefined) {
    if (config !== undefined) {
      this.db_provider = new Client({
        user: config.username,
        password: config.password,
        port: config.port,
        host: config.host,
      });
    }
    this.query = "";
  }

  public async connect() {
    try {
      await this.db_provider?.connect();
      console.log("db is connected");
    } catch (error) {
      console.log(error);
    }
  }

  select(fields: string | string[], table: string) {
    this.query += `Select ${
      Array.isArray(fields) ? fields.join(", ") : fields
    } FROM ${table} `;

    return this;
  }

  where(a: string, op: string, b: string) {
    this.query += `WHERE ${a} ${op} ${b}`;
    return this;
  }

  build() {
    const build = this.query;
    this.query = '';
    return build + ';';
  }
}