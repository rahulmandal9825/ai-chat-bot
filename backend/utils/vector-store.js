

import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { PineconeStore } from "@langchain/pinecone";
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });


export async function embedAndStoreDocs(
  client,
  // @ts-ignore docs type error
  docs 
) {
  /*create and store the embeddings in the vectorStore*/
  try {
    console.log("victor-store")
    const embeddings = new GoogleGenerativeAIEmbeddings({
      model: "embedding-001", // Specify the model to use
      taskType: TaskType.RETRIEVAL_DOCUMENT,
      title: "Document title", // Optional: Add a title if needed
      apiKey: process.env.GOOGLE_API_KEY // Use your Google API key
    });
    const index = client.Index(process.env.PINECONE_INDEX_NAME);

    //embed the PDF documents
    await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex: index,
      textKey: 'text',
    });
    console.log("done")
  } catch (error) {
    console.log('error ', error);
    throw new Error('Failed to load your docs !');
  }
}

// Returns vector-store handle to be used a retrievers on langchains
export async function getVectorStore(client) {
  try {
    const embeddings = new GoogleGenerativeAIEmbeddings({
      model: "embedding-001", // Specify the model to use
      taskType: TaskType.RETRIEVAL_DOCUMENT,
      title: "Document title", // Optional: Add a title if needed
      apiKey: process.env.GOOGLE_API_KEY // Use your Google API key
    });
    
    const index = client.Index(process.env.PINECONE_INDEX_NAME);

    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex: index,
      textKey: 'text',
    });

    return vectorStore;
  } catch (error) {
    console.log('error ', error);
    throw new Error('Something went wrong while getting vector store !');
  }
}




// import { OpenAIEmbeddings } from "@langchain/openai";


// export async function embedAndStoreDocs(){
//     const embeddings = new OpenAIEmbeddings({
//   apiKey: process.env.OPENAI_API_KEY, // In Node.js defaults to process.env.OPENAI_API_KEY
// });

// return embeddings

// }




