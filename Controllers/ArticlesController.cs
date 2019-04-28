using System;
using System.Collections;
using System.Collections.Generic;
using DotnetcoreReactRedux.Models;
using Microsoft.AspNetCore.Mvc;
using Amazon;
using Amazon.DynamoDBv2;
using System.Threading.Tasks;

namespace DotnetcoreReactRedux.Controllers
{
    [Route("api")]
    public class ArticlesController : Controller
    {
        private readonly DataSeeder _seeder;
        private readonly IAmazonDynamoDB _dynamoDBClient;

        public ArticlesController(IAmazonDynamoDB dynamoDBClient)
        {
            _seeder = new DataSeeder();
            _dynamoDBClient = dynamoDBClient;
        }

        [HttpGet]
        [Route("[controller]")]
        public List<Article> Articles()
        {
            return _seeder.GetSeedArticles();
        }

        [HttpGet]
        [Route("article")]
        public Article Article([FromQuery] int id)
        {
            return _seeder.GetSeedArticle(id);
        }

        [HttpGet]
        [Route("article-test")]
        public async Task<string> CreateArticle()
        {
            // Get DynamoDB result.
            // Amazon.DynamoDBv2.Model.ScanResponse dbResult = await _dynamoDBClient.ScanAsync(
            //     new Amazon.DynamoDBv2.Model.ScanRequest()
            //     {
            //         TableName = "dotnetcore-react-redux-blog-articles",
            //     }
            // );
            // System.Console.WriteLine(dbResult.Items.Count);

            // _dynamoDBClient.Config.
            var k = new Dictionary<string, Amazon.DynamoDBv2.Model.AttributeValue>();
            k.Add("id", new Amazon.DynamoDBv2.Model.AttributeValue() { N = "1" });
            var result = await _dynamoDBClient.GetItemAsync("dotnetcore-react-redux-blog-articles", k);


            // var ur = await _dynamoDBClient.QueryAsync(new Amazon.DynamoDBv2.Model.QueryRequest("dotnetcore-react-redux-users")
            // {
            //     IndexName = "username-index",
            //     KeyConditionExpression = "username = :username",
            //     ExpressionAttributeValues = new Dictionary<string, Amazon.DynamoDBv2.Model.AttributeValue>()
            //     {
            //         [":username"] = new Amazon.DynamoDBv2.Model.AttributeValue() { S = "amoretspero" }
            //     },
            //     ScanIndexForward = true
            // });
            // System.Console.WriteLine(ur.Items.Count);

            // var usersResult = await _dynamoDBClient.GetItemAsync("dotnetcore-react-redux-users", new Dictionary<string, Amazon.DynamoDBv2.Model.AttributeValue>()
            // {
            //     ["username"] = new Amazon.DynamoDBv2.Model.AttributeValue() { S = "amoretspero" }
            // });
            // System.Console.WriteLine(usersResult.Item["username"].S);

            return result.Item["title"].S;
        }
    }
}