using AutoCompeleteSearch.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace AutoCompeleteSearch.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        #region Private Variables
        readonly ICourseRepository CourseRepository;
        #endregion

        #region Constractor
        public HomeController(ICourseRepository courseRepository) =>
            CourseRepository = courseRepository;
        #endregion

        [HttpGet]
        public List<Course> GetCourses() => CourseRepository.GetCourses();

        [HttpGet("{Id}")]
        public Course GetCourse(int Id) => CourseRepository.GetCourse(Id);

        [HttpGet("{Search}", Name = nameof(SearchCourse))]
        public List<Course> SearchCourse(string Search) => CourseRepository.SearchCourse(Search);
    }
}