// Modules
import req from 'supertest';
import seed from '../../data/seed.js';
import app from '../../../src/index.js';

describe('GET /v0/users', () => {
	describe('when there are 0 users', () => {
		let res;
		beforeAll(async () => {
			await seed.reset();
			res = await req(app).get('/v0/users');
		});
		it('should return status code 200', () => {
			expect(res.statusCode).toEqual(200);
		});
		it('should return empty array of users', () => {
			expect(res.body).toEqual({
				status: 'ok',
				data: {
					users: [],
				},
			});
		});
	});
	describe('when there are 4 users', () => {
		let res;
		beforeAll(async () => {
			await seed.reset();
			await seed.users();
			res = await req(app).get('/v0/users');
		});
		it('should return status code 200', () => {
			expect(res.statusCode).toEqual(200);
		});
		it('should return 4 users', () => {
			expect(res.body).toMatchObject({
				status: 'ok',
			});
			expect(res.body.data).toHaveProperty('users');
			expect(res.body.data.users).toHaveLength(4);
			// ===
			expect(res.body.data.users[0]).toHaveProperty('id');
			expect(res.body.data.users[0]).toHaveProperty(
				'username',
				'admin@example.com'
			);
			expect(res.body.data.users[0]).toHaveProperty('name_first', 'Admin');
			// ===
			expect(res.body.data.users[1]).toHaveProperty('id');
			expect(res.body.data.users[1]).toHaveProperty(
				'username',
				'owner@example.com'
			);
			expect(res.body.data.users[1]).toHaveProperty('name_first', 'Owner');
			// ===
			expect(res.body.data.users[2]).toHaveProperty('id');
			expect(res.body.data.users[2]).toHaveProperty(
				'username',
				'normal@example.com'
			);
			expect(res.body.data.users[2]).toHaveProperty('name_first', 'Normal');
			// ===
			expect(res.body.data.users[3]).toHaveProperty('id');
			expect(res.body.data.users[3]).toHaveProperty(
				'username',
				'inactive@example.com'
			);
			expect(res.body.data.users[3]).toHaveProperty('name_first', 'Inactive');
		});
	});
});
