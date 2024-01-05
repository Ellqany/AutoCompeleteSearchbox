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

    [HttpGet("Search")]
    public IList<Course> GetCourses(string? name) => _courseRepository.GetCourses(name);

    [HttpGet("{id}")]
    public Course? GetCourse(int id) => _courseRepository.GetCourse(id);
}