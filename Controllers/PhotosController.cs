using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace DotnetcoreReactRedux.Controllers
{
    [Route("api/[controller]")]
    public class PhotosController : Controller
    {
        [HttpGet("")]
        public List<string> Photos([FromQuery]Nullable<int> count, [FromQuery]Nullable<int> width)
        {
            if (count.HasValue && count.Value > 0)
            {
                List<string> result = new List<string>();
                for (int i = 0; i < count.Value; i++)
                {
                    Tuple<int, int> ratio = GetRandomRatio();
                    int calculatedWidth = width.HasValue ? width.Value : 1280;
                    int calculatedHeight = calculatedWidth * ratio.Item1 / ratio.Item2;
                    result.Add($"https://picsum.photos/{calculatedWidth}/{calculatedHeight}?random");
                }
                return result;
            }
            else
            {
                Tuple<int, int> ratio = GetRandomRatio();
                int calculatedWidth = width.HasValue ? width.Value : 1280;
                int calculatedHeight = calculatedWidth * ratio.Item1 / ratio.Item2;
                return new List<string>(){
                    $"https://picsum.photos/{calculatedWidth}/{calculatedHeight}?random"
                };
            }
        }

        private Tuple<int, int> GetRandomRatio()
        {
            List<Tuple<int, int>> ratios = new List<Tuple<int, int>>(){
                new Tuple<int, int>(9, 16),
                new Tuple<int, int>(16, 9),
                new Tuple<int, int>(9, 21),
                new Tuple<int, int>(21, 9),
                new Tuple<int, int>(3, 4),
                new Tuple<int, int>(4, 3),
                new Tuple<int, int>(10, 16),
                new Tuple<int, int>(16, 10)
            };
            int randomIndex = (int)(new Random().NextDouble() * 8);
            return ratios[randomIndex];
        }
    }
}