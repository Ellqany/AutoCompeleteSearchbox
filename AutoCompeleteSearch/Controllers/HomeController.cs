using AutoCompeleteSearch.Models;
using AutoCompeleteSearch.Services;
using Microsoft.AspNetCore.Mvc;

namespace AutoCompeleteSearch.Controllers;

[Route("api/[controller]")]
[ApiController]
public class HomeController : ControllerBase
{
    #region Private Variables
    private readonly ICourseRepository _courseRepository;
    #endregion

    #region Constractor
    public HomeController(ICourseRepository courseRepository) => _courseRepository = courseRepository;
    #endregion

    [HttpGet]
    public IList<Course> GetCourses() => _courseRepository.GetCourses();

    [HttpGet("{id}")]
    public Course? GetCourse(int id) => _courseRepository.GetCourse(id);

    [HttpGet("Search/{search}", Name = nameof(SearchCourse))]
    public IList<Course> SearchCourse(string search) => _courseRepository.SearchCourse(search);
}