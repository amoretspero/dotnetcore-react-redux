using System;
using System.Collections;
using System.Collections.Generic;
using DotnetcoreReactRedux.Models;
using Microsoft.AspNetCore.Mvc;

namespace DotnetcoreReactRedux.Controllers
{
    [Route("api")]
    public class ArticlesController : Controller
    {
        private readonly DataSeeder _seeder;

        public ArticlesController()
        {
            _seeder = new DataSeeder();
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
    }
}