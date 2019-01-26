using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotnetcoreReactRedux.Models;
using Microsoft.AspNetCore.Mvc;

namespace DotnetcoreReactRedux.Controllers
{
    [Route("api")]
    public class BooksController : Controller
    {
        private readonly DataSeeder _seeder;

        public BooksController()
        {
            _seeder = new DataSeeder();
        }

        [HttpGet]
        [Route("[controller]")]
        public List<Book> Books()
        {
            return _seeder.GetSeedBooks();
        }

        [HttpGet]
        [Route("book")]
        public Book Book([FromQuery]int id)
        {
            return _seeder.GetSeedBook(id);
        }
    }
}