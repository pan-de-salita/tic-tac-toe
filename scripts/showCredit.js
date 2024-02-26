const creditLink = document.querySelector('.credit-link');

export function showCredit() {
  creditLink.style.visibility = 'visible';
}

export function hideCredit() {
  creditLink.style.visibility = 'hidden';
}
