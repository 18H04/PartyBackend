﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ESEIM.Utils
{
    /// <summary>
    /// Đối tượng đóng gói các thông báo khi thêm, sửa, xóa...
    /// </summary>
    /// <modified>
    /// Author				    created date					comments
    /// LongND					05/07/2013				        Tạo mới
    ///</modified>
    ///
    [Serializable]
    public class JMessage
    {
        /// <summary>
        /// ID của bản ghi được thêm, sửa, xóa
        /// </summary>
        public int ID { get; set; }
        /// <summary>
        /// Thông báo
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// Có lỗi hay không có lỗi
        /// </summary>
        public bool Error { get; set; }
        /// <summary>
        /// Đối tượng attach kèm theo thông báo
        /// </summary>
        public object Object { get; set; }
        public JMessage(int id, string title, bool error, object obj)
        {
            ID = id; Title = title; Error = error; Object = obj;
        }
        public JMessage()
        {
             
        }
    }

    [Serializable]
    public class JMessage_Ex : JMessage
    {
        public string Result { get; set; }
        public string Message { get; set; }
        public int StatusCode { get; set; }
    }
}
