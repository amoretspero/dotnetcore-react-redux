using System;
using System.Collections;
using System.Collections.Generic;
using DotnetcoreReactRedux.Models;
using Microsoft.AspNetCore.Mvc;

namespace DotnetcoreReactRedux.Controllers
{
    [Route("api/[controller]")]
    public class ArticlesController : Controller
    {
        [Route("")]
        public JsonResult Articles()
        {
            return Json(GetSampleArticles());
        }

        private List<Article> GetSampleArticles()
        {
            return new List<Article>{
                new Article()
                {
                    Id = 1,
                    Author = "The author",
                    Content = "## This is start of content of first article.",
                    CreatedAt = DateTime.Parse("2018-12-08T19:30+09:00"),
                    UpdatedAt = DateTime.Parse("2018-12-08T19:30+09:00"),
                    Subtitle = "This is sample subtitle of first article.",
                    Title = "This is sample title of first article."
                },
                new Article()
                {
                    Id = 2,
                    Author = "The author",
                    Content = "## This is start of content of second article.",
                    CreatedAt = DateTime.Parse("2018-12-08T18:30+09:00"),
                    UpdatedAt = DateTime.Parse("2018-12-08T18:30+09:00"),
                    Subtitle = "This is sample subtitle of second article.",
                    Title = "This is sample title of second article."
                },
                new Article()
                {
                    Id = 3,
                    Author = "The author",
                    Content = "## This is start of content third article.",
                    CreatedAt = DateTime.Parse("2018-12-08T17:30+09:00"),
                    UpdatedAt = DateTime.Parse("2018-12-08T17:30+09:00"),
                    Subtitle = "This is sample subtitle of third article.",
                    Title = "This is sample title of third article."
                }
            };
        }
    }
}