import assert from 'node:assert';

const BASE_URL = 'http://localhost:5000/api';

async function runE2ETests() {
  console.log('--- [1] Testing Health Endpoint ---');
  const healthRes = await fetch(`${BASE_URL}/health`);
  const healthData = await healthRes.json();
  assert.strictEqual(healthRes.status, 200);
  assert.strictEqual(healthData.status, 'ok');
  console.log('✔ Health check OK');

  console.log('--- [2] Testing Public Lead Creation ---');
  const leadRes = await fetch(`${BASE_URL}/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Aditya Gupta',
      email: 'aditya.gupta@example.in',
      phone: '+91 98123 45678',
      service: 'Custom Web Development',
      message: 'Looking for a complete enterprise portal overhaul.',
    }),
  });
  const leadData = await leadRes.json();
  assert.strictEqual(leadRes.status, 201);
  assert.strictEqual(leadData.success, true);
  assert.ok(leadData.lead.id);
  const createdLeadId = leadData.lead.id;
  console.log(`✔ Lead created with ID: ${createdLeadId}`);

  console.log('--- [3] Testing Admin Login ---');
  const loginRes = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@ethixweb.com',
      password: 'AdminPassword@123',
    }),
  });
  const loginData = await loginRes.json();
  assert.strictEqual(loginRes.status, 200);
  assert.strictEqual(loginData.success, true);
  assert.ok(loginData.token);
  const token = loginData.token;
  console.log('✔ Admin login succeeded, JWT token retrieved');

  const authHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  console.log('--- [4] Testing Protected /api/auth/me ---');
  const meRes = await fetch(`${BASE_URL}/auth/me`, { headers: authHeaders });
  const meData = await meRes.json();
  assert.strictEqual(meRes.status, 200);
  assert.strictEqual(meData.admin.email, 'admin@ethixweb.com');
  console.log('✔ Admin profile verified');

  console.log('--- [5] Testing Protected /api/leads list ---');
  const leadsRes = await fetch(`${BASE_URL}/leads`, { headers: authHeaders });
  const leadsData = await leadsRes.json();
  assert.strictEqual(leadsRes.status, 200);
  assert.ok(Array.isArray(leadsData.leads));
  assert.ok(leadsData.pagination.total >= 1);
  console.log(`✔ Leads list retrieved (${leadsData.pagination.total} leads found)`);

  console.log('--- [6] Testing Lead Status Update ---');
  const updateRes = await fetch(`${BASE_URL}/leads/${createdLeadId}`, {
    method: 'PATCH',
    headers: authHeaders,
    body: JSON.stringify({
      status: 'contacted',
      notes: 'Initial discovery call held.',
    }),
  });
  const updateData = await updateRes.json();
  assert.strictEqual(updateRes.status, 200);
  assert.strictEqual(updateData.lead.status, 'contacted');
  assert.strictEqual(updateData.lead.notes, 'Initial discovery call held.');
  console.log('✔ Lead status and notes updated');

  console.log('--- [7] Testing Admin Stats Endpoint ---');
  const statsRes = await fetch(`${BASE_URL}/admin/stats`, { headers: authHeaders });
  const statsData = await statsRes.json();
  assert.strictEqual(statsRes.status, 200);
  assert.ok(statsData.data.metrics.total >= 1);
  console.log(`✔ Stats retrieved: Total leads = ${statsData.data.metrics.total}`);

  console.log('--- [8] Testing Lead Deletion ---');
  const deleteRes = await fetch(`${BASE_URL}/leads/${createdLeadId}`, {
    method: 'DELETE',
    headers: authHeaders,
  });
  const deleteData = await deleteRes.json();
  assert.strictEqual(deleteRes.status, 200);
  assert.strictEqual(deleteData.success, true);
  console.log('✔ Test lead deleted cleanly');

  console.log('\n========================================');
  console.log('🎉 ALL 8 E2E TESTS PASSED SUCCESSFULLY! 🎉');
  console.log('========================================');
}

runE2ETests().catch((err) => {
  console.error('❌ Test Failure:', err);
  process.exit(1);
});
