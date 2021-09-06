import type { PostgrestFilterBuilder } from "@supabase/postgrest-js"
import type { SupabaseQueryBuilder } from "@supabase/supabase-js/dist/main/lib/SupabaseQueryBuilder"
import { raise } from "../common/helpers"
import type { definitions } from "../generated/supabase-types"
import { supabase } from "./client"

type GeneratedFields = "id" | "createdAt" | "updatedAt"

// wrapper around supabase query because the default one is garbo
export function supabaseQuery<TableName extends keyof definitions>(
  table: TableName,
) {
  function createTableWrapper<Row>(query: SupabaseQueryBuilder<any>) {
    return {
      select<Column extends keyof Row>(fields: Column[]) {
        return createSelectWrapper<Pick<Row, Column>>(
          query.select(fields.join(",")),
        )
      },

      insert(data: Omit<Row, GeneratedFields>) {
        return createSelectWrapper<Row>(query.insert(data))
      },

      delete() {
        return createSelectWrapper<Row>(query.delete())
      },

      update(data: Partial<Omit<Row, GeneratedFields>>) {
        return createSelectWrapper<Row>(query.update(data))
      },
    }
  }

  function createSelectWrapper<Row>(query: PostgrestFilterBuilder<Row>) {
    return {
      select<Column extends keyof Row>(fields: Column[]) {
        return createSelectWrapper<Pick<Row, Column>>(
          // @ts-expect-error
          query.select(fields.join(",")),
        )
      },

      eq<Column extends keyof Row>(column: Column, value: Row[Column]) {
        return createSelectWrapper(query.eq(column, value))
      },

      async all(): Promise<Row[]> {
        const result = await query
        return result.data ?? []
      },

      async single(): Promise<Row> {
        const result = await query.single()
        return result.data ?? raise("data not found")
      },

      async resolve() {
        await query
      },
    }
  }

  return createTableWrapper<definitions[TableName]>(supabase.from(table))
}
