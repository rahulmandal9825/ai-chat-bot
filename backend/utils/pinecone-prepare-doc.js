
import { embedAndStoreDocs } from "./vector-store.js";
import { getPineconeClient } from "./pinecone-client.js";
import { getChunkedDocsFromCSV } from "./csv-loader.js";

// This operation might fail because indexes likely need
// more time to init, so give some 5 mins after index
// creation and try again.
(async () => {
  try {
    const pineconeClient = await getPineconeClient();
    console.log("Preparing chunks from CSV file");
    const docs = await getChunkedDocsFromCSV();
    console.log(`Loading ${docs.length} chunks into pinecone...`);
    await embedAndStoreDocs(pineconeClient, docs);
    console.log("Data embedded and stored in pine-cone index");
  } catch (error) {
    console.error("Init client script failed ", error);
  }
})();