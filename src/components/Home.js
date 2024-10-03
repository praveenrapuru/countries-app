import { useState, useEffect } from "react";
import Select from 'react-select';
function Home() {
  const [countriesData, setCountriesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => {
        setCountriesData(Array.isArray(data) ? data : []);
      });
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
    setSelectedCountry(null); 
    if (value.trim() === '') {
      
    } else {
      const url = `https://restcountries.com/v3.1/name/${value}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setCountriesData(Array.isArray(data) ? data : []);
        });
    } 
  };

  const countryClick = (country) => {
    setSelectedCountry(country);
  };

  const selectChange = (event) => {
      const country = countriesData.find((c) => c.cca3 === event.value);
      if (country) {
        countryClick(country);
        setSearchTerm('');
      }
  };
  const options = countriesData.map((country) =>({
    value: country.cca3,
    label : (
      <div className="grid grid-cols-2 w-14 ">
        <img
          className="w-5 h-5 mb-3 rounded-full shadow-lg"
          src={country.flags.png}
          alt={country.name.common}
        />
        <span>
          {country.name.common}
        </span> 
        <hr className="w-44"/> 
      </div>
    )
  }));

  return (
    <div>
      {!selectedCountry && (
        <div>
          <div className="bg-white p-3 border-gray-200 dark:bg-gray-900 grid grid-cols-2">
            <h1 className="text-white text-2xl">Countries List</h1>
            
              <input
                className="rounded-xl p-2"
                type="text"
                onChange={(e) => handleSearch(e.target.value)}
                value={searchTerm}
                placeholder="Search countries"
              />
            <div className="absolute right-24  top-2">  
              <Select
              className="w-48 rounded-sm p-1"
              onChange={selectChange}
              placeholder="Select a country"
              options={options}
              />
            </div>
          </div>
          {countriesData.map((country) => (
            <div
              key={country.cca3}
              className="items-center cursor-poiner"
              onClick={() => countryClick(country)}
            >
              <div className="max-w-sm p-6 mt-3 bg-white border border-gray-200 rounded-lg shadow grid grid-cols-3 gap-4">
                <img
                  className="w-20 h-20 mb-3 rounded-full shadow-lg"
                  src={country.flags.png}
                  alt={country.name.common}
                  width={100}
                />
                <div className="col-span-2">
                  <h3 className="text-xl">{country.name.common}</h3>
                  <p>Capital: {country.capital}</p>
                  <p>Region: {country.region}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedCountry && (
        <div> 
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg mb-3" onClick={() => setSelectedCountry(null)} >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-back">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" />
            </svg>
          </button>
          <h3 className="text-xl mb-2">{selectedCountry.name.common}</h3>
          <img src={selectedCountry.flags.png} alt={selectedCountry.name.common}/>
          <p className="mt-2">{selectedCountry.flags.alt}</p>
          <p>Capital: {selectedCountry.capital}</p>
          <p>Region: {selectedCountry.region}</p>
          <p>Population: {selectedCountry.population}</p>
          <p>Area: {selectedCountry.area} km²</p>
          <p>Subregion: {selectedCountry.subregion}</p>
          <p>Timezones: {selectedCountry.timezones}</p>
        </div>
      )}  
    </div>
  );
}

export default Home;
