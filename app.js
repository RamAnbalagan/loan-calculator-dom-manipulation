//listen for submit

document.querySelector('#loan-form')
        .addEventListener('submit',function(e){
          //hide results
          document.querySelector('#results').style.display = 'none';

          //show loader
          document.querySelector('#loading').style.display = 'block';

          setTimeout(calculateResults,2000);
          e.preventDefault();
        });

function calculateResults() {
  console.log('testing...');

  // UI vars
  const amount = document.querySelector('#amount');
  const interest = document.querySelector('#interest');
  const years = document.querySelector('#years');
  const monthlyPayment = document.querySelector('#monthly-payment');
  const totalPayment = document.querySelector('#total-payment');
  const totalInterest = document.querySelector('#total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value)/100/12;
  const calculatedPayments = parseFloat(years.value)*12;

  // compute monthly payment
  const x = Math.pow(1+calculatedInterest,calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly*calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
    //show results
    document.querySelector('#results').style.display = 'block';
    // hide loader
    document.querySelector('#loading').style.display = 'none';
  } else {
    document.querySelector('#loading').style.display = 'none';
    if(document.querySelectorAll('.alert-danger').length===0) {
    showError('Please check your numbers');
    }
  }
}

function showError(error) {
  // create a div 
  const errorDiv = document.createElement('div');
  // get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  errorDiv.className = 'alert alert-danger';


  errorDiv.appendChild(document.createTextNode(error));

  card.insertBefore(errorDiv,heading);

  setTimeout(clearError,3000);
}

function clearError() {
  document.querySelector('.alert').remove();
}