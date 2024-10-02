import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";


export async function getChunkedDocsFromCSV() {
    console.log("csv-loader")
  try {
    const exampleCsvPath =
    "../corrected_final_home_improvement_services.csv";
  
  const loader = new CSVLoader(exampleCsvPath);
  
   const docs = await loader.load();

    
    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 200,         // Increased chunk size
        chunkOverlap: 50, 
    });

    const chunkedDocs = await textSplitter.splitDocuments(docs);

    return chunkedDocs;
  } catch (e) {
    console.error(e);
    throw new Error("CSV docs chunking failed !");
  }
}
