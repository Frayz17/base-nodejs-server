const http = require('http')
const path = require('path')
const fs = require('fs')
const PORT = process.env.PORT || 5000

const server = http.createServer((req, res) => {
  // if (req.url === '/') {
  //   fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
  //     if (err) throw err
  //     res.writeHead(200, { 'Content-Type': 'text/html' })
  //     res.end(content)
  //   })
  // }

  // if (req.url === '/about') {
  //   fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, content) => {
  //     if (err) throw err
  //     res.writeHead(200, { 'Content-Type': 'text/html' })
  //     res.end(content)
  //   })
  // }

  // if (req.url === '/api/users') {
  //   const users = [
  //     { name: 'Alex Braner', age: 42 },
  //     { name: 'Mike Terrel', age: 34 }
  //   ]

  //   res.writeHead(200, { 'Content-Type': 'application/json' })
  //   res.end(JSON.stringify(users))
  // }

  // BUILD FILEPATH
  let filePath = path.join(__dirname, 'public', req.url === '/'
    ? 'index.html' : req.url)

  // Extension of file
  let extName = path.extname(filePath)

  // Initial content type
  let contentType = 'text/html'

  // check extension and set content type
  switch (extName) {
    case '.js':
      contentType = 'text/javascript'
      break
    case '.css':
      contentType = 'text/css'
      break
    case '.json':
      contentType = 'application/json'
      break
    case '.png':
      contentType = 'image/png'
      break
    case '.jpg':
      contentType = 'image/jpg'
      break
  }

  // Read File
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // page not found
        fs.readFile(path.join(__dirname, 'public', '404.html'),
          (_, content) => {
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.end(content, 'utf8')
          })
      } else {
        // Some server error
        res.writeHead(500)
        res.end(`Server Error: ${err.code}`)
      }
    } else {
      // success
      res.writeHead(200, { 'Content-Type': contentType })
      res.end(content, 'utf8')
    }
  })
})

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
