
const BASE_URL = 'http://localhost:3000';
let noteId = ''; // Variable to store the ID of the created note

async function runTests() {
  console.log('Starting API Tests...\n');

  // ==========================================
  // Test 1: POST /notes (Failure - Invalid Payload)
  // ==========================================
  console.log('=== Test 1: POST /notes (Failure - Payload Kosong) ===');
  try {
    const response = await fetch(`${BASE_URL}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: '' }),
    });
    const data = await response.json();
    console.log(`Status: ${response.status} (Expected: 400)`);
    console.log(`Response: ${data.message}\n`);
  } catch (err) {
    console.error('Test 1 Failed:', err.message);
  }

  // ==========================================
  // Test 2: POST /notes (Success - Valid Payload)
  // ==========================================
  console.log('=== Test 2: POST /notes (Success - Create Note) ===');
  try {
    const payload = {
      title: 'Catatan Belanja',
      body: 'Beli susu, telur, dan roti',
      tags: ['belanja', 'harian'],
    };
    const response = await fetch(`${BASE_URL}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    console.log(`Status: ${response.status} (Expected: 201)`);
    console.log(`Response:`, data);

    if (response.status === 201 && data.data && data.data.noteId) {
      noteId = data.data.noteId;
      console.log(`[Captured Note ID: ${noteId}]\n`);
    } else {
      console.error('Failed to capture Note ID. Aborting dependent tests.\n');
      return;
    }
  } catch (err) {
    console.error('Test 2 Failed:', err.message);
    return;
  }

  // ==========================================
  // Test 3: GET /notes (Success - Get All Notes)
  // ==========================================
  console.log('=== Test 3: GET /notes (Success - Get List) ===');
  try {
    const response = await fetch(`${BASE_URL}/notes`);
    const data = await response.json();
    console.log(`Status: ${response.status} (Expected: 200)`);
    console.log(`Total Notes found: ${data.data?.notes?.length || 0}`);
    console.log('Sample Data:', data.data?.notes?.[0] || 'No notes');
    console.log('');
  } catch (err) {
    console.error('Test 3 Failed:', err.message);
  }

  // ==========================================
  // Test 4: GET /notes/:id (Success - Get Details)
  // ==========================================
  console.log(`=== Test 4: GET /notes/${noteId} (Success - Get Detail) ===`);
  try {
    const response = await fetch(`${BASE_URL}/notes/${noteId}`);
    const data = await response.json();
    console.log(`Status: ${response.status} (Expected: 200)`);
    console.log(`Retrieved Title: "${data.data.title}"`);
    console.log('');
  } catch (err) {
    console.error('Test 4 Failed:', err.message);
  }

  // ==========================================
  // Test 5: PUT /notes/:id (Success - Update Note)
  // ==========================================
  console.log(`=== Test 5: PUT /notes/${noteId} (Success - Update) ===`);
  try {
    const updatePayload = {
      title: 'Catatan Belanja (Revisi)',
      body: 'Beli susu, telur, roti, dan keju',
      tags: ['belanja', 'mingguan'],
    };
    const response = await fetch(`${BASE_URL}/notes/${noteId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatePayload),
    });
    const data = await response.json();
    console.log(`Status: ${response.status} (Expected: 200)`);
    console.log(`Response: ${data.message}\n`);
  } catch (err) {
    console.error('Test 5 Failed:', err.message);
  }

  // ==========================================
  // Test 6: Verify Update (Optional check)
  // ==========================================
  console.log(`=== Test 6: Verify Update via GET ===`);
  try {
    const response = await fetch(`${BASE_URL}/notes/${noteId}`);
    const data = await response.json();
    console.log(`New Title: "${data.data.title}" (Expected: "Catatan Belanja (Revisi)")\n`);
  } catch (err) {
    console.error('Test 6 Failed:', err.message);
  }

  // ==========================================
  // Test 7: DELETE /notes/:id (Success - Delete)
  // ==========================================
  console.log(`=== Test 7: DELETE /notes/${noteId} (Success - Delete) ===`);
  try {
    const response = await fetch(`${BASE_URL}/notes/${noteId}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    console.log(`Status: ${response.status} (Expected: 200)`);
    console.log(`Response: ${data.message}\n`);
  } catch (err) {
    console.error('Test 7 Failed:', err.message);
  }

  // ==========================================
  // Test 8: GET /notes/:id (Failure - Not Found)
  // ==========================================
  console.log(`=== Test 8: GET /notes/${noteId} (Failure - Expect 404) ===`);
  try {
    const response = await fetch(`${BASE_URL}/notes/${noteId}`);
    const data = await response.json();
    console.log(`Status: ${response.status} (Expected: 404)`);
    console.log(`Response: ${data.message}\n`);
  } catch (err) {
    console.error('Test 8 Failed:', err.message);
  }

  console.log('=== All Tests Completed ===');
}

runTests();
