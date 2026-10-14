import assert from 'node:assert';

// Simple unit assertion test for ApiError utility
import { ApiError } from '../utils/ApiError.js';

console.log('[Test] Running ApiError unit check...');
const err = new ApiError(404, 'Not Found', ['Resource missing']);
assert.strictEqual(err.statusCode, 404);
assert.strictEqual(err.message, 'Not Found');
assert.strictEqual(err.success, false);
assert.deepStrictEqual(err.errors, ['Resource missing']);
console.log('[Test] ApiError test passed successfully.');
