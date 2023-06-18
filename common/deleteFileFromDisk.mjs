import fs from 'fs'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export async function deleteFileFromDisk(filename) {
  let path = __dirname + '/../' + filename
  fs.unlinkSync(path)
}
