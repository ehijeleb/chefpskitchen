/** Blocking inline script that sets data-theme on <html> BEFORE first paint,
 *  so there is no flash of the wrong theme. Uses the saved choice if there is
 *  one; otherwise defaults to light mode (ignores the OS preference). Mirrors
 *  the logic in ThemeToggle. */
const script = `(function(){try{document.documentElement.classList.add('js');var t=localStorage.getItem('cpk-theme');if(t!=='light'&&t!=='dark'){t='light';}document.documentElement.setAttribute('data-theme',t);document.documentElement.style.colorScheme=t;}catch(e){}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
