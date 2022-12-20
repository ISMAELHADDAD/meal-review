const mainPage = document.getElementById("mainPage");
const sumaryPage = document.getElementById("sumaryPage");
const imagePreviewContainer = document.getElementById("sumaryPage");
const images = document.getElementById("images");
const generateButton = document.getElementById("generateButton");
const weekTitle = document.getElementById("weekTitle");

const testImageUrl =
  "https://picocss.com/examples/preview/assets/aleksandar-jason-a562ZEFKW8I-unsplash-2000x1000.jpg";

if (generateButton) {
  generateButton.onclick = function () {
    let imagesFiles = Object.values(images.files);
    let imagesWithUrls = imagesFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    console.log({ imagesFiles, imagesWithUrls });

    let week = {};
    for (let i = 0; i < imagesWithUrls.length; i++) {
      let currentImage = imagesWithUrls[i];
      let currentImageDate = new Date(currentImage.file.lastModified);
      let day = currentImageDate.getDate();
      let month = currentImageDate.getMonth() + 1;
      if (week[`${month}-${day}`]) week[`${month}-${day}`].push(currentImage);
      else week[`${month}-${day}`] = [currentImage];
    }
    console.log({ week });
    for (const [date, meals] of Object.entries(week)) {
      let div = document.createElement("div");
      let h2 = document.createElement("h2");
      h2.textContent = date;
      div.appendChild(h2);
      console.log({ date, meals });

      for (let i = 0; i < meals.length; i++) {
        const meal = meals[i];
        let mealDate = new Date(meal.file.lastModified);
        let time = mealDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        let span = document.createElement("span");
        let img = document.createElement("img");
        let hourLabel = document.createElement("span");
        img.src = meal.url;
        img.className = "mealImage";
        hourLabel.textContent = time;
        hourLabel.className = "hourLabel";
        span.style.position = "relative";
        span.appendChild(img);
        span.appendChild(hourLabel);
        div.appendChild(span);
      }
      imagePreviewContainer.appendChild(div);
    }

    weekTitle.textContent = `Week of ${getMonday(
      new Date()
    ).toLocaleDateString()}`;
    sumaryPage.style.display = "";
    mainPage.style.display = "none";
  };
}

function getMonday(d) {
  d = new Date(d);
  var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}
