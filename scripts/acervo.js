const filters = document.querySelector('.archive-filters');
const entries = [...document.querySelectorAll('.archive-list > li')];

if (filters && entries.length) {
  const group = filters.querySelector('[role="group"]');
  const buttons = [...group.querySelectorAll('button')];
  const param = 'categoria';

  // No mobile os botões dão lugar a um seletor nativo, montado a partir dos mesmos botões.
  const picker = document.createElement('select');
  const field = document.createElement('div');

  picker.setAttribute('aria-label', group.getAttribute('aria-label'));
  for (const button of buttons) picker.add(new Option(button.textContent, button.dataset.filter));
  field.className = 'archive-select';
  field.append(picker);
  filters.append(field);

  const select = (category) => {
    const active = buttons.find((button) => button.dataset.filter === category) ?? buttons[0];

    picker.value = active.dataset.filter;
    for (const button of buttons) button.setAttribute('aria-pressed', String(button === active));
    for (const entry of entries) {
      entry.hidden = Boolean(active.dataset.filter) && !entry.dataset.category.split(' ').includes(active.dataset.filter);
    }
    return active.dataset.filter;
  };

  const choose = (category) => {
    const url = new URL(location.href);
    if (select(category)) url.searchParams.set(param, category);
    else url.searchParams.delete(param);
    history.replaceState(null, '', url);
  };

  select(new URLSearchParams(location.search).get(param));
  filters.hidden = false;

  group.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (button) choose(button.dataset.filter);
  });
  picker.addEventListener('change', () => choose(picker.value));
}
