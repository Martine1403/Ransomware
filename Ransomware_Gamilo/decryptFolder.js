const encryptor = require('file-encryptor');
const path = require('path');
const fs = require('fs');
const readlineSync = require('readline-sync');

const folderPath = 'D:/Ransomware_Gamilo/Items'; 
const correctPassword = 'imissyoually'; 


const userPay = readlineSync.questionInt('Enter your Payment: ');

if (userPay >= 500) {
 
  console.log(`The password is: ${correctPassword}`);

  
  const enteredPassword = readlineSync.question('Enter the password: ', {
    hideEchoBack: true, 
  });

  if (enteredPassword === correctPassword) {
    const encryptedFilesPath = path.join(folderPath, 'encrypted');
    const decryptedFolderPath = path.join(folderPath, 'decrypted');


    if (!fs.existsSync(encryptedFilesPath)) {
      console.error(`Folder ${encryptedFilesPath} does not exist.`);
      process.exit(1);
    }

  
    if (!fs.existsSync(decryptedFolderPath)) {
      fs.mkdirSync(decryptedFolderPath);
    }

  
    const files = fs.readdirSync(encryptedFilesPath);

    files.forEach((file) => {
      const encryptedFilePath = path.join(encryptedFilesPath, file);
      const decryptedFilePath = path.join(decryptedFolderPath, file.replace('.encrypted', ''));

      if (fs.statSync(encryptedFilePath).isFile()) {
        encryptor.decryptFile(encryptedFilePath, decryptedFilePath, correctPassword, (err) => {
          if (err) {
            console.error(`Decryption failed for file ${file}:`, err);
          } else {
            console.log(`File ${file} decrypted successfully.`);
          }
        });
      }
    });
  } else {
    console.log('Incorrect password. Exiting...');
  }
} else {
  console.log('You are not eligible to access this content.');
}