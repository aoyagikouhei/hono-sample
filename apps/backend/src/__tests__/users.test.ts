import { describe, expect, test } from 'vitest'
import app from '../index'
import {
  UserSchema,
  UsersListResponseSchema,
  ErrorResponseSchema,
} from '../schemas/user'

describe('Users API - スキーマ駆動テスト', () => {
  describe('GET /users - ユーザー一覧取得', () => {
    test('正しいスキーマのレスポンスを返す', async () => {
      const res = await app.request('/users')

      expect(res.status).toBe(200)

      const data = await res.json()

      // expect.schemaMatchingでレスポンス全体を検証
      expect(data).toEqual(expect.schemaMatching(UsersListResponseSchema))
    })

    test('users配列の各要素がUserSchemaに準拠', async () => {
      const res = await app.request('/users')
      const data = await res.json()

      // 各ユーザーがUserSchemaに準拠していることを検証
      data.users.forEach((user: any) => {
        expect(user).toEqual(expect.schemaMatching(UserSchema))
      })
    })

    test('total値が正しい型', async () => {
      const res = await app.request('/users')
      const data = await res.json()

      // スキーマの一部分だけを検証
      expect(data).toMatchObject({
        total: expect.schemaMatching(UsersListResponseSchema.shape.total),
      })
    })
  })

  describe('GET /users/:id - ユーザー詳細取得', () => {
    test('存在するユーザーIDで正しいスキーマのレスポンスを返す', async () => {
      const res = await app.request('/users/1')

      expect(res.status).toBe(200)

      const data = await res.json()

      // UserSchemaに準拠したレスポンスが返ることを検証
      expect(data).toEqual(expect.schemaMatching(UserSchema))
    })

    test('特定のユーザー情報を検証', async () => {
      const res = await app.request('/users/1')
      const data = await res.json()

      // 個別フィールドのスキーマ検証
      expect(data).toMatchObject({
        id: expect.schemaMatching(UserSchema.shape.id),
        name: expect.schemaMatching(UserSchema.shape.name),
        email: expect.schemaMatching(UserSchema.shape.email),
        createdAt: expect.schemaMatching(UserSchema.shape.createdAt),
      })
    })

    test('存在しないユーザーIDでエラースキーマを返す', async () => {
      const res = await app.request('/users/999')

      expect(res.status).toBe(404)

      const data = await res.json()

      // ErrorResponseSchemaに準拠したエラーレスポンスが返ることを検証
      expect(data).toEqual(expect.schemaMatching(ErrorResponseSchema))
    })
  })
})