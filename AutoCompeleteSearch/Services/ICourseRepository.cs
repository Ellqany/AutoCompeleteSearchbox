using AutoCompeleteSearch.Models;

namespace AutoCompeleteSearch.Services;

public interface ICourseRepository
{
    IList<Course> GetCourses(string? name);
    Course? GetCourse(int id);
}
