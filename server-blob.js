import express from "express";
import fileUpload from "express-fileupload";
import path from "path";
import { fileURLToPath } from "url";
import azureStorage from "azure-storage";
import intoStream from "into-stream";
import dotenv from "dotenv";

// 1.
const __filename = fileURLToPath(import.meta.url);
// 2.
const port = process.env.PORT || 7001;
// 3. 
const instance = new express();

// 4. 
const containerName = "imagecontainer";

// 5.
const __dirname = path.dirname(__filename);
// 6. 
dotenv.config();
// 7. 
instance.use(
  fileUpload({
    createParentPath: true,
  })
);
// 8. 
const blobService = azureStorage.createBlobService(
  process.env.AZURE_STORAGE_CONNECTION_STRING
);
// 9.
instance.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
// 10. 
instance.post("/fileupload", (request, response) => {
  // 10.1.
  if (!request.files) {
    return res.status(400).send("No files are received.");
  }

  // 10.2.
  const file = request.files.file;
  // 10.3. 
  const path = __dirname + "/files/" + file.name;
  // 10.4. 
  file.mv(path, (err) => {
    // 10.5.
    if (err) {
      return response.status(500).send(err);
    }
    // 10.6. 
    return response.send({ status: "success", path: path });
  });
});
// 11. 
instance.post("/blobupload", (request, response) => {
  if (!request.files) {
    return res.status(400).send("No files are received.");
  }

  // 11.1.  
  const blobName = request.files.file.name;
  console.log(`Blob Name ${blobName}`);
  // 11.2. 
  const stream = intoStream(request.files.file.data);
  console.log(`stream ${stream}`);
  // 11.3. 
  const streamLength = request.files.file.data.length;
  console.log(`Length ${streamLength}`);
  // 11.4. 
  blobService.createBlockBlobFromStream(
    containerName,
    blobName,
    stream,
    streamLength,
    (err) => {
      if (err) {
        response.status(500);
        response.send({ message: "Error Occured" });
        return;
      }

      response.status(200).send({message: 
'File Uploaded Successfully'});
    }
  );
});
// 12. 
instance.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});