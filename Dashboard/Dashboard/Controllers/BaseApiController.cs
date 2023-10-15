using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Dashboard.Controllers
{
    [ApiController]
    //[Authorize(Policy = BasePoliciesConfig.Registered)]
    public class BaseApiController : ControllerBase
    {
    }
}
