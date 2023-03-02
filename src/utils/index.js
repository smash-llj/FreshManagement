/* 
公共的方法文件
*/



/* 
    处理数据html标签显示界面
*/
export function removeHTMLTag(htmlStr) {
  let html = htmlStr
    .replace(/<img.*?>/g, "[图片]")
    .replaceAll(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, "");
  return html;
}

/* 
  日期处理
*/



