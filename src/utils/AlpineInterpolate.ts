import Alpine from "alpinejs";

function defineAlpineInterpolate() {
    Alpine.directive(
    "interpolate",
    (el, { expression }, { effect, evaluateLater }) => {
      let evalStr = expression
        ? "`" + expression + "`"
        : "`" + el.innerText + "`";
      
      let evaluate = evaluateLater(transformI18nPlaceholders(evalStr));

      effect(() => {
        evaluate((value) => {
          el.textContent = String(value);
        });
      });
    }
  );
}

function transformI18nPlaceholders(str: string): string {
  return str.replace(/#\{(.*?)\}/g, (_, variable) => `\${$i18n.${variable}}`);
}

export default defineAlpineInterpolate;