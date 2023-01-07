import * as AWS from 'aws-sdk'
import { ConfigurationOptions } from 'aws-sdk'

const configuration = ConfigurationOptions = {
    region: 'us-east-1',
    secretAccessKey: 'XlMEunjR09kqA7HKLSj4sz9AmvVBRIgfZ/HFOuba',
    accessKeyId: 'AKIAXUNT5ERQBEGIBJTI'
}

AWS.config.update(configuration)

const docClient = new AWS.DynamoDB.DocumentClient()


/******************  GET  **********************/


export const fetchData = async(weekNum) => {
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

    export const fetchFinishers = async(data) => {
        try {
            var params = {
                TableName : "finishers",
                IndexName : "stem_id_index",
                KeyConditionExpression: "#stem_id = :stem_id",
                ExpressionAttributeNames:{
                    "#stem_id": "stem_id"
                },
                ExpressionAttributeValues: {
                    ":stem_id": data.stem_id
                }
            };
            var result = (await docClient.query(params).promise()).Items;
            
            console.log(result[0]);
        } 
        catch (error) {
            console.error(error);
        }
        return result;
    }

    export const getUser = async(username) => {
        try {
            var params = {
                TableName : "user",
                IndexName : "username_index",
                KeyConditionExpression: "#username = :username",
                ExpressionAttributeNames:{
                    "#username": "username"
                },
                ExpressionAttributeValues: {
                    ":username": username
                }
            };
            var result = (await docClient.query(params).promise()).Items;
            
            console.log(result[0]);
        } 
        catch (error) {
            console.error(error);
        }
        return result;
    }



/******************  PUT **********************/


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

export const postUser = async(data) => {
    var documentClient = new AWS.DynamoDB.DocumentClient();
    console.log("Loading user data into DynamoDB");
    var random_id = Math.random() + Date.now();
    var params = 
    {
        "TableName": "user",
        "Item": {
            "user_id": {"N": random_id.toString()},
            "username": {"S": data.username},
            "first_name":{"S": data.first_name},
            "last_name":{"S": data.last_name},
            "email":{"S": data.email},
            "hash":{"S": data.hash}
        }
    }


    dynamodb.putItem(params, function(err, data) {
        if (err) {
          console.log(err);
          console.error("Can't add user.");
      } else {
        console.log("Succeeded adding an item for this user: ", data.finisher);
    }
});}



