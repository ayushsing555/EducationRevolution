export function isValidImage(imageUrl) {
  return new Promise((resolve) => {
    const testImage = new Image();
    testImage.src = imageUrl;

    testImage.onload = function () {
      // Image is valid
      resolve(true);
    };

    testImage.onerror = function () {
      // Image is invalid
      resolve(false);
    };
  });
}
