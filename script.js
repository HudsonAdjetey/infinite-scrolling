document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("container");
  const loading = document.getElementById("loading");
  let page = 0;
  let loadingData = false;
  let hasMore = true;

  const fetchItems = async (pageNumber) => {
    loadingData = true;
    loading.style.display = "block";

    try {
      const limit = 5;
      const skip = pageNumber * limit;
      const response = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      );
      const newItems = await response.json();

      if (newItems.products.length === 0) {
        hasMore = false;
      } else {
        newItems.products.forEach((item) => {
          const div = document.createElement("div");
          div.className = "item";
          div.textContent = item.title;
          container.appendChild(div);
        });
      }
    } catch (error) {
      console.error("Failed to fetch items:", error);
    }

    loading.style.display = "none";
    loadingData = false;
  };

  const observer = new IntersectionObserver((entries) => {
    console.log(entries);
    if (entries[0].isIntersecting && !loadingData && hasMore) {
      page += 1;
      fetchItems(page);
    }
    console.log("Nothing is intersecting");
  });

  observer.observe(loading);

  // Initial fetch
  fetchItems(page);
});
