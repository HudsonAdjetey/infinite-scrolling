// when the dom gets loaded
document.addEventListener("DOMContentLoaded", function () {
  // get the container
  const fetchContainer = document.querySelector(".fetch__container");
  const loading = document.getElementById("loading");
  const loadingData = false;
  let page = 1;
  let hasMore = true;

  //   fetch items
  const fetchData = async (pageIndex) => {
    // set loading data to true
    loadingData = true;
    // show loading spinner
    loading.style.display = "block";

    try {
      const res = await fetch(
        `https://api.example.com/items?page=${pageIndex}`
      );
      const newItems = await res.json();

      // check if there are more items
      hasMore = newItems.length > 0 ? true : false;
      // add new items to the container
      newItems.forEach((item) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("fetch__item");
        itemDiv.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        `;
        fetchContainer.appendChild(itemDiv);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      // set loading data to false and loading to none
      loadingData = false;
      loading.style.display = "none";
    } finally {
      // hide loading spinner
      loading.style.display = "none";
      // set loading data to false
      loadingData = false;
    }
  };

  //   the observer
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      // if the user has scrolled to the bottom and there are more items to fetch
      if (hasMore && !loadingData) {
        page++;
        fetchData(page);
      }
    }
  });
  // observe the loading
  observer.observe(loading);

  // call the fetch
  fetchData(page);
});
