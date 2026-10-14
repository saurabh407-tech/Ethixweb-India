import assert from 'node:assert';

const BASE_URL = 'http://localhost:5000/api';

async function testBackendSuite() {
  console.log('=== ETHIXWEB INDIA COMPLETE BACKEND TEST SUITE ===\n');

  // 1. Health Endpoint & Helmet Security Headers
  console.log('[Test 1] Health Endpoint & Security Headers');
  const healthRes = await fetch(`${BASE_URL}/health`);
  const healthData = await healthRes.json();
  assert.strictEqual(healthRes.status, 200);
  assert.strictEqual(healthData.status, 'ok');
  // Check Helmet header
  const dnsPrefetch = healthRes.headers.get('x-dns-prefetch-control');
  assert.ok(dnsPrefetch !== null, 'Helmet x-dns-prefetch-control header is present');
  console.log('✔ Health check OK & Helmet security headers verified');

  // 2. Honeypot Bot Rejection
  console.log('\n[Test 2] Honeypot Bot Trap Rejection');
  const honeypotRes = await fetch(`${BASE_URL}/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Spam Bot',
      email: 'bot@spam.com',
      service: 'Websites & Digital Portals',
      message: 'Cheap crypto loans',
      bot_trap: 'automated_field_filled_by_bot',
    }),
  });
  assert.strictEqual(honeypotRes.status, 400);
  const honeypotData = await honeypotRes.json();
  assert.strictEqual(honeypotData.success, false);
  console.log('✔ Bot with honeypot field correctly rejected with 400 Bad Request');

  // 3. Validation: Reject Invalid Inputs (bad email, short message)
  console.log('\n[Test 3] Input Validation & Error States');
  const invalidRes = await fetch(`${BASE_URL}/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'A', // too short (< 2)
      email: 'not-an-email',
      service: '',
      message: 'Hi', // too short (< 5)
    }),
  });
  assert.strictEqual(invalidRes.status, 400);
  const invalidData = await invalidRes.json();
  assert.strictEqual(invalidData.success, false);
  assert.ok(Array.isArray(invalidData.errors));
  console.log(`✔ Invalid inputs rejected with errors: ${invalidData.errors.join('; ')}`);

  // 4. Valid Public Lead Submission with Arbitrary Status Stripping
  console.log('\n[Test 4] Valid Public Lead Submission & Status Normalization');
  const validLeadPayload = {
    name: 'Suresh Raina',
    email: 'suresh.raina@rainaventures.in',
    phone: '+91 98333 44556',
    company: 'Raina Ventures India',
    service: 'Web Applications & Dashboards',
    message: 'Need an automated booking and dispatch engine for our distribution network.',
    status: 'converted', // Malicious attempt to inject 'converted' from public form
    notes: 'Secret discount', // Malicious attempt to inject internal notes
  };

  const createRes = await fetch(`${BASE_URL}/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(validLeadPayload),
  });
  assert.strictEqual(createRes.status, 201);
  const createData = await createRes.json();
  assert.strictEqual(createData.success, true);
  assert.ok(createData.lead.id);
  // Must be forced to 'new', ignoring 'converted' injection
  assert.strictEqual(createData.lead.status, 'new');
  assert.strictEqual(createData.lead.company, 'Raina Ventures India');
  const testLeadId = createData.lead.id;
  console.log(`✔ Lead persisted in MongoDB with ID: ${testLeadId} (Status normalized to 'new')`);

  // 5. Security: Unauthenticated Access Denied on All Admin APIs
  console.log('\n[Test 5] Strict Protection: Unauthenticated Access Denied');
  const unauthLeads = await fetch(`${BASE_URL}/admin/leads`);
  assert.strictEqual(unauthLeads.status, 401, 'GET /api/admin/leads must reject unauthenticated');

  const unauthPatch = await fetch(`${BASE_URL}/admin/leads/${testLeadId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: 'converted' }),
  });
  assert.strictEqual(unauthPatch.status, 401, 'PATCH /api/admin/leads/:id must reject unauthenticated');

  const unauthDelete = await fetch(`${BASE_URL}/admin/leads/${testLeadId}`, {
    method: 'DELETE',
  });
  assert.strictEqual(unauthDelete.status, 401, 'DELETE /api/admin/leads/:id must reject unauthenticated');

  const unauthStats = await fetch(`${BASE_URL}/admin/stats`);
  assert.strictEqual(unauthStats.status, 401, 'GET /api/admin/stats must reject unauthenticated');
  console.log('✔ All admin endpoints successfully denied unauthenticated requests with 401');

  // 6. Admin Authentication & HttpOnly Cookie Issuance
  console.log('\n[Test 6] Admin Login & HttpOnly Cookie');
  // 6a: Test invalid password rejection
  const badLoginRes = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@ethixweb.com', password: 'WrongPassword999' }),
  });
  assert.strictEqual(badLoginRes.status, 401);
  console.log('✔ Invalid password rejected with 401 Unauthorized');

  // 6b: Test valid admin login
  const loginRes = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@ethixweb.com', password: 'AdminPassword@123' }),
  });
  assert.strictEqual(loginRes.status, 200);
  const loginData = await loginRes.json();
  assert.strictEqual(loginData.success, true);
  assert.ok(loginData.token);

  // Verify Set-Cookie header contains HttpOnly token
  const rawSetCookie = loginRes.headers.get('set-cookie');
  assert.ok(rawSetCookie, 'set-cookie header received from server');
  assert.ok(rawSetCookie.includes('token='), 'Cookie contains token');
  assert.ok(rawSetCookie.toLowerCase().includes('httponly'), 'Cookie has HttpOnly flag');
  assert.ok(rawSetCookie.toLowerCase().includes('samesite=lax') || rawSetCookie.toLowerCase().includes('samesite=strict'), 'Cookie has SameSite flag');
  console.log(`✔ Admin authenticated successfully with HttpOnly JWT cookie:\n  ${rawSetCookie.split(';')[0]}; HttpOnly; SameSite`);

  // Extract cookie for subsequent authenticated requests
  const cookieHeader = rawSetCookie.split(';')[0];
  const authHeaders = {
    'Content-Type': 'application/json',
    'Cookie': cookieHeader,
  };

  // 7. Verify /api/auth/me with Cookie
  console.log('\n[Test 7] Authenticated Profile /api/auth/me via Cookie');
  const meRes = await fetch(`${BASE_URL}/auth/me`, { headers: authHeaders });
  assert.strictEqual(meRes.status, 200);
  const meData = await meRes.json();
  assert.strictEqual(meData.admin.email, 'admin@ethixweb.com');
  console.log(`✔ Verified admin session for: ${meData.admin.name} (${meData.admin.email})`);

  // 8. GET /api/admin/leads with Pagination & Filtering
  console.log('\n[Test 8] GET /api/admin/leads (Pagination & Search)');
  const leadsRes = await fetch(`${BASE_URL}/admin/leads?page=1&limit=10&status=all&search=Raina`, {
    headers: authHeaders,
  });
  assert.strictEqual(leadsRes.status, 200);
  const leadsData = await leadsRes.json();
  assert.ok(Array.isArray(leadsData.leads));
  assert.ok(leadsData.leads.length >= 1);
  assert.strictEqual(leadsData.leads[0].company, 'Raina Ventures India');
  console.log(`✔ Successfully queried leads matching search term 'Raina' (${leadsData.leads.length} matched)`);

  // 9. ObjectId Validation Check
  console.log('\n[Test 9] ObjectId Validation');
  const invalidIdRes = await fetch(`${BASE_URL}/admin/leads/not-a-valid-object-id`, {
    method: 'PATCH',
    headers: authHeaders,
    body: JSON.stringify({ status: 'contacted' }),
  });
  assert.strictEqual(invalidIdRes.status, 400);
  console.log('✔ Malformed ObjectId rejected with 400 Bad Request');

  // 10. PATCH /api/admin/leads/:id Status & Notes Update
  console.log('\n[Test 10] PATCH /api/admin/leads/:id Update Status & Notes');
  // 10a: Test invalid status rejection
  const badStatusRes = await fetch(`${BASE_URL}/admin/leads/${testLeadId}`, {
    method: 'PATCH',
    headers: authHeaders,
    body: JSON.stringify({ status: 'invalid_status_value' }),
  });
  assert.strictEqual(badStatusRes.status, 400);
  console.log('✔ Disallowed status value correctly rejected');

  // 10b: Valid status update
  const updateRes = await fetch(`${BASE_URL}/admin/leads/${testLeadId}`, {
    method: 'PATCH',
    headers: authHeaders,
    body: JSON.stringify({
      status: 'contacted',
      notes: 'Initial 20-minute discovery call conducted. Scope agreed.',
    }),
  });
  assert.strictEqual(updateRes.status, 200);
  const updateData = await updateRes.json();
  assert.strictEqual(updateData.lead.status, 'contacted');
  assert.strictEqual(updateData.lead.notes, 'Initial 20-minute discovery call conducted. Scope agreed.');
  console.log(`✔ Lead ${testLeadId} status updated to 'contacted' with internal notes`);

  // 11. GET /api/admin/stats Aggregated Metrics
  console.log('\n[Test 11] GET /api/admin/stats Aggregated CRM Metrics');
  const statsRes = await fetch(`${BASE_URL}/admin/stats`, { headers: authHeaders });
  assert.strictEqual(statsRes.status, 200);
  const statsData = await statsRes.json();
  assert.ok(statsData.data.metrics.total >= 1);
  assert.ok(statsData.data.metrics.contacted >= 1);
  assert.ok(Array.isArray(statsData.data.serviceBreakdown));
  console.log(`✔ Aggregated metrics: Total Leads=${statsData.data.metrics.total}, Contacted=${statsData.data.metrics.contacted}`);

  // 12. DELETE /api/admin/leads/:id
  console.log('\n[Test 12] DELETE /api/admin/leads/:id Document Deletion');
  const deleteRes = await fetch(`${BASE_URL}/admin/leads/${testLeadId}`, {
    method: 'DELETE',
    headers: authHeaders,
  });
  assert.strictEqual(deleteRes.status, 200);
  const deleteData = await deleteRes.json();
  assert.strictEqual(deleteData.success, true);
  console.log(`✔ Lead ${testLeadId} permanently deleted from database`);

  // 13. POST /api/auth/logout Cookie Invalidation
  console.log('\n[Test 13] Admin Logout & Cookie Clearing');
  const logoutRes = await fetch(`${BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: authHeaders,
  });
  assert.strictEqual(logoutRes.status, 200);
  const logoutCookie = logoutRes.headers.get('set-cookie');
  assert.ok(logoutCookie.includes('token=;'), 'Token cookie value cleared');
  assert.ok(logoutCookie.toLowerCase().includes('expires=') || logoutCookie.toLowerCase().includes('max-age=0'), 'Cookie expiration set to past');
  console.log('✔ Admin logged out successfully and HttpOnly session cookie cleared');

  console.log('\n========================================================');
  console.log('🎉 ALL 13 ADVANCED BACKEND & SECURITY TESTS PASSED! 🎉');
  console.log('========================================================\n');
}

testBackendSuite().catch((err) => {
  console.error('\n❌ Test Suite Failed:', err);
  process.exit(1);
});
