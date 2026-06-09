import { compile } from "json-schema-to-typescript"
import { writeFileSync } from "fs"

const schema = await fetch(
  "https://raw.githubusercontent.com/gyorgygutai/flux-klein-worker/main/schema.json"
).then((r) => r.json())

const request = await compile(schema.request, "RequestPayload")
const response = await compile(schema.response, "ResponsePayload")

writeFileSync("app/inference-api/schema.ts", request + "\n" + response)
