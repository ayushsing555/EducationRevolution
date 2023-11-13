export default async function downloadTextWithStyle(heading, paragraph, imageUrl) { 
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        h1 {
          font-size: 24px;
          color: #333; /* Example color */
        }
        p {
          font-size: 16px;
          color: #666; /* Example color */
        }
      </style>
    </head>
    <body>
      <h1>${heading}</h1>
      
      ${imageUrl ? `<img src="${imageUrl}" alt="Downloaded Image" style="width: 20%; height: 20%;">` : ''}
      <p>${paragraph}</p>
    </body>
    </html>
  `;

  const blob = new Blob([htmlContent], { type: 'text/html' });
  const dataUrl = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = `${heading}.html`; // Set a default filename if not provided
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

