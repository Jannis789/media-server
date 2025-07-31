import Alpine from "alpinejs";

function defineAlpineInterpolate() {
    Alpine.directive(
    "interpolate",
    (el, { expression }, { effect, evaluateLater }) => {
      let evalStr = expression
        ? "`" + expression + "`"
        : "`" + el.innerText + "`";
      let evaluate = evaluateLater(evalStr);

      effect(() => {
        evaluate((value) => {
          el.textContent = String(value);
        });
      });
    }
  );
}

export default defineAlpineInterpolate;