import * as fs from 'fs';
import { _ } from './inflection';
import ejs from 'ejs';

import { UserSchema, UsersListResponseSchema, ErrorResponseSchema } from './schemas/user'

const renderd = ejs.render(fs.readFileSync('./templates/rust.ejs', 'utf-8'), {
  src: UserSchema,
  _: _,
});
console.log(UserSchema)

const filename: string = `./generated/${_.snakeCase(UserSchema.metadata.name)}.rs`
await fs.promises.writeFile(filename, renderd, { encoding: "utf-8" });