﻿using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
//using SautinSoft;
using ESEIM.Models;
using ESEIM.Utils;
using SmartBreadcrumbs.Attributes;
using Microsoft.Extensions.Localization;
using FTU.Utils.HelperNet;
using Newtonsoft.Json.Linq;
//using III.Domain.Models;

namespace III.Admin.Controllers
{
    [Area("Admin")]
    public class BotManagementController : BaseController
    {
        private readonly EIMDBContext _context;
        private readonly IUploadService _upload;
        private readonly IStringLocalizer<BotManagementController> _stringLocalizer;
        private readonly IStringLocalizer<CrawlerMenuController> _stringLocalizerCRAW;
        private readonly IStringLocalizer<SharedResources> _sharedResources;
        private readonly IRepositoryService _repositoryService;
        private readonly IStringLocalizer<BotManagementController> _sharedResourcesBm;
        private readonly IStringLocalizer<LmsDashBoardController> _stringLocalizerLms;
        private readonly IStringLocalizer<LmsSubjectManagementController> _stringLocalizerLmsSM;
        private readonly IHostingEnvironment _hostingEnvironment;
        public readonly string module_name = "COMMENT";
        public string path_upload_file = "";
        public string repos_code = "";
        public string cat_code = "";
        public int host_type = 1;
        public BotManagementController(EIMDBContext context, IStringLocalizer<BotManagementController> stringLocalizer,
            IStringLocalizer<LmsDashBoardController> stringLocalizerLms,
            IStringLocalizer<CrawlerMenuController> stringLocalizerCRAW,
            IStringLocalizer<BotManagementController> sharedResourcesBm,
            IStringLocalizer<LmsSubjectManagementController> stringLocalizerLmsSM,
            IHostingEnvironment hostingEnvironment, IUploadService upload,
            IStringLocalizer<SharedResources> sharedResources)
        {
            _context = context;
            _stringLocalizer = stringLocalizer;
            _stringLocalizerLms = stringLocalizerLms;
            _stringLocalizerCRAW = stringLocalizerCRAW;
            _sharedResourcesBm = sharedResourcesBm;
             _stringLocalizerLmsSM = stringLocalizerLmsSM;
            _sharedResources = sharedResources;
            _hostingEnvironment = hostingEnvironment;
            _upload = upload;
            var obj = (EDMSCatRepoSetting)_upload.GetPathByModule(module_name).Object;
            repos_code = obj.ReposCode;
            cat_code = obj.CatCode;
            if (obj.Path == "")
            {
                host_type = 1;
                path_upload_file = obj.FolderId;
            }
            else
            {
                host_type = 0;
                path_upload_file = obj.Path;
            }
        }

        [Breadcrumb("ViewData.CrumbBotManagement", AreaName = "Admin", FromAction = "Index", FromController = typeof(LmsDashBoardController))]
        public IActionResult Index()
        {
            ViewData["CrumbDashBoard"] = _sharedResources["COM_CRUMB_DASH_BOARD"];
            /*ViewData["CrumbMenuCenter"] = _sharedResources["COM_CRUMB_MENU_CENTER"];*/
            ViewData["CrumbLMSDashBoard"] = _sharedResources["COM_CRUMB_CRAWLER"];
            ViewData["CrumbBotManagement"] = _sharedResources["COM_BOT_MANAGEMENT"];
            return View();
        }
        #region JTable
        [HttpPost]
        public object JTable([FromBody] JTableModel jTablePara)
        {
            int intBegin = (jTablePara.CurrentPage - 1) * jTablePara.Length;
            var query = from a in _context.CrawlerManageIpRunningBots
                        select new
                        {
                            a.Id,
                            a.RobotCode,
                            a.RobotName,
                            a.IpComputer,
                            a.PortComputer,
                            a.Description,
                            a.Status,
                            a.CreatedTime,
                            a.CreatedBy,
                            a.UpdatedTime,
                            a.UpdatedBy,
                            a.IsDeleted,
                            a.DeletedBy,
                            a.DeletedTime,
                            //a.UserName,
                            //a.Passwords,
                            //a.Token,
                            //a.SpiderName
                        };

            var count = query.Count();
            var data = query.Skip(intBegin).Take(jTablePara.Length).ToList();
            var jdata = JTableHelper.JObjectTable(data, jTablePara.Draw, count, "Id", "RobotCode", "RobotName", "IpComputer", "PortComputer", "Description", "Status", "CreatedTime", "CreatedBy", "UpdatedTime", "UpdatedBy", "IsDeleted", "DeletedBy", "DeletedTime", "UserName", "Passwords", "Token", "SpiderName");
            return Json(jdata);
        }
        [HttpPost]
        public object Insert([FromBody] CrawlerManageIpRunningBot data)
        {

            var msg = new JMessage() { Error = false, ID = 0 };
            try
            {
                var model = _context.CrawlerManageIpRunningBots.FirstOrDefault(x => x.Id == data.Id);
                if (model == null)
                {
                    data.CreatedBy = User.Identity.Name;
                    data.CreatedTime = DateTime.Now;
                    data.IsDeleted = false;
                    _context.CrawlerManageIpRunningBots.Add(data);
                    _context.SaveChanges();
                    msg.Title = _sharedResources["Thêm mới thành công"];//LMS_EXAM_MSG_ADD_SUCCESS
                    msg.ID = data.Id;
                }
                else
                {
                    msg.Title = _sharedResources["Lỗi xảy ra"];//LMS_COURSE_LBL_COURSE_EXIST
                    msg.Error = true;
                }
                return Json(msg);
            }
            catch (Exception ex)
            {
                msg.Error = true;
                //msg.Title = "Có lỗi xảy ra khi thêm";
                msg.Title = _sharedResources["Có lỗi khi thêm"];//COM_ERR_ADD
                return Json(msg);
            }
        }
        [HttpPost]
        public object GetDataCrawlIp(int id)
        {

            var data = from a in _context.CrawlerManageIpRunningBots where(a.Id == id)
                       select new
                       {
                           id = a.Id,
                           RobotCode = a.RobotCode,
                           RobotName = a.RobotName,
                           IpComputer = a.IpComputer,
                           PortComputer = a.PortComputer,
                           Description = a.Description,
                           Status = a.Status,

                       };
            return data;
        }
        [HttpPost]
        public object GetListDomain()
        {
            var data = _context.CrawlerDomainConfigurations.Select(x => new { Code = x.Id, Name = x.DomainName }).ToList();
            return data;
        }
        [HttpPost]
        public object UpdateAll([FromBody] CrawlerManageIpRunningBot data)
        {
            var msg = new JMessage() { Error = false };
            try
            {
                var item = _context.CrawlerManageIpRunningBots.FirstOrDefault(x => x.Id == data.Id);
                if (item != null)
                {
                    item.UpdatedBy = ESEIM.AppContext.UserName;
                    item.UpdatedTime = DateTime.Now;
                    item.RobotCode = data.RobotCode;
                    item.RobotName = data.RobotName;
                    item.IpComputer = data.IpComputer;
                    item.PortComputer = data.PortComputer;
                    item.Description = data.Description;
                    item.Status = data.Status;

                    _context.SaveChanges();
                    msg.Title = String.Format(_sharedResources["COM_UPDATE_SUCCESS"]);
                    return Json(msg);
                }
                else
                {
                    msg.Error = true;
                    msg.Title = String.Format(_sharedResources["COM_UPDATE_FAIL"]);
                    return Json(msg);
                }
            }
            catch (Exception ex)
            {
                msg.Error = true;
                msg.Title = String.Format(_sharedResources["COM_UPDATE_FAIL"]);
                msg.Object = ex;
                return Json(msg);
            }
        }
        
        [HttpPost]
        public object Delete(int id)
        {
            var msg = new JMessage() { Error = false };
            try
            {
                var data = _context.CrawlerManageIpRunningBots.FirstOrDefault(x => x.Id.Equals(id));
                if (data == null)
                {
                    msg.Error = true;
                    msg.Title = _sharedResources["LMS_COURSE_LBL_COURSE_NOT_EXIST"];
                    //msg.Title = _stringLocalizer["CMS_ITEM_MSG_ARC_NOT_EXITS"];
                }
                else
                {
                    //data.IsDeleted = true;
                    //data.DeletedBy = User.Identity.Name;
                    _context.CrawlerManageIpRunningBots.Remove(data);
                    _context.SaveChanges();
                    msg.Title = _sharedResources["Xóa thành công"];//LMS_MSG_DELETE_SUCCESS
                    //msg.Title = _stringLocalizer["CMS_ITEM_MSG_DELETE_ARC_SUCCESS"];
                }
                return msg;

            }
            catch (Exception ex)
            {
                msg.Error = true;
                //msg.Title = "Có lỗi xảy ra khi thêm";
                msg.Title = _sharedResources["COM_ERR_ADD"];
                return Json(msg);
            }
        }

        #endregion
        #region Language
        [HttpGet]
        public IActionResult Translation(string lang)
        {
            var resourceObject = new JObject();
            var query = _stringLocalizer.GetAllStrings().Select(x => new { x.Name, x.Value })
                .Union(_sharedResources.GetAllStrings().Select(x => new { x.Name, x.Value }));
            foreach (var item in query)
            {
                resourceObject.Add(item.Name, item.Value);
            }
            return Ok(resourceObject);
        }
        #endregion
    }
}