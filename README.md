- bun
- alpine js
    - Pinecone Router
    - alpinejs presist
    - alpinejs mask
    - custom interpolation -> 
    ```js
    document.addEventListener("alpine:init", () => {
      Alpine.directive("interpolate", (el, _, { effect, evaluateLater }) => {
        let evaluate = evaluateLater("`" + el.innerText + "`");

        effect(() => {
          evaluate((value) => {
            el.textContent = value;
          });
        });
      });
    });

    ```
- sass
- hybrids
- vite