import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

export const handler = async(event) => {
const client = new DynamoDBClient({ region: "us-east-1" });
    
    let responseBody = "";
    let statusCode = 0;
    
    let { id, price } = JSON.parse(event.body);

    const params = {
        TableName: "dio_tb_items",
        Item: {
          id: {
              S: id,
            },
          price: {
              N: price.toString(),
            }
        }
    }
    try {
        const command = new PutItemCommand(params);
        const response = await client.send(command);
        statusCode = 200;
        responseBody = JSON.stringify(response);
    } catch (err) {
        statusCode = 200;
        responseBody = JSON.stringify(err.message);
    }
    
    const response = {
        statusCode: statusCode,
        body: responseBody,
    };
    return response;
};
