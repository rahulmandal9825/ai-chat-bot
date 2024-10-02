
import { delay } from "./utils.js";

import { Pinecone } from '@pinecone-database/pinecone'
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });


let pineconeClientInstance= null;


console.log(process.env.PINECONE_INDEX_NAME)
// Create pineconeIndex if it doesn't exist
async function createIndex(client, indexName) {
  try {
console.log("creating index has benn actived")
      
      await client.createIndex({
        name: indexName,
        dimension: 768,
        metric: 'cosine',
        spec: {
          serverless: {
            cloud: 'aws',
            region: 'us-east-1'
          }
        },
        deletionProtection: 'disabled',
      });
    console.log(
      `Waiting for ${process.env.INDEX_INIT_TIMEOUT} seconds for index initialization to complete...`
    );
    await delay(process.env.INDEX_INIT_TIMEOUT);
    console.log("Index created !!");
  } catch (error) {
    console.error("error ", error);
    throw new Error("Index creation failed");
  }
}

// Initialize index and ready to be accessed.
async function initPineconeClient() {
  try {
    const pineconeClient = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY
      });

    const indexName = process.env.PINECONE_INDEX_NAME;

    const existingIndexes = await pineconeClient.listIndexes();
    console.log(existingIndexes)

    // if (!existingIndexes.indexes?.includes(indexName)) {
    //   createIndex(pineconeClient, indexName);
    // } else {
    //   console.log("Your index already exists. nice !!");
    // }

    return pineconeClient;
  } catch (error) {
    console.error("error", error);
    throw new Error("Failed to initialize Pinecone Client");
  }
}

export async function getPineconeClient() {
  if (!pineconeClientInstance) {
    pineconeClientInstance = await initPineconeClient();
  }

  return pineconeClientInstance;
}

