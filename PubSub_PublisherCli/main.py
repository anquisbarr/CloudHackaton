import os
from google.cloud import pubsub_v1

# TODO(developer)

#Credentials
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'application_default_credentials.json'

project_id = "deep-wares-259119"
topic_id = "my-topic"

publisher = pubsub_v1.PublisherClient()
# The `topic_path` method creates a fully qualified identifier
# in the form `projects/{project_id}/topics/{topic_id}`
topic_path = publisher.topic_path(project_id, topic_id)

for n in range(1, 10):
    data_str = f"Message number from my laptop {n}"
    # Data must be a bytestring
    data = data_str.encode("utf-8")
    # When you publish a message, the client returns a future.
    future = publisher.publish(topic_path, data)
    print(future.result())

print(f"Published messages to {topic_path}.")