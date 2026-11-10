'use strict';

const sizes = [
  ['XS', '16', '27', '31½'], ['S', '18', '28', '33'],
  ['M', '20', '29', '34'], ['L', '22½', '30', '35'],
  ['XL', '24½', '31', '36'], ['2XL', '25½', '32', '36½'],
  ['3XL', '27½', '33', '37'], ['4XL', '29½', '34', '37½']
];
const selection = {color: 'black', view: 'back', size: '', quantity: 1};
const titleCase = word => word.charAt(0).toUpperCase() + word.slice(1);
const byId = id => document.getElementById(id);
const colorButtons = [...document.querySelectorAll('[data-color]')];
const viewButtons = [...document.querySelectorAll('[data-view]')];
const sizeButtons = [...document.querySelectorAll('.sizes button')];
const photoUrl = (color, view) => 'media/' + color + '-' + view + '.webp';
const viewLabel = view => view === 'pair' ? 'Both sides' : titleCase(view);
const summary = byId('review-dialog');
const zoomDialog = byId('photo-dialog');

function updatePhoto() {
  const {color, view} = selection;
  const name = titleCase(color);
  const art = view === 'back' ? 'Bucket Heads Golf Co. mascot back graphic' : 'BH monogram at the left chest';
  const description = view === 'pair' ? 'White hooded long sleeve, showing the chest monogram and mascot back graphic side by side' : name + ' hooded long sleeve, ' + art;
  const image = byId('main-photo');
  image.src = photoUrl(color, view);
  image.alt = description;
  byId('stage').classList.toggle('white-stage', color === 'white');
  byId('stage-key').textContent = name + ' / ' + viewLabel(view);
  byId('color-name').textContent = name;
  for (const button of colorButtons) button.setAttribute('aria-pressed', String(button.dataset.color === color));
  for (const button of viewButtons) {
    const imageView = button.dataset.view;
    button.hidden = imageView === 'pair' && color !== 'white';
    if (!button.hidden) button.querySelector('img').src = photoUrl(color, imageView);
    button.setAttribute('aria-pressed', String(imageView === view));
  }
}
for (const button of colorButtons) {
  button.addEventListener('click', () => {
    selection.color = button.dataset.color;
    if (selection.color === 'black' && selection.view === 'pair') selection.view = 'back';
    updatePhoto();
    byId('feedback').textContent = titleCase(selection.color) + ', ' + viewLabel(selection.view) + ' view.';
  });
}
for (const button of viewButtons) {
  button.addEventListener('click', () => {
    selection.view = button.dataset.view;
    updatePhoto();
    byId('feedback').textContent = byId('main-photo').alt;
  });
}
for (const button of sizeButtons) {
  button.addEventListener('click', () => {
    selection.size = button.textContent.trim();
    for (const choice of sizeButtons) choice.setAttribute('aria-pressed', String(choice === button));
    byId('size-name').textContent = selection.size;
    byId('size-error').hidden = true;
  });
}
function changeQuantity(change) {
  selection.quantity = Math.max(1, Math.min(99, selection.quantity + change));
  byId('quantity').textContent = selection.quantity;
  byId('less').disabled = selection.quantity === 1;
  byId('more').disabled = selection.quantity === 99;
}
byId('less').addEventListener('click', () => changeQuantity(-1));
byId('more').addEventListener('click', () => changeQuantity(1));

for (const row of sizes) {
  const tr = document.createElement('tr');
  row.forEach((value, index) => {
    const cell = document.createElement(index === 0 ? 'th' : 'td');
    if (index === 0) cell.scope = 'row';
    cell.textContent = value;
    tr.append(cell);
  });
  byId('measurements').append(tr);
}
byId('show-guide').addEventListener('click', () => byId('guide').showModal());
byId('zoom').addEventListener('click', () => {
  const photo = byId('main-photo');
  byId('large-photo').src = photo.src;
  byId('large-photo').alt = photo.alt;
  byId('zoom-title').textContent = titleCase(selection.color) + ' / ' + viewLabel(selection.view);
  zoomDialog.showModal();
});
for (const close of document.querySelectorAll('[data-close]')) {
  close.addEventListener('click', () => close.closest('dialog').close());
}

byId('review').addEventListener('click', () => {
  if (!selection.size) {
    byId('size-error').hidden = false;
    sizeButtons[0].focus();
    return;
  }
  byId('picked-photo').src = photoUrl(selection.color, selection.view);
  byId('picked-line').textContent = titleCase(selection.color) + ' / ' + selection.size + ' / Qty ' + selection.quantity;
  byId('summary-title').textContent = 'Your selection.';
  byId('review-copy').textContent = 'Preview this interest request in your browser. Retail price and shipping timing are pending.';
  byId('confirm').hidden = false;
  byId('edit').textContent = 'Edit selection';
  summary.showModal();
});
byId('confirm').addEventListener('click', () => {
  byId('summary-title').textContent = 'Preview complete.';
  byId('review-copy').textContent = 'This is the confirmation step shoppers would see. Your selection was simulated on this device.';
  byId('confirm').hidden = true;
  byId('edit').textContent = 'Back to product';
  byId('edit').focus();
});
byId('edit').addEventListener('click', () => summary.close());
