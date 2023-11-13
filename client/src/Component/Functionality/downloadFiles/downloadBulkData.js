export default async function downloadBulkDataWithStyle(data) {
    const htmlContent1 = `
 <!DOCTYPE html>
  <html>
  <head>
    <style>
      h1 {
        font-size: 24px;
        color: #ff0000; /* Example color */
      }
    </style>
  </head>
  <body>
    <h1> topic:${data.name}</h1>
  </body>
  </html>
`;
    const htmlContents = data.content.map(({name, content, url}) => `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      h2 {
        font-size: 20px;
        color: #0000FF; /* Example color */
      }
      p {
        font-size: 16px;
        color: #666; /* Example color */
      }
    </style>
  </head>
  <body>
    <h2> Subtopic: ${name}</h2>
    
    ${url ? `<img src="${url}" alt="Downloaded Image" style="width: 20%; height: 20%;">` : ''}
    <p>content: ${content}</p>
  </body>
  </html>
`);
    const combinedHtmlContent = htmlContent1 + htmlContents;
    // htmlContents is now an array of HTML content strings, one for each object in dataArray
    const blob = new Blob([combinedHtmlContent], {type: 'text/html'});
    const dataUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `${data.name}.html`; // Set a default filename if not provided
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}