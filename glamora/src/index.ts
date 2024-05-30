import { ModuleExports } from "@medusajs/modules-sdk"
import BlogService from "./services/blog"

export * from "./services/blog"

const moduleDefinition: ModuleExports = {
  service: BlogService,
  migrations: [
    "src/migrations/1716815686521-PostCreate.ts",
  ],
}

export default moduleDefinition