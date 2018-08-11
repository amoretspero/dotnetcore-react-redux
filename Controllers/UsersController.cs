using System;
using System.Collections;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using DotnetcoreReactRedux.Models;
using DotnetcoreReactRedux.Services;
using DotnetcoreReactRedux.ViewModels;

namespace DotnetcoreReactRedux.Controllers
{
    [Route("[controller]")]
    public class UsersController : Controller
    {
        private IUserService _userService;
        private IConfiguration _config;

        public UsersController(IUserService userService, IConfiguration config)
        {
            _userService = userService;
            _config = config;
        }

        /// <summary>
        /// Authentication request handler.
        /// </summary>
        /// <param name="model">User authentication model.</param>
        [AllowAnonymous]
        [HttpPost]
        public IActionResult Authenticate([FromBody]UserAuthenticationViewModel model)
        {
            User user = _userService.Authenticate(model.Username, model.Password);


            if (user == null)
            {
                return BadRequest("Username or password is incorrect.");
            }

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            byte[] key = Encoding.UTF8.GetBytes(_config.GetValue<String>("Secrets:Jwt"));
            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
            string tokenString = tokenHandler.WriteToken(token);

            // Return basic user information(without password) and token to be stored at client side.
            return Ok(new
            {
                Id = user.Id,
                Username = user.Username,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Token = tokenString,
            });
        }

        /// <summary>
        /// Registers a user with given information.
        /// </summary>
        /// <param name="model">User registration data.</param>
        [AllowAnonymous]
        [HttpPost]
        public IActionResult Register([FromBody]UserRegistrationViewModel model)
        {
            User user = new User { Username = model.Username, FirstName = model.FirstName, LastName = model.LastName, Email = model.Email };
            try
            {
                // Try to create user.
                user = _userService.Create(user, model.Password);

                // User should not be logged in right after registration.
                return Ok();
            }
            catch (ApplicationException ex)
            {
                // Return error message if there was an exception.
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Gets all users.
        /// </summary>
        [HttpGet]
        public IActionResult GetAll()
        {
            // TODO: Claim based authorization is required.
            List<User> users = _userService.GetAll();
            return Ok(users.Select(u =>
            {
                return new UserViewModel
                {
                    Username = u.Username,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    Email = u.Email
                };
            }));
        }

        /// <summary>
        /// Get a single user by id.
        /// </summary>
        /// <param name="id">Id of a user to get information.</param>
        [HttpGet]
        public IActionResult GetById([FromQuery]int id)
        {
            User user = _userService.GetById(id);
            return Ok(new UserViewModel
            {
                Username = user.Username,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email
            });
        }

        /// <summary>
        /// Updates given user's information.
        /// </summary>
        /// <param name="id">Id of the user to update information.</param>
        /// <param name="model">Data to use for update.</param>
        [HttpPut]
        public IActionResult Update([FromQuery]int id, [FromBody]UserUpdateViewModel model)
        {
            User user = new User
            {
                Username = model.Username,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                Id = id
            };

            try
            {
                // Try to update user information.
                user = _userService.Update(user, model.Password);
                return Ok();
            }
            catch (ApplicationException ex)
            {
                // Return error message if there was an exception.
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Deletes a user with given id.
        /// </summary>
        /// <param name="id">Id of the user to be deleted.</param>
        [HttpDelete]
        public IActionResult Delete([FromQuery]int id)
        {
            _userService.Delete(id);
            return Ok();
        }
    }
}