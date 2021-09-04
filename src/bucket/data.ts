import { v4 } from "uuid"
import { supabaseSelect, supabaseTable } from "../supabase/client"

export async function getBuckets() {
  const result = await supabaseSelect(supabaseTable("buckets"), ["id", "name"])
  return result.data
}

export async function createBucket(data: { name: string; ownerId: string }) {
  await supabaseTable("buckets").insert({
    id: v4(),
    name: data.name,
    owner_id: data.ownerId,
  })
}

export async function deleteBucket(id: string) {
  await supabaseTable("buckets").delete().eq("id", id)
}
