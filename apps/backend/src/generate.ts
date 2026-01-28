import * as fs from 'fs';
import { _ } from './inflection';
import ejs from 'ejs';

import { UserSchema, UsersListResponseSchema, ErrorResponseSchema } from './schemas/user'

const columns = []
for (const [key, schema] of Object.entries(UserSchema.shape)) {
    columns.push({
        name: key,
        type: schema.type === 'optional' ? schema.def.innerType.type : schema.type,
        optional: schema.type === 'optional',
        schema: schema,
     });
}

const renderd = ejs.render(fs.readFileSync('./templates/rust.ejs', 'utf-8'), {
    src: UserSchema,
    _: _,
    columns: columns,
});

const filename: string = `./generated/${_.snakeCase(UserSchema.metadata.name)}.rs`
await fs.promises.writeFile(filename, renderd, { encoding: "utf-8" });