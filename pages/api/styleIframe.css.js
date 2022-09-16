
export default async function handler(req, res) {
  const { post_id } = req.query;
  const { postBody } = req.body

  try {
    const defaultStyle = `
      
    `
    const darkStyle = `
    html,
    body {
      color: #A9C5EF !important;
    }
    `
    const whiteStyle = `
    html,
    body {
      color: black !important;
    }
    `


    const videoPostStyle = `

    
    `

    const { dark, video } = req.query;
    res.writeHead(200, { 'Content-Type': 'text/css' });

    if (dark === 'true') {
      res.write(darkStyle);
    }
    else if (dark === 'false') {
      res.write(whiteStyle);
    }
    else if (video === 'video') {
      res.write(videoPostStyle);
    }
    else {
      res.write(defaultStyle);
    }
    res.end();
  }
  finally {

  }
}
