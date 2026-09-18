"use strict";
// Preview only: no payment calls, form submission endpoints, or storage of personal data.
const donationForm = document.querySelector('#donation-form');
const amountInput = document.querySelector('#donation-amount');
const donationDialog = document.querySelector('#donation-dialog');
const infoDialog = document.querySelector('#info-dialog');
const involvementForm = document.querySelector('#involvement-form');
const interestSelect = document.querySelector('#interest');
const currency = 'USD';
const formatAmount = amount => `${currency} ${Number(amount).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2})}`;
function selectedFrequency(){return donationForm.elements.frequency.value;}
function validAmount(){return amountInput.value.trim() !== '' && amountInput.validity.valid && Number.isFinite(Number(amountInput.value)) && Number(amountInput.value) > 0;}
function updateDonation(){
  const monthly = selectedFrequency() === 'monthly';
  const valid = validAmount();
  document.querySelector('#donation-summary').textContent = valid ? `${formatAmount(amountInput.value)} · ${monthly?'monthly':'one-time'}` : 'Enter a valid example amount';
  document.querySelector('#recurring-note').textContent = monthly ? 'Example recurring amount, each month. Monthly giving is not active.' : 'One contribution. No recurring commitment.';
  document.querySelectorAll('[data-amount]').forEach(button=>button.setAttribute('aria-pressed', String(valid && Number(button.dataset.amount)===Number(amountInput.value))));
}
donationForm.addEventListener('input',updateDonation);
donationForm.addEventListener('change',updateDonation);
donationForm.addEventListener('submit',event=>{
  event.preventDefault();
  if(!donationForm.reportValidity() || !validAmount())return;
  const monthly=selectedFrequency()==='monthly';
  document.querySelector('#review-amount').textContent=formatAmount(amountInput.value);
  document.querySelector('#review-frequency').textContent=monthly?'Monthly — repeats each month':'One-time — does not repeat';
  document.querySelector('#review-recurring').textContent=monthly ? `Your example selection is ${formatAmount(amountInput.value)} each month. No subscription, billing schedule, or recurring charge has been created.` : `Your example selection is ${formatAmount(amountInput.value)} once. No payment has been made.`;
  donationDialog.showModal();
});
function setInterest(value){
  if(!['volunteer','sponsor','contact'].includes(value))return;
  interestSelect.value=value;
  const sponsor=value==='sponsor';
  document.querySelector('#company-field').hidden=!sponsor;
  document.querySelector('#company').disabled=!sponsor;
  if(!sponsor)document.querySelector('#company').value='';
  document.querySelector('#form-status').textContent='';
}
interestSelect.addEventListener('change',()=>setInterest(interestSelect.value));
involvementForm.addEventListener('submit',event=>{
  event.preventDefault();
  if(!involvementForm.reportValidity())return;
  const category={volunteer:'volunteer',sponsor:'business sponsorship',contact:'general'}[interestSelect.value];
  involvementForm.reset();setInterest('volunteer');
  document.querySelector('#form-status').textContent=`Your ${category} enquiry preview is complete. Nothing was sent or saved, and the form has been cleared. A working program contact and form delivery service are still needed.`;
});
const policyCopy={
  Privacy:'[Add the organizing group’s verified privacy policy, data controller, contact details, retention periods, lawful processing basis where applicable, and participant rights.] This website preview does not send or store enquiry entries or donation selections. No personal information is requested for donation review. The enquiry form clears entries after a preview submission. Hosting infrastructure may process standard access logs. No identifying information about children is published.',
  Terms:'[Add the organizing group’s legal identity, website terms, and contact details.] The Shared Table is a concept program name for this website preview. Service locations, program operations, impact figures, and donation processing have not been verified. No donations or recurring commitments can be made here.',
  'Donation policies':'[Add verified donation refund rules, cancellation steps for monthly giving, receipt arrangements, processing fees, any restricted-fund rules, and responsible support contact.] Currency and amounts are illustrative. No registration credentials, tax benefits, or government affiliations are claimed.',
  Instagram:'[Add the program’s approved official Instagram profile URL.] No social profile has been supplied.',
  Facebook:'[Add the program’s approved official Facebook profile URL.] No social profile has been supplied.'
};
document.addEventListener('click',event=>{
  const control=event.target.closest('button,a');if(!control)return;
  if(control.hasAttribute('data-amount')){amountInput.value=control.dataset.amount;updateDonation();}
  if(control.hasAttribute('data-close')){donationDialog.close();infoDialog.close();}
  if(control.hasAttribute('data-intent')){
    setInterest(control.dataset.intent);
    if(control.tagName==='BUTTON'){document.querySelector('#involvement-form').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'center'});}
    interestSelect.focus({preventScroll:true});
  }
  if(control.hasAttribute('data-policy')){document.querySelector('#info-title').textContent=control.dataset.policy;document.querySelector('#info-copy').textContent=policyCopy[control.dataset.policy];infoDialog.showModal();}
});
for(const dialog of [donationDialog,infoDialog])dialog.addEventListener('click',event=>{
  if(event.target!==dialog)return;
  const bounds=dialog.getBoundingClientRect();
  if(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom)dialog.close();
});
document.querySelectorAll('button[type="submit"]').forEach(button=>{button.disabled=false;});
document.querySelector('#year').textContent=new Date().getFullYear();
updateDonation();setInterest('volunteer');
