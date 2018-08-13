using System.ComponentModel.DataAnnotations;

namespace DotnetcoreReactRedux.ViewModels
{
    /// <summary>
    /// Class representing the data structure for user registration.
    /// </summary>
    public class UserUpdateViewModel
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        [EmailAddress()]
        public string Email { get; set; }
    }
}