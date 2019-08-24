using System.Collections.Generic;

namespace AutoCompeleteSearch.Models
{
    public interface ICourseRepository
    {
        List<Course> GetCourses();
        Course GetCourse(int Id);
        List<Course> SearchCourse(string Name);
    }
}
