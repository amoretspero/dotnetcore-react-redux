using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Linq;
using System.Text;
using DotnetcoreReactRedux.Models;
using Microsoft.Extensions.Configuration;

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
        User Authenticate(string username, string password);

        /// <summary>
        /// Gets all users.
        /// </summary>
        /// <returns>All users who has been registered.</returns>
        List<User> GetAll();

        /// <summary>
        /// Get a single user by id.
        /// </summary>
        /// <param name="id">Id of the user to get.</param>
        /// <returns>When successful, target user entity will be returned. In case of failure, null will be returned.</returns>
        User GetById(int id);

        /// <summary>
        /// Creates a user entity with given information.
        /// </summary>
        /// <param name="user">User information to use.</param>
        /// <param name="password">Password of the user.</param>
        /// <returns>When successful, newly created user entity will be returned. Otherwise exception will be thrown.</returns>
        User Create(User user, string password);

        /// <summary>
        /// Updates user's information. Possibly including password.
        /// </summary>
        /// <param name="user">Target user to update information of.</param>
        /// <param name="password">Password to update. Only required when password should be updated.</param>
        /// <returns>When successful, newly updated information will be returned. Otherwise exception will be thrown.</returns>
        User Update(User user, string password = null);

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
        public User Authenticate(string username, string password)
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
            return user;
        }

        /// <summary>
        /// Get all users.
        /// </summary>
        /// <returns>All user entities.</returns>
        public List<User> GetAll()
        {
            return _context.Users.ToList();
        }

        /// <summary>
        /// Get a single user entity with given id.
        /// </summary>
        /// <param name="id">Id of the user to get.</param>
        /// <returns>If a user is found, will return that user entity. null otherwise.</returns>
        public User GetById(int id)
        {
            return _context.Users.Find(id);
        }

        /// <summary>
        /// Creates a user with given information.
        /// </summary>
        /// <param name="user">Entity holding user information, without password.</param>
        /// <param name="password">Password of a user.</param>
        /// <returns>Created user entity on success, null otherwise.</returns>
        public User Create(User user, string password)
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

            return user;
        }

        /// <summary>
        /// Updates a user's information with given data.
        /// </summary>
        /// <param name="userParam">Information to be updated. Must have all information including non-changed ones.</param>
        /// <param name="password">To change password, set this parameter as non-null, non-whitespace only value.</param>
        public User Update(User userParam, string password = null)
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

            return user;
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
}