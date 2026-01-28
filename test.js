import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000';

// Test 1: POST /notes dengan payload yang salah (missing fields)
console.log('\n=== Test 1: POST /notes dengan payload yang salah ===');
const badPayload = {
  title: '', // empty title seharusnya gagal
};

try {
  const response = await fetch(`${BASE_URL}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(badPayload),
  });

  const data = await response.json();
  console.log(`Status: ${response.status}`);
  console.log(`Response:`, JSON.stringify(data, null, 2));
} catch (error) {
  console.error('Error:', error.message);
}

// Test 2: PUT /notes/:id dengan payload yang salah
console.log('\n=== Test 2: PUT /notes/123 dengan payload yang salah ===');
const badUpdatePayload = {
  title: '', // empty title
};

try {
  const response = await fetch(`${BASE_URL}/notes/123`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(badUpdatePayload),
  });

  const data = await response.json();
  console.log(`Status: ${response.status}`);
  console.log(`Response:`, JSON.stringify(data, null, 2));
} catch (error) {
  console.error('Error:', error.message);
}

// Test 3: POST /notes dengan payload yang benar
console.log('\n=== Test 3: POST /notes dengan payload yang benar ===');
const goodPayload = {
  title: 'Test Note',
  body: 'This is a test note',
  tags: ['test'],
};

try {
  const response = await fetch(`${BASE_URL}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(goodPayload),
  });

  const data = await response.json();
  console.log(`Status: ${response.status}`);
  console.log(`Response:`, JSON.stringify(data, null, 2));
} catch (error) {
  console.error('Error:', error.message);
}

process.exit(0);
