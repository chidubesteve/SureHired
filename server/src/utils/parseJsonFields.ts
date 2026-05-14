// utils/parseJsonFields.ts

/**
 * Multer sends everything as strings in req.body.
 * This utility converts JSON strings back to their real types
 * for specified fields (arrays, objects, numbers).
 */
export function parseJsonFieldsIfNeeded<T extends Record<string, any>>(
  body: T,
  fields: (keyof T)[],
): T {
  const result = { ...body };

  for (const field of fields) {
    const value = result[field];

    if (value === undefined || value === null) continue;

    // Already the right type (e.g. if somehow not a string)
    if (typeof value !== "string") continue;

    // Try to parse as JSON (handles arrays and objects)
    try {
      result[field] = JSON.parse(value);
    } catch {
      // Not valid JSON — try parsing as a number
      const asNumber = Number(value);
      if (!isNaN(asNumber)) {
        result[field] = asNumber as any;
      }
      // Otherwise leave it as a string
    }
  }

  return result;
}
