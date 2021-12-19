const dasha = require("@dasha.ai/sdk");
const fs = require("fs");

const {
  findSupermarketInCity,
  filterNoSeafood,
  filterVegan,
  recommend,
  findRestaurantInCity,
  findLoc,
  findHotelInCity,
} = require("./utils/externalFunc");

const main = async () => {
  const app = await dasha
    .deploy(`${__dirname}/app`)
    .catch((err) => console.log(err));
  // External functions
  app.setExternal("findLoc", findLoc);
  app.setExternal("findRestaurantInCity", findRestaurantInCity);
  app.setExternal("recommend", recommend);
  app.setExternal("filterVegan", filterVegan);
  app.setExternal("filterNoSeafood", filterNoSeafood);
  app.setExternal("findSupermarketInCity", findSupermarketInCity);
  app.setExternal("findHotelInCity", findHotelInCity);

  app.connectionProvider = async (conv) =>
    conv.input.phone === "chat"
      ? dasha.chat.connect(await dasha.chat.createConsoleChat())
      : dasha.sip.connect(new dasha.sip.Endpoint("default"));
  app.ttsDispatcher = () => "dasha";
  await app.start();

  const conv = app.createConversation({ phone: process.argv[2] ?? "" });
  if (conv.input.phone !== "chat") conv.on("transcription", console.log);
  const logFile = await fs.promises.open("./log.txt", "w");
  await logFile.appendFile("#".repeat(100) + "\n");

  conv.on("transcription", async (entry) => {
    await logFile.appendFile(`${entry.speaker}: ${entry.text}\n`);
  });

  conv.on("debugLog", async (event) => {
    if (event?.msg?.msgId === "RecognizedSpeechMessage") {
      const logEntry = event?.msg?.results[0]?.facts;
      await logFile.appendFile(JSON.stringify(logEntry, undefined, 2) + "\n");
    }
  });
  const result = await conv.execute();
  console.log(result.output);

  await app.stop();
  app.dispose();

  await logFile.close();
};

main();
