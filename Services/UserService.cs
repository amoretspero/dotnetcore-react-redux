using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Linq;
using System.Text;
using DotnetcoreReactRedux.Models;
using Microsoft.Extensions.Configuration;
using Amazon.DynamoDBv2;
using System.Threading.Tasks;
using Amazon.DynamoDBv2.Model;

namespace DotnetcoreReactRedux.Services
{
    /// <summary>
    /// Interface for user service. This interface consists of what a user service class should provide.
    /// </summary>
    public interface IUserService
    {
        /// <summary>
        /// Trys to authenticate a user via username and password.
        /// </summary>
        /// <param name="username">Username of a user who trys to authenticate.</param>
        /// <param name="passwordHash">Password of a user who trys to authenticate.</param>
        /// <returns>When successful, User entity will be returned. In case of failure, null will be returned.</returns>
        Task<User> Authenticate(string username, string password);

        /// <summary>
        /// Gets all users.
        /// </summary>
        /// <returns>All users who has been registered.</returns>
        Task<List<User>> GetAll();

        /// <summary>
        /// Get a single user by id.
        /// </summary>
        /// <param name="id">Id of the user to get.</param>
        /// <returns>When successful, target user entity will be returned. In case of failure, null will be returned.</returns>
        Task<User> GetById(int id);

        /// <summary>
        /// Creates a user entity with given information.
        /// </summary>
        /// <param name="user">User information to use.</param>
        /// <param name="password">Password of the user.</param>
        /// <returns>When successful, newly created user entity will be returned. Otherwise exception will be thrown.</returns>
        Task<User> Create(User user, string password);

        /// <summary>
        /// Updates user's information. Possibly including password.
        /// </summary>
        /// <param name="user">Target user to update information of.</param>
        /// <param name="password">Password to update. Only required when password should be updated.</param>
        /// <returns>When successful, newly updated information will be returned. Otherwise exception will be thrown.</returns>
        Task<User> Update(User user, string password = null);

        /// <summary>
        /// Deletes a user by id.
        /// </summary>
        /// <param name="id">Id of a user to be deleted.</param>
        void Delete(int id);
    }

    /// <summary>
    /// User service class for this application.
    /// </summary>
    public class UserService : IUserService
    {
        /// <summary>
        /// Data context to be used by user service.
        /// </summary>
        private DataContext _context;

        private static IConfiguration _config;

        /// <summary>
        /// Default constructor.
        /// </summary>
        /// <param name="context">Data context to use.</param>
        public UserService(DataContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        /// <summary>
        /// Try to authenticate a user with given username and password.
        /// </summary>
        /// <param name="username">Username to be used for authentication.</param>
        /// <param name="password">Password to be used for authentication.</param>
        /// <returns>User entity when successful, null otherwise.</returns>
        public Task<User> Authenticate(string username, string password)
        {
            // When username or password is null or whitespace only, that is not a valid value.
            if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(password))
            {
                return null;
            }

            // Try to get a user entity.
            User user = _context.Users.SingleOrDefault(u => u.Username == username);

            // Check if user exist.
            if (user == null)
            {
                return null;
            }

            // Check if password is correct.
            if (!VerifyPasswordHash(password, user.PasswordHash))
            {
                return null;
            }

            // Authentication successful.
            return Task.FromResult(user);
        }

        /// <summary>
        /// Get all users.
        /// </summary>
        /// <returns>All user entities.</returns>
        public Task<List<User>> GetAll()
        {
            return Task.FromResult(_context.Users.ToList());
        }

        /// <summary>
        /// Get a single user entity with given id.
        /// </summary>
        /// <param name="id">Id of the user to get.</param>
        /// <returns>If a user is found, will return that user entity. null otherwise.</returns>
        public Task<User> GetById(int id)
        {
            return Task.FromResult(_context.Users.Find(id));
        }

        /// <summary>
        /// Creates a user with given information.
        /// </summary>
        /// <param name="user">Entity holding user information, without password.</param>
        /// <param name="password">Password of a user.</param>
        /// <returns>Created user entity on success, null otherwise.</returns>
        public Task<User> Create(User user, string password)
        {
            // Password validation.
            if (string.IsNullOrWhiteSpace(password))
            {
                throw new ApplicationException("Password is required.");
            }

            if (_context.Users.Any(u => u.Username == user.Username))
            {
                throw new ApplicationException("Username '" + user.Username + "' is already taken.");
            }

            byte[] passwordHash;
            CreatePasswordHash(password, out passwordHash);

            user.PasswordHash = passwordHash;

            _context.Users.Add(user);
            _context.SaveChanges();

            return Task.FromResult(user);
        }

        /// <summary>
        /// Updates a user's information with given data.
        /// </summary>
        /// <param name="userParam">Information to be updated. Must have all information including non-changed ones.</param>
        /// <param name="password">To change password, set this parameter as non-null, non-whitespace only value.</param>
        public Task<User> Update(User userParam, string password = null)
        {
            User user = _context.Users.Find(userParam.Id);

            if (user == null)
            {
                throw new ApplicationException("User not found.");
            }

            if (userParam.Username != user.Username)
            {
                // username property is changed, so check if the new username has already been taken.
                if (_context.Users.Any(u => u.Username == userParam.Username))
                {
                    throw new ApplicationException("Username " + userParam.Username + " is already taken.");
                }
            }

            // Update user properties.
            user.Email = userParam.Email;
            user.FirstName = userParam.FirstName;
            user.LastName = userParam.LastName;
            user.Username = userParam.Username;

            // Update password if given.
            if (!string.IsNullOrWhiteSpace(password))
            {
                byte[] passwordHash;
                CreatePasswordHash(password, out passwordHash);

                user.PasswordHash = passwordHash;
            }

            _context.Users.Update(user);
            _context.SaveChanges();

            return Task.FromResult(user);
        }

        /// <summary>
        /// Deletes a user by id.
        /// </summary>
        /// <param name="id">Id of the user to be deleted.</param>
        public void Delete(int id)
        {
            User user = _context.Users.Find(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                _context.SaveChanges();
            }
        }

        /// <summary>
        /// Creates password hash. Scheme: SHA512
        /// </summary>
        /// <param name="password">Password to create SHA512 hash.</param>
        /// <param name="passwordHash">Byte array to store computed SHA512 hash.</param>
        private static void CreatePasswordHash(string password, out byte[] passwordHash)
        {
            if (password == null)
            {
                throw new ArgumentNullException("password");
            }

            if (string.IsNullOrWhiteSpace(password))
            {
                throw new ArgumentException("Value cannot be empty or whitespace only.", "password");
            }

            HMACSHA512 hmac = new HMACSHA512(Encoding.UTF8.GetBytes(_config.GetValue<String>("Secrets:PasswordHash")));

            passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        }

        /// <summary>
        /// Verifies given password with stored hash. Hash secret would be fetched from secrets storage.
        /// </summary>
        /// <param name="password">Password to verify.</param>
        /// <param name="storedHash">Stored password hash.</param>
        /// <returns>True when successful, false otherwise.</returns>
        private bool VerifyPasswordHash(string password, byte[] storedHash)
        {
            // Check if given password is null.
            if (password == null)
            {
                throw new ArgumentNullException("password");
            }

            // Check if given password is null or whitespace only.
            if (string.IsNullOrWhiteSpace(password))
            {
                throw new ArgumentException("Value cannot be empty or null or whitespace only.");
            }

            // Check stored hash length.
            if (storedHash.Length != 64)
            {
                throw new ArgumentException("Invalid length of password hash. Must be 64 characters.");
            }

            // Initializes HMAC sha-512 object with password hash secret.
            HMACSHA512 hmac = new HMACSHA512(Encoding.UTF8.GetBytes(_config.GetValue<String>("Secrets:PasswordHash")));

            // Compute hash of given password.
            byte[] computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));

            // Compare each byte.
            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != storedHash[i])
                {
                    return false;
                }
            }

            return true;
        }

    }

    /// <summary>
    /// User service class for this application, using NoSQL DynamoDB as backend.
    /// </summary>
    public class DynamoDBUserService : IUserService
    {
        /// <summary>
        /// Application configuration to be used by this UserService.
        /// </summary>
        private static IConfiguration _config;

        /// <summary>
        /// DynamoDB client.
        /// </summary>
        private static IAmazonDynamoDB _dynamoDBClient;

        /// <summary>
        /// Default constructor.
        /// </summary>
        /// <param name="config">Application configuration to use.</param>
        public DynamoDBUserService(IConfiguration config, IAmazonDynamoDB dynamoDBClient)
        {
            _config = config;
            _dynamoDBClient = dynamoDBClient;
        }

        /// <summary>
        /// Try to authenticate a user with given username and password.
        /// </summary>
        /// <param name="username">Username to be used for authentication.</param>
        /// <param name="password">Password to be used for authentication.</param>
        /// <returns>User entity when successful, null otherwise.</returns>
        public async Task<User> Authenticate(string username, string password)
        {
            // When username or password is null or whitespace only, that is not a valid value.
            if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(password))
            {
                return null;
            }

            // Get DynamoDB result.
            QueryResponse dbResult = await _dynamoDBClient.QueryAsync(new QueryRequest()
            {
                TableName = "dotnetcore-react-redux-users",
                IndexName = "username-index",
                KeyConditionExpression = "username = :username",
                ExpressionAttributeValues = new Dictionary<string, AttributeValue>()
                {
                    [":username"] = new AttributeValue() { S = username }
                }
            });

            // If no user found, return null.
            if (dbResult.Items.Count != 1)
            {
                return null;
            }

            // Create User instance from DB result.
            User user = this.ConvertDynamoDBItemToUser(dbResult.Items[0]);

            // Check if password is correct.
            if (!VerifyPasswordHash(password, user.PasswordHash))
            {
                return null;
            }

            // Authentication successful.
            return user;
        }

        /// <summary>
        /// Get all users.
        /// </summary>
        /// <returns>All user entities.</returns>
        public async Task<List<User>> GetAll()
        {
            // Get DynamoDB result.
            Amazon.DynamoDBv2.Model.ScanResponse dbResult = await _dynamoDBClient.ScanAsync(
                new Amazon.DynamoDBv2.Model.ScanRequest()
                {
                    TableName = "dotnetcore-react-redux-users",
                }
            );

            return dbResult.Items.Select((item, idx) => this.ConvertDynamoDBItemToUser(item)).ToList();
        }

        /// <summary>
        /// Get a single user entity with given id.
        /// </summary>
        /// <param name="id">Id of the user to get.</param>
        /// <returns>If a user is found, will return that user entity. null otherwise.</returns>
        public async Task<User> GetById(int id)
        {
            // Get DynamoDB result.
            GetItemResponse dbResult = await _dynamoDBClient.GetItemAsync(new GetItemRequest()
            {
                TableName = "dotnetcore-react-redux-users",
                Key = new Dictionary<string, AttributeValue>()
                {
                    ["id"] = new AttributeValue() { N = id.ToString() }
                }
            });

            if (dbResult.Item == null)
            {
                return null;
            }

            return this.ConvertDynamoDBItemToUser(dbResult.Item);
        }

        /// <summary>
        /// Creates a user with given information.
        /// </summary>
        /// <param name="user">Entity holding user information, without password.</param>
        /// <param name="password">Password of a user.</param>
        /// <returns>Created user entity on success, null otherwise.</returns>
        public async Task<User> Create(User user, string password)
        {
            // Password validation.
            if (string.IsNullOrWhiteSpace(password))
            {
                throw new ApplicationException("Password is required.");
            }

            // Check if username is already taken.
            QueryResponse dbResult = await _dynamoDBClient.QueryAsync(new QueryRequest()
            {
                TableName = "dotnetcore-react-redux-users",
                IndexName = "username-index",
                KeyConditionExpression = "username = :username",
                ExpressionAttributeValues = new Dictionary<string, AttributeValue>()
                {
                    [":username"] = new AttributeValue()
                    {
                        S = user.Username
                    }
                },

            });
            if (dbResult.Items.Count > 0)
            {
                throw new ApplicationException("Username '" + user.Username + "' is already taken.");
            }

            byte[] passwordHash;
            CreatePasswordHash(password, out passwordHash);

            user.PasswordHash = passwordHash;

            // Create ID based on timestamp.
            user.Id = new Random().Next() + 1;

            PutItemResponse putItemResult = await _dynamoDBClient.PutItemAsync(new PutItemRequest()
            {
                TableName = "dotnetcore-react-redux-users",
                Item = this.ConvertUserToDynamoDBItem(user)
            });

            return user;
        }

        /// <summary>
        /// Updates a user's information with given data.
        /// </summary>
        /// <param name="userParam">Information to be updated. Must have all information including non-changed ones.</param>
        /// <param name="password">To change password, set this parameter as non-null, non-whitespace only value.</param>
        public async Task<User> Update(User userParam, string password = null)
        {
            // Fetch target user.
            GetItemResponse dbResult = await _dynamoDBClient.GetItemAsync(new GetItemRequest()
            {
                TableName = "dotnetcore-react-redux-users",
                Key = new Dictionary<string, AttributeValue>()
                {
                    ["id"] = new AttributeValue() { N = userParam.Id.ToString() }
                }
            });
            if (dbResult.Item == null)
            {
                throw new ApplicationException("User not found.");
            }
            User user = this.ConvertDynamoDBItemToUser(dbResult.Item);

            if (userParam.Username != user.Username)
            {
                // Check if username is already taken.
                QueryResponse usernameCheckResult = await _dynamoDBClient.QueryAsync(new QueryRequest()
                {
                    TableName = "dotnetcore-react-redux-users",
                    IndexName = "username-index",
                    KeyConditionExpression = "username = :username",
                    ExpressionAttributeValues = new Dictionary<string, AttributeValue>()
                    {
                        [":username"] = new AttributeValue()
                        {
                            S = userParam.Username
                        }
                    }
                });
                if (usernameCheckResult.Items.Count > 0)
                {
                    throw new ApplicationException("Username '" + userParam.Username + "' is already taken.");
                }
            }

            // Update user properties.
            user.Email = userParam.Email;
            user.FirstName = userParam.FirstName;
            user.LastName = userParam.LastName;
            user.Username = userParam.Username;

            // Update password if given.
            if (!string.IsNullOrWhiteSpace(password))
            {
                byte[] passwordHash;
                CreatePasswordHash(password, out passwordHash);

                user.PasswordHash = passwordHash;
            }

            PutItemResponse putItemResult = await _dynamoDBClient.PutItemAsync(new PutItemRequest()
            {
                TableName = "dotnetcore-react-redux-users",
                Item = this.ConvertUserToDynamoDBItem(user)
            });

            return user;
        }

        /// <summary>
        /// Deletes a user by id.
        /// </summary>
        /// <param name="id">Id of the user to be deleted.</param>
        public async void Delete(int id)
        {
            await _dynamoDBClient.DeleteItemAsync(new DeleteItemRequest()
            {
                TableName = "dotnetcore-react-redux-users",
                Key = new Dictionary<string, AttributeValue>()
                {
                    ["id"] = new AttributeValue() { N = id.ToString() }
                }
            });
        }

        /// <summary>
        /// Creates password hash. Scheme: SHA512
        /// </summary>
        /// <param name="password">Password to create SHA512 hash.</param>
        /// <param name="passwordHash">Byte array to store computed SHA512 hash.</param>
        private static void CreatePasswordHash(string password, out byte[] passwordHash)
        {
            if (password == null)
            {
                throw new ArgumentNullException("password");
            }

            if (string.IsNullOrWhiteSpace(password))
            {
                throw new ArgumentException("Value cannot be empty or whitespace only.", "password");
            }

            HMACSHA512 hmac = new HMACSHA512(Encoding.UTF8.GetBytes(_config.GetValue<String>("Secrets:PasswordHash")));

            passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        }

        /// <summary>
        /// Verifies given password with stored hash. Hash secret would be fetched from secrets storage.
        /// </summary>
        /// <param name="password">Password to verify.</param>
        /// <param name="storedHash">Stored password hash.</param>
        /// <returns>True when successful, false otherwise.</returns>
        private bool VerifyPasswordHash(string password, byte[] storedHash)
        {
            // Check if given password is null.
            if (password == null)
            {
                throw new ArgumentNullException("password");
            }

            // Check if given password is null or whitespace only.
            if (string.IsNullOrWhiteSpace(password))
            {
                throw new ArgumentException("Value cannot be empty or null or whitespace only.");
            }

            // Check stored hash length.
            if (storedHash.Length != 64)
            {
                throw new ArgumentException("Invalid length of password hash. Must be 64 characters.");
            }

            // Initializes HMAC sha-512 object with password hash secret.
            HMACSHA512 hmac = new HMACSHA512(Encoding.UTF8.GetBytes(_config.GetValue<String>("Secrets:PasswordHash")));

            // Compute hash of given password.
            byte[] computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));

            // Compare each byte.
            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != storedHash[i])
                {
                    return false;
                }
            }

            return true;
        }

        /// <summary>
        /// Converts AWS DynamoDB item to `User` object.
        /// </summary>
        /// <param name="item">DynamoDB item.</param>
        /// <returns>Converted `User` object.</returns>
        private User ConvertDynamoDBItemToUser(Dictionary<string, AttributeValue> item)
        {
            User user = new User()
            {
                Id = Convert.ToInt32(item["id"].N),
                Email = item["email"].S,
                FirstName = item["firstName"].S,
                LastName = item["lastName"].S,
                PasswordHash = item["passwordHash"].B.ToArray(),
                Username = item["username"].S,
            };

            return user;
        }

        private Dictionary<string, AttributeValue> ConvertUserToDynamoDBItem(User user)
        {
            // NOTE: DynamoDB does not favor auto-increment Keys.
            // Generally, random UUID(v4) or UUID with group(v5) is favored for scalablity and distributed r/w of data.
            // So, here we use timestamp as key.
            return new Dictionary<string, AttributeValue>()
            {
                ["id"] = new AttributeValue() { N = user.Id.ToString() },
                ["email"] = new AttributeValue() { S = user.Email },
                ["firstName"] = new AttributeValue() { S = user.FirstName },
                ["lastName"] = new AttributeValue() { S = user.LastName },
                ["passwordHash"] = new AttributeValue() { B = new System.IO.MemoryStream(user.PasswordHash) },
                ["username"] = new AttributeValue() { S = user.Username }
            };
        }
    }


}