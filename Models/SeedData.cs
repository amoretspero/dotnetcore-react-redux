using System;
using System.Collections.Generic;

namespace DotnetcoreReactRedux.Models
{
    public class DataSeeder
    {
        private List<Article> _articles = new List<Article>(){
            new Article()
            {
                Id = 1,
                Author = "The author",
                Content = @"# ReLU - Rectified Linear Unit  
In the context of [artificial neural networks](https://en.wikipedia.org/wiki/Artificial_neural_network), the rectifier is an activation function defined as the positive part of its argument: $f \left( x \right) = x^+ = max \left(0, x\right) $, where $x$ is the input to a neuron. This is also known as a [ramp function](https://en.wikipedia.org/wiki/Ramp_function) and is analogous to [half-wave rectification](https://en.wikipedia.org/wiki/Half-wave_rectification) in electrical engineering. This [activation function](https://en.wikipedia.org/wiki/Activation_function) was first introduced to a dynamical network by Hahnloser et al. in 2000 with strong [biological](https://en.wikipedia.org/wiki/Biological) motivations and mathematical justifications.<sup><a name=""reference-1-sup"" id=""reference-1-sup"" />[[1]](#reference-1)</sup><sup><a href=""#"">[2]</a></sup> It has been demonstrated for the first time in 2011 to enable better training of deeper networks, compared to the widely-used activation functions prior to 2011, e.g., the [logistic sigmoid](https://en.wikipedia.org/wiki/Logistic_function) (which is inspired by [probability theory](https://en.wikipedia.org/wiki/Probability_theory); see [logistic regression](https://en.wikipedia.org/wiki/Logistic_regression)) and its more practical counterpart, the [hyperbolic tangent](https://en.wikipedia.org/wiki/Hyperbolic_tangent). The rectifier is, as of 2018, the most popular activation function for [deep neural networks](https://en.wikipedia.org/wiki/Deep_learning).  
A unit employing the rectifier is also called a **rectified linear unit** (**ReLU**).  
Rectified linear units find applications in [computer vision](https://en.wikipedia.org/wiki/Computer_vision) and [speech recognition](https://en.wikipedia.org/wiki/Speech_recognition) using [deep neural nets](https://en.wikipedia.org/wiki/Deep_learning).  
  
---  
  
## References  
  
<a name=""reference-1"" />[^](#reference-1-sup) Hahnloser, R.; Sarpeshkar, R.; Mahowald, M. A.; Douglas, R. J.; Seung, H. S. (2000).""Digital selection and analogue amplification coexist in a cortex-inspired silicon circuit"". [Nature](https://en.wikipedia.org/wiki/Nature_(journal)). **405**: 947-951. [doi](https://en.wikipedia.org/wiki/Digital_object_identifier): [10.1038/35016072](https://doi.org/10.1038%2F35016072)",
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

        private List<Book> _books = new List<Book>(){
            new Book(){ Id = 1, Author = "정재찬", Status = "FINISHED", Title = "시를 잊은 그대에게" },
            new Book(){ Id = 2, Author = "유홍준", Status = "PENDING", Title = "나의 문화유산 답사기 - 산사순례" },
            new Book(){ Id = 3, Author = "로베르트 융크", Status = "READING", Title = "천 개의 태양보다 밝은 - 우리가 몰랐던 원자과학자들의 개인적 역사" },
            new Book(){ Id = 4, Author = "노엄 촘스키", Status = "PENDING", Title = "불평등의 이유" },
            new Book(){ Id = 5, Author = "스튜어트 켈스", Status = "PENDING", Title = "더 라이브러리 - 유혹하는 도서관" },
            new Book(){ Id = 6, Author = "마르쿠스 가브리엘", Status = "PENDING", Title = "나는 뇌가 아니다" },
            new Book(){ Id = 7, Author = "정재찬", Status = "PENDING", Title = "그대를 듣는다" },
            new Book(){ Id = 8, Author = "스케일", Status = "READING", Title = "스케일" },
            new Book(){ Id = 9, Author = "버트런드 러셀", Status = "FINISHED", Title = "게으름에 대한 찬양" },
            new Book(){ Id = 10, Author = "알프레드 아들러", Status = "FINISHED", Title = "아들러의 인간이해" },
            new Book(){ Id = 11, Author = "가이 스탠딩", Status = "FINISHED", Title = "기본소득" },
            new Book(){ Id = 12, Author = "닐 디그래스 타이슨", Status = "FINISHED", Title = "블랙홀 옆에서" },
            new Book(){ Id = 13, Author = "키티 퍼거슨", Status = "FINISHED", Title = "스티븐 호킹" },
            new Book(){ Id = 14, Author = "짐 콜린스", Status = "PENDING", Title = "좋은 기업을 넘어 위대한 기업으로" },
            new Book(){ Id = 15, Author = "유시민", Status = "FINISHED", Title = "역사의 역사" }
        };

        public List<Article> GetSeedArticles()
        {
            return _articles;
        }

        public Article GetSeedArticle(int idx)
        {
            try
            {
                Article targetArticle = _articles.Find(article => article.Id == idx);
                return targetArticle;
            }
            catch (ArgumentNullException)
            {
                throw new KeyNotFoundException($"Article {idx} not found.");
            }
        }

        public List<Book> GetSeedBooks()
        {
            return _books;
        }

        public Book GetSeedBook(int idx)
        {
            try
            {
                Book targetBook = _books.Find(book => book.Id == idx);
                return targetBook;
            }
            catch (ArgumentNullException)
            {
                throw new KeyNotFoundException($"Book ${idx} not found.");
            }
        }
    }
}