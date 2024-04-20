import { createClient } from "@supabase/supabase-js"

import { Database } from "../../db_types.ts"

export default createClient<Database>(
  import.meta.env.VITE_SUPABASE_BASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
)

export type MessageType = Database["public"]["Tables"]["messages"]["Row"]
