import { v4 as uuid } from "uuid"
import { supabaseQuery } from "../supabase/query"

export const bucketQueryKey = "bucket"

export function getBuckets() {
  return supabaseQuery("buckets").select(["id", "name"]).all()
}

export function getBucketDetails(id: string) {
  return supabaseQuery("buckets").select(["id", "name"]).eq("id", id).single()
}

export function createBucket(data: {
  name: string
  ownerId: string
}): Promise<{ id: string }> {
  return supabaseQuery("buckets")
    .insert({
      id: uuid(),
      name: data.name,
      owner_id: data.ownerId,
    })
    .select(["id"])
    .single()
}

export function deleteBucket(id: string) {
  return supabaseQuery("buckets").delete().eq("id", id).resolve()
}
