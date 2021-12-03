import fs from "fs";

const readFile = async (filePath) => {
  try {
    const data = await (await fs.promises.readFile(filePath, "utf8"))
      .toString()
      .split("\n");
    return data;
  } catch (err) {
    console.error(err);
  }
};

const getPassword = async () => {
  let data = await readFile("eff_large_wordlist.txt");
  let length = data.length;
  let entropy = Math.log2(length ** 4).toFixed(1);
  let pw = {
    readable: "",
    useable: "",
    symbolPoolSize: length,
    bitsOfEntropy: entropy,
    equivAlphaNum: (Math.log(length ** 4) / Math.log(62)).toFixed(1),
  };
  for (let i = 0; i < 4; i++) {
    let word = data[Math.floor(Math.random() * data.length)];
    if (i === 0) {
      pw.readable += word;
      pw.useable += word;
    } else {
      pw.readable += " " + word;
      pw.useable += word;
    }
  }
  return pw;
};

const printPassword = async () => {
  const pw = await getPassword();
  console.log("Password (readable):   ", pw.readable);
  console.log("Password (useable):    ", pw.useable);
  console.log("Bits of Entropy:       ", pw.bitsOfEntropy);
  console.log("Equiv AlphaNum Length: ", pw.equivAlphaNum);
};

printPassword();
