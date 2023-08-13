addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
  })
  
  async function handleRequest(request) {
    let targetUrl = new URL(request.url).pathname.slice(1);
    targetUrl = decodeURIComponent(targetUrl); 
  
    if (targetUrl === '') {
      const htmlContent = `
      <!DOCTYPE html>
      <html lang="zh-Hans">
      <style>
      html,body{width:100%;margin:0}html{height:100%}body{min-height:100%;padding:20px;box-sizing:border-box}p{word-break:break-all}@media(max-width:500px){h1{margin-top:80px}}.flex{display:flex;flex-direction:column;justify-content:center;align-items:center}.block{display:block;position:relative}.url{font-size:18px;padding:10px 10px 10px 5px;position:relative;width:300px;border:0;border-bottom:1px solid #bfbfbf}input:focus{outline:0}.bar{content:'';height:2px;width:100%;bottom:0;position:absolute;background:#00bfb3;transition:.2s ease transform;-moz-transition:.2s ease transform;-webkit-transition:.2s ease transform;transform:scaleX(0)}.url:focus ~ .bar{transform:scaleX(1)}.btn{line-height:38px;background-color:#00bfb3;color:#fff;white-space:nowrap;text-align:center;font-size:14px;border:0;border-radius:2px;cursor:pointer;padding:5px;width:160px;margin:30px 0}.tips,.example{color:#7b7b7b;position:relative;align-self:flex-start;margin-left:7.5em}
      </style>
      <head>
          <meta charset="utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width,initial-scale=1.0">
          <script>
              function toSubmit(e) {
                  e.preventDefault()
                  window.open(location.href.substr(0, location.href.lastIndexOf('/') + 1) + document.getElementsByName('q')[0].value);
                  return false
              }
          </script>
          <title>通用文件加速</title>
      </head>
      <body class="flex">
      <h1 style="margin-bottom: 50px">通用文件加速</h1>
      <form action="./" method="get" style="padding-bottom: 40px" target="_blank" class="flex" onsubmit="toSubmit(event)">
          <label class="block" style="width: fit-content">
              <input class="block url" name="q" type="text">
              <div class="bar"></div>
          </label>
          <input class="block btn" type="submit" value="Download">
      </form>
      <p>Page Updates: 2023-8-9</p>
      <p style="position: sticky;top: calc(100% - 2.5em);">项目基于Cloudflare Workers，开源于GitHub <a style="color: #3294ea" href="https://github.com/origami-owo/File-Acceleration">origami-owo/File-Acceleration</a></p>
      </body>
      </html>
      `;
      return new Response(htmlContent, { status: 200, headers: { 'Content-Type': 'text/html' } });
    }
  
    if (!targetUrl.includes('http://') && !targetUrl.includes('https://')) {
      targetUrl = 'http://' + targetUrl;
    }
  
    try {
      const response = await fetch(targetUrl, { headers: request.headers });
      const downloadResponse = new Response(response.body, response);
      downloadResponse.headers.set('Content-Disposition', 'attachment');
      return downloadResponse;
    } catch (error) {
      return new Response(`Request to ${targetUrl} failed: ${error}`, { status: 502 });
    }
  }
  