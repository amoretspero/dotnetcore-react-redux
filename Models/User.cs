using System.ComponentModel.DataAnnotations;

namespace DotnetcoreReactRedux.Models
{
    /// <summary>
    /// Class representing a user for the application.
    /// </summary>
    public class User
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Username { get; set; }

        public byte[] PasswordHash { get; set; }

        [EmailAddress()]
        public string Email { get; set; }
    }
}