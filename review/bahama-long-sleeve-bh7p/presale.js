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
  byId('selection-total').textContent = money(selection.quantity * unitCents);
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

// Shopify product 10402961129703. Variant IDs were read from the merchant's draft.
const variantIds = {
  black: {XS:'53032482373863', S:'53032482406631', M:'53032482439399', L:'53032482472167', XL:'53032482504935', '2XL':'53032482537703', '3XL':'53032482570471', '4XL':'53032482603239'},
  white: {XS:'53032482636007', S:'53032482668775', M:'53032482701543', L:'53032482734311', XL:'53032482767079', '2XL':'53032482799847', '3XL':'53032482832615', '4XL':'53032482865383'}
};
const unitCents = 5000;
const currency = new Intl.NumberFormat('en-US', {style:'currency', currency:'USD'});
const money = cents => currency.format(cents / 100);
const bag = new Map();
// Only a release edit after owner approval can open the checkout. The Shopify
// product must also be active and available on the Online Store channel.
const paymentsOpen = document.body.dataset.checkoutState === 'open';
let checkoutReview = false;

function shopifyCheckoutUrl() {
  const lines = Array.from(bag, ([id, item]) => id + ':' + item.quantity);
  return 'https://bucketheadsgolf.com/cart/' + lines.join(',');
}

function renderOrder() {
  const items = byId('order-items');
  items.replaceChildren();
  let count = 0;
  for (const [id, item] of bag) {
    const line = byId('line-template').content.firstElementChild.cloneNode(true);
    const variant = titleCase(item.color) + ' / ' + item.size;
    line.dataset.variant = id;
    line.querySelector('.line-image').src = photoUrl(item.color, 'front');
    line.querySelector('.line-variant').textContent = variant + ' · ' + money(unitCents) + ' each';
    line.querySelector('.line-quantity').textContent = item.quantity;
    line.querySelector('.line-total').textContent = money(unitCents * item.quantity);
    line.querySelector('[data-action="less"]').disabled = item.quantity <= 1;
    line.querySelector('[data-action="more"]').disabled = item.quantity >= 99;
    for (const button of line.querySelectorAll('[data-action]')) {
      button.setAttribute('aria-label', (button.getAttribute('aria-label') || 'Remove') + ', ' + variant);
    }
    line.querySelector('.line-controls').hidden = checkoutReview;
    if (checkoutReview) line.querySelector('.line-variant').textContent += ' · Qty ' + item.quantity;
    items.append(line);
    count += item.quantity;
  }
  byId('bag-count').textContent = count;
  byId('show-bag').setAttribute('aria-label', 'Open preorder bag, ' + count + (count === 1 ? ' shirt' : ' shirts'));
  byId('empty-bag').hidden = count !== 0;
  byId('order-totals').hidden = count === 0;
  byId('subtotal').textContent = money(count * unitCents);
  byId('summary-title').textContent = checkoutReview ? 'Checkout preview.' : 'Your preorder.';
  byId('payment-note').textContent = checkoutReview
    ? 'At launch, Shopify will collect delivery and payment details to place this paid preorder.'
    : 'This presale is paid in full at checkout.';
  byId('checkout').disabled = checkoutReview;
  byId('checkout').textContent = checkoutReview ? 'Payment opens at launch' : paymentsOpen ? 'Continue to Shopify checkout ↗' : 'Preview checkout →';
  byId('edit').textContent = checkoutReview ? 'Edit preorder' : 'Continue shopping';
}
function openOrder() {
  checkoutReview = false;
  renderOrder();
  summary.showModal();
  byId('summary-title').focus();
}
byId('show-bag').addEventListener('click', openOrder);
byId('review').addEventListener('click', () => {
  const error = byId('size-error');
  if (!selection.size) {
    error.textContent = 'Choose a size to add this shirt to your preorder.';
    error.hidden = false;
    sizeButtons[0].focus();
    return;
  }
  const id = variantIds[selection.color][selection.size];
  const quantity = (bag.get(id)?.quantity || 0) + selection.quantity;
  if (quantity > 99) {
    error.textContent = 'Your bag can hold up to 99 shirts of each color and size. Open Bag to adjust the quantity.';
    error.hidden = false;
    return;
  }
  error.hidden = true;
  bag.set(id, {color: selection.color, size: selection.size, quantity});
  openOrder();
});
byId('order-items').addEventListener('click', event => {
  const button = event.target.closest('button[data-action]');
  if (!button || checkoutReview) return;
  const id = button.closest('.order-line').dataset.variant;
  const item = bag.get(id);
  if (button.dataset.action === 'remove') bag.delete(id);
  else item.quantity = Math.min(99, Math.max(1, item.quantity + (button.dataset.action === 'more' ? 1 : -1)));
  renderOrder();
  const updated = Array.from(byId('order-items').children).find(line => line.dataset.variant === id);
  const nextButton = updated?.querySelector('[data-action="' + button.dataset.action + '"]:not(:disabled)');
  (nextButton || byId('edit')).focus();
});
byId('checkout').addEventListener('click', () => {
  if (!bag.size || checkoutReview) return;
  if (paymentsOpen) {
    window.location.assign(shopifyCheckoutUrl());
    return;
  }
  checkoutReview = true;
  renderOrder();
  byId('summary-title').focus();
});
byId('edit').addEventListener('click', () => {
  if (checkoutReview) {
    checkoutReview = false;
    renderOrder();
    byId('summary-title').focus();
  } else summary.close();
});
