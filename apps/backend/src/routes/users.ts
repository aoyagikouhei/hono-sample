import { createRoute } from '@hono/zod-openapi'
import { UserSchema, UsersListResponseSchema, ErrorResponseSchema } from '../schemas/user'

// GET /users - ユーザー一覧取得
export const listUsersRoute = createRoute({
  method: 'get',
  path: '/users',
  summary: 'ユーザー一覧取得',
  tags: ['users'],
  responses: {
    200: {
      content: {
        'application/json': {
          schema: UsersListResponseSchema,
        },
      },
      description: 'ユーザー一覧を返却',
    },
  },
})

// GET /users/:id - ユーザー詳細取得
export const getUserRoute = createRoute({
  method: 'get',
  path: '/users/{id}',
  summary: 'ユーザー詳細取得',
  tags: ['users'],
  request: {
    params: UserSchema.pick({ id: true }),
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: UserSchema,
        },
      },
      description: 'ユーザー情報を返却',
    },
    404: {
      content: {
        'application/json': {
          schema: ErrorResponseSchema,
        },
      },
      description: 'ユーザーが見つかりません',
    },
  },
})