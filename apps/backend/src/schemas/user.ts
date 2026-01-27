import { z } from '@hono/zod-openapi'

// ユーザースキーマ
const UserSchemaBase = z.object({
  id: z.string().openapi({
    example: '123',
    description: 'ユーザーID',
  }),
  name: z.string().min(1).max(100).openapi({
    example: '山田太郎',
    description: 'ユーザー名',
  }),
  email: z.string().email().openapi({
    example: 'yamada@example.com',
    description: 'メールアドレス',
  }),
  age: z.number().int().min(0).max(150).optional().openapi({
    example: 25,
    description: '年齢',
  }),
  createdAt: z.string().datetime().openapi({
    example: '2025-01-01T00:00:00Z',
    description: '作成日時',
  }),
})

export const UserSchema = Object.assign(UserSchemaBase, {
  metadata: {
    name: 'UserSchema',
  },
})



// ユーザー作成リクエストスキーマ
export const CreateUserRequestSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  age: z.number().int().min(0).max(150).optional(),
})

// ユーザー一覧レスポンススキーマ
export const UsersListResponseSchema = z.object({
  users: z.array(UserSchema),
  total: z.number().int(),
})

// エラーレスポンススキーマ
export const ErrorResponseSchema = z.object({
  error: z.string(),
  message: z.string().optional(),
})

// 型のエクスポート
export type User = z.infer<typeof UserSchema>
export type CreateUserRequest = z.infer<typeof CreateUserRequestSchema>