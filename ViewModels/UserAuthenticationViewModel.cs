using System.ComponentModel.DataAnnotations;

namespace DotnetcoreReactRedux.ViewModels
{
    /// <summary>
    /// Class representing the data structure for user authentication.
    /// </summary>
    public class UserAuthenticationViewModel
    {
        public string Username { get; set; }

        public string Password { get; set; }
    }
}