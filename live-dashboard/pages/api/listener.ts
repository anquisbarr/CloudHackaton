import { PubSub } from "@google-cloud/pubsub";
import { NextApiRequest, NextApiResponse } from "next";

// Creates a client; cache this for further use
const pubSubClient = new PubSub({
  projectId: "deep-wares-259119",
});
const subscription_id: string = "my-sub";
const subscription = pubSubClient.subscription(subscription_id);

function listenForMessages() {
  // Create an event handler to handle messages
  const messageHandler = (message: any) => {
    console.log(`Received message ${message.id}:`);
    console.log(`\tData: ${message.data}`);
    console.log(`\tAttributes: ${message.attributes}`);
    // "Ack" (acknowledge receipt of) the message
    message.ack();
  };

  const streaming_pull_future = subscription.on("message", messageHandler);

  //Wrap subscription.on in a promise
  return new Promise<void>((resolve, reject) => {
    streaming_pull_future.on("error", (err: any) => {
      console.error(err);
      reject(err);
    });
    streaming_pull_future.on("close", () => {
      console.log("Done listening for messages.");
      resolve();
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // Listen to messages
  await listenForMessages();

  res.status(200).json({ name: "John Doe" });
}

listenForMessages();
