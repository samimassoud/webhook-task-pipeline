import { HttpEnrichConfig } from "../configSchemas/httpEnrich.schema.js"

// EXAMPLE
export async function httpEnrichProcessor(payload: any, config: HttpEnrichConfig) {
    const value = payload[config.lookupField]

    const url = config.url.replace("{value}", value)

    const response = await fetch(url)

    const data = await response.json()

    return {
        ...payload,
        enrichment: data
    }
}


/*
The processor:
takes payload
+
takes config
+
returns result
(very clean contract)
*/