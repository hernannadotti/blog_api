import express from 'express';
const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Minimal diagnostic app is running!');
});

app.get('/posts', (req, res) => {
  // This is the route that was previously erroring.
  // We'll make it very simple.
  try {
    res.send('Minimal /posts route is working!');
  } catch (e) {
    // This catch block is just for safety, though unlikely to be hit.
    // The original error was on line 30. This file is much shorter.
    // If the error still points to line 30, it's a strong indicator
    // that Vercel is not using the newly deployed file content correctly.
    console.error('Error in minimal /posts:', e);
    res.status(500).send('Minimal /posts error.');
  }
});

// Adding a few more lines to ensure we are past where line 30 would be
// in a more complex file, just for thoroughness, though the file will be short.
console.log("Minimal app initialized.");
console.log("Test line 1");
console.log("Test line 2");
console.log("Test line 3");
console.log("Test line 4");
console.log("Test line 5");
console.log("Test line 6");
console.log("Test line 7");
console.log("Test line 8"); // This would be around line 25
console.log("Test line 9");
console.log("Test line 10");
console.log("Test line 11");
console.log("Test line 12");
console.log("Test line 13"); // This is line 30 in this new file

export default app;
