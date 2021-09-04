import type PostgrestFilterBuilder from "@supabase/postgrest-js/src/lib/PostgrestFilterBuilder"
import { createClient } from "@supabase/supabase-js"
import type { SupabaseQueryBuilder } from "@supabase/supabase-js/dist/main/lib/SupabaseQueryBuilder"
import type { definitions } from "../generated/supabase-types"

export const supabase = createClient(
  import.meta.env.VITE_APP_SUPABASE_URL as string,
  import.meta.env.VITE_APP_SUPABASE_KEY as string,
)

export function supabaseTable<TableName extends keyof definitions>(
  tableName: TableName,
) {
  return supabase.from<definitions[TableName]>(tableName)
}

export function supabaseSelect<Row, Column extends keyof Row>(
  queryBuilder: SupabaseQueryBuilder<Row> | PostgrestFilterBuilder<Row>,
  keys: Column[],
) {
  return queryBuilder.select(
    keys.join(", "),
  ) as unknown as PostgrestFilterBuilder<Pick<Row, Column>>
}
