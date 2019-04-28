using System;
using System.ComponentModel.DataAnnotations;

namespace DotnetcoreReactRedux.Models
{
    public class Article
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Subtitle { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public string Author { get; set; }

        public string Content { get; set; }
    }

    public class CreateArticleData
    {
        public string Title { get; set; }

        public string Subtitle { get; set; }

        public string Author { get; set; }

        public string Content { get; set; }
    }
}