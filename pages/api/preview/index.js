
export default async function handler(req, res) {
  const { post_id } = req.query;
  const { postBody } = req.body

  try {
 
    res.writeHead(200, { 'Content-Type': 'text/html' });

    res.write('<h1>Sorry Can\'t load document</h1>');
    // const aa = `
    // <iframe srcDoc="slfslfsdflsdfldsfldfldsfsd" frameborder="0"></iframe>
    
    // `
    // res.write(aa);
    res.end();
  }
  finally {

  }
}
