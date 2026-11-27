const button = document.querySelector('[data-print]');

if (CSS.supports('selector(:has(*))')) {
  const versions = document.querySelectorAll('input[name="versao"]');
  const title = document.title;

  const requested = new URLSearchParams(location.search).get('versao');
  const match = [...versions].find((input) => input.value === requested);
  if (match) match.checked = true;

  versions.forEach((input) => {
    input.addEventListener('change', () => {
      const url = new URL(location.href);
      if (input.value === 'geral') url.searchParams.delete('versao');
      else url.searchParams.set('versao', input.value);
      history.replaceState(null, '', url);
    });
  });

  window.addEventListener('beforeprint', () => {
    const checked = document.querySelector('input[name="versao"]:checked');
    document.title = `Karin Silveira — Currículo ${checked.nextElementSibling.textContent}`;
  });

  window.addEventListener('afterprint', () => {
    document.title = title;
  });
}

if (button && typeof window.print === 'function') {
  button.hidden = false;
  button.addEventListener('click', () => window.print());
}
