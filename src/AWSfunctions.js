import * as AWS from 'aws-sdk'
const configuration: ConfigurationOptions = {
    region: 'us-east-1',
    secretAccessKey: 'XlMEunjR09kqA7HKLSj4sz9AmvVBRIgfZ/HFOuba',
    accessKeyId: 'AKIAXUNT5ERQBEGIBJTI'
}

AWS.config.update(configuration)

const docClient = new AWS.DynamoDB.DocumentClient()

/* GET */

export const fetchData = async(weekNum) => {
    /*var params = {
        Key: {
             "Id": "1", 
             "prompt": "If I bring more awareness to my life today…"
            },
        TableName: tableName
    }
    var result = await docClient.get(params).promise()
    console.log(JSON.stringify(result))

    docClient.scan(params, function (err, data) {
        if (!err) {
            console.log(data)
        }
    })*/
    /*var params = {
            TableName: tableName
        };
    var result = await docClient.scan(params).promise()
    console.log(JSON.stringify(result))*/
    /*var params = {
            KeyConditionExpression: 'Id = :Id',
            ExpressionAttributeValues: {
                ':Id': '1'
            },
            TableName: tableName
        };
        var result = await docClient.query(params).promise()
        console.log(JSON.stringify(result))*/
        try {
            var params = {
                TableName : "six_pillars_prompts",
                IndexName : "week_num_index",
                KeyConditionExpression: "#week_num = :week_num",
                ExpressionAttributeNames:{
                    "#week_num": "week_num"
                },
                ExpressionAttributeValues: {
                    ":week_num": weekNum
                }
            };
            console.log("backend " + weekNum)
            var result = (await docClient.query(params).promise()).Items;
            
            console.log(result[0].prompt);
        } 
        catch (error) {
            console.error(error);
        }

        return result;
    }

    /* PUT */


    var dynamodb = new AWS.DynamoDB();


// -----------------------------------------
// Create the document client interface for DynamoDB
export const postData = async(data) => {
    var documentClient = new AWS.DynamoDB.DocumentClient();
    console.log("Loading finisher data into DynamoDB");
    var random_id = Math.random() + Date.now();
    var params = 
    {
        "TableName": "finishers",
        "Item": {
            "finisher_id": {"N": random_id.toString()},
            "user_id": {"S": data.user_id},
            "finisher":{"S": data.finisher},
            "stem_id":{"S": data.finisher_id}
        }
    }


    dynamodb.putItem(params, function(err, data) {
        if (err) {
          console.log(err);
          console.error("Can't add prompt.");
      } else {
        console.log("Succeeded adding an item for this prompt: ", data.finisher);
    }
});}



