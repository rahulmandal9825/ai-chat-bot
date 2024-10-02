import { callChain } from "../utils/langchain.js";




// Helper function to format messages
const formatMessage = (message) => {
  return `${message.role === "user" ? "Human" : "Assistant"}: ${message.content}`;
};

export const chatHandler = async (req, res) => {
  const body = req.body;
  console.log(body)
  const messages = body?.messages ?? [];

  console.log("Messages: ", messages);

  // Format previous messages and extract the question
  // const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
  // const question = messages[messages.length - 1]?.content;

  // console.log("Chat history: ", formattedPreviousMessages.join('\n'));

  // if (!question) {
  //   return res.status(400).json({ error: "Error: No question in the request" });
  // }

  // try {
  //   // Call Langchain logic with the question and chat history
  //   const streamingTextResponse = await callChain({
  //     question,
  //     chatHistory: formattedPreviousMessages.join('\n'),
  //   });

  //   // Send the response back
  //   return res.json(streamingTextResponse);
  // } catch (error) {
  //   console.error("Internal server error: ", error);
  //   return res.status(500).json({ error: "Error: Something went wrong. Try again!" });
  // }
};
//


// export const text =async(req,res)=>{
//     try {
//         const pineconeClient = await getPineconeClient();
//         console.log("Preparing chunks from CSV file");
//         const docs = await getChunkedDocsFromCSV();
//         console.log(`Loading ${docs.length} chunks into pinecone...`);
//         const victorstore =  await embedAndStoreDocs(pineconeClient, docs);
//         console.log("Data embedded and stored in pine-cone index");

//         console.log(victorstore )

//       } catch (error) {
//         console.error("Init client script failed ", error);
//       }
    

// }