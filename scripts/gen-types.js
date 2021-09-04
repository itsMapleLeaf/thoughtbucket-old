/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-console */
// @ts-check
const { config } = require("dotenv")
const execa = require("execa")
const { join } = require("path")

config({
  path: join(__dirname, "../.env.local"),
})

async function main() {
  await execa(
    "npx",
    [
      "openapi-typescript",
      `${process.env.VITE_APP_SUPABASE_URL}/rest/v1/?apikey=${process.env.VITE_APP_SUPABASE_KEY}`,
      "--output",
      join(__dirname, "../src/generated/supabase-types.ts"),
      "--prettier",
      join(__dirname, "../.prettierrc"),
      "--default-non-nullable",
    ],
    { stdio: "inherit" },
  )
}

main().catch(console.error)
