using AutoCompeleteSearch.Models;

namespace AutoCompeleteSearch.Services;

public interface ICourseRepository
{
    IList<Course> GetCourses();
    Course? GetCourse(int id);
    IList<Course> SearchCourse(string name);
}
