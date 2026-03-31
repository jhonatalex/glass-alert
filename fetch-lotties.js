const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = path.join(__dirname, 'src', 'assets', 'lotties');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

const emojis = {
  success: '2705',
  error: '274c',
  warning: '26a0_fe0f',
  info: '1f4a1',
  question: '2753'
};

Object.keys(emojis).forEach(key => {
  const url = `https://fonts.gstatic.com/s/e/notoemoji/latest/${emojis[key]}/lottie.json`;
  https.get(url, function(response) {
    if (response.statusCode === 200) {
      const file = fs.createWriteStream(path.join(dir, `${key}.json`));
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${key}.json`);
      });
    } else {
      console.log(`Failed ${key}.json: ${response.statusCode}`);
      // Fallback for variation selector
      if(emojis[key].includes('_fe0f')) {
        const fallbackUrl = `https://fonts.gstatic.com/s/e/notoemoji/latest/${emojis[key].split('_')[0]}/lottie.json`;
        https.get(fallbackUrl, res2 => {
            if(res2.statusCode === 200) {
              const file2 = fs.createWriteStream(path.join(dir, `${key}.json`));
              res2.pipe(file2);
              file2.on('finish', () => {
                  file2.close();
                  console.log(`Downloaded ${key}.json (fallback)`);
              });
            } else {
              console.log(`Failed fallback ${key}.json`);
            }
        });
      }
    }
  }).on('error', (err) => console.log('Error:', err));
});
