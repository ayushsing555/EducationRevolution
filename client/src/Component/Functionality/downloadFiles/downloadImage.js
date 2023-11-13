export default async function downloadImage (url, filename)  {
  const response = await fetch(url);
      const blob = await response.blob();
      const dataUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = filename || 'downloaded_image'; // Set a default filename if not provided
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
};

