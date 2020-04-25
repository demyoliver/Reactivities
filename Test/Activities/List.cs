using Application.Activities;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Activities = Application.Activities;
using Persistence;
using System.Configuration;
using System.Threading;

namespace Test
{
    [TestClass]
    public class List
    {

        [TestMethod]
        public void ListShouldBeEqualToTen_Test()
        {
            var dataContext = new DataContext(new DbContextOptionsBuilder().UseSqlite(@"Data source=C:\Learnings\ReactJSLearning\Reactivities\API\reactivities.db").Options);
            var activitiesHandler = new Activities.List.Handler(dataContext);
            var listOfActivities = activitiesHandler.Handle(new Activities.List.Query(), new CancellationToken());
            Assert.AreEqual(listOfActivities.Result.Count, 10);
        }
    }
}
