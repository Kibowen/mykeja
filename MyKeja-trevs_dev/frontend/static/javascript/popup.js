const showPopupBtn = document.getElementById('showPopupBtn');
showPopupBtn.addEventListener('click', () => {
  const popup = document.getElementById('popup');
  popup.style.display = 'block';
});


const closePopupBtn = document.getElementById('closePopupBtn');
closePopupBtn.addEventListener('click', () => {
  const popup = document.getElementById('popup');
  popup.style.display = 'none';
});
