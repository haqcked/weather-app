const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

const updateUI = (data) => {

  console.log(data)
  // const cityDetails = data.cityDetails;
  // const weather = data.weather;
  // destructure property
  const { cityDetails, weather } = data;

  // update the details template
  details.innerHTML = `
    <h5 class="mt-3">${cityDetails.EnglishName},</h5>
    <h6>${cityDetails.Country.EnglishName}</h6>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  `;

  // update the night/day & icon imgs
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);

  let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg'
  // let timeSrc = null;
  // if(weather.IsDayTime){
  //   timeSrc = 'img/day.svg';
  // } else {
  //   timeSrc = 'img/night.svg';
  // }
  time.setAttribute('src', timeSrc);

  // remove d-none class if data is present
  if(card.classList.contains('d-none')){
    card.classList.remove('d-none');
  }
};

cityForm.addEventListener('submit', e => {
  e.preventDefault();

  // get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  // update the ui with the new city
  forecast.updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

  // set local storage
  localStorage.setItem('city', city);
});

if(localStorage.getItem('city')){
  forecast.updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}
