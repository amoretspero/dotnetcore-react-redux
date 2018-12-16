using System.ComponentModel.DataAnnotations;

namespace DotnetcoreReactRedux.Models
{
    public enum BookStatus
    {
        WISHLIST,
        PENDING,
        READING,
        FINISHED,
    }

    public class Book
    {
        private BookStatus _enumStatus;

        public int Id { get; set; }

        public string Title { get; set; }

        public string Author { get; set; }

        public string Status
        {
            get
            {
                switch (this._enumStatus)
                {
                    case BookStatus.WISHLIST:
                        return "WISHLIST";
                    case BookStatus.PENDING:
                        return "PENDING";
                    case BookStatus.READING:
                        return "READING";
                    case BookStatus.FINISHED:
                        return "FINISHED";
                    default:
                        throw new System.InvalidOperationException("Cannot convert BookStatus enum value.");
                };
            }

            set
            {
                switch (value)
                {
                    case "WISHLIST":
                        this._enumStatus = BookStatus.WISHLIST;
                        return;
                    case "PENDING":
                        this._enumStatus = BookStatus.PENDING;
                        return;
                    case "READING":
                        this._enumStatus = BookStatus.READING;
                        return;
                    case "FINISHED":
                        this._enumStatus = BookStatus.FINISHED;
                        return;
                    default:
                        throw new System.InvalidOperationException("Cannot convert " + value + " to BookStatus enum.");
                }
            }
        }
    }
}